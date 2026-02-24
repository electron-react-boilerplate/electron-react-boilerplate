import PDFDocument from 'pdfkit';
import type PDFKit from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';

/**
 * Wiring Diagram Generator
 * Generates wiring diagrams from database tables (temp01, temp02, temp03)
 * 
 * Data Structure:
 * - temp01: System definitions (systemName, location, inputs, outputs)
 * - temp02: Input connections (systemName_dst, systemName_src, portName_src, portNumber_src, signalName_src, cableId)
 * - temp03: Output connections (systemName_src, systemName_dst, portName_dst, portNumber_dst, signalName_dst, cableId)
 */

interface SystemData {
  systemName: string;
  location?: string;
  frameName?: string;
  inputs?: number;
  outputs?: number;
  [key: string]: any;
}

interface ConnectionData {
  systemName_dst?: string;
  systemName_src?: string;
  portName_src?: string;
  portNumber_src?: string;
  signalName_src?: string;
  portName_dst?: string;
  portNumber_dst?: string;
  signalName_dst?: string;
  cableId?: string;
  [key: string]: any;
}

interface DwgLabelData {
  FuncSysName?: string;
  [key: string]: any;
}

interface WiringDiagramOptions {
  pageNumber: number;
  systemName: string;
  date: string;
  databaseData: {
    [tableName: string]: {
      data?: SystemData[] | ConnectionData[] | DwgLabelData[];
      rowCount?: number;
      columns?: Array<{ name: string; type: string; length: number }>;
    };
  };
  outputPath?: string;
}

interface SystemBlock {
  systemName: string;
  location: string;
  frameName: string;
  inputs: ConnectionData[];
  outputs: ConnectionData[];
  continuationInputs: ConnectionData[]; // Inputs where systemName_src matches temp01 (no bubble)
  continuationOutputs: ConnectionData[]; // Outputs where systemName_dst matches temp01 (no bubble)
  x: number;
  y: number;
  width: number;
  height: number;
  isSpecialCase: boolean; // For RTR-01
  showPortNumber?: boolean; // Only true for the regular system with most connections
  drawTopBorder?: boolean; // For multi-page continuation - draw top border
  drawBottomBorder?: boolean; // For multi-page continuation - draw bottom border
}

export class WiringDiagramGenerator {
  private readonly INCH = 72;
  private readonly PAGE_WIDTH = 17 * this.INCH;
  private readonly PAGE_HEIGHT = 11 * this.INCH;
  private readonly LABEL = 20;
  private readonly SAFE = 6;
  private readonly BOX_PADDING_TOP = 0.375 * this.INCH;
  private readonly BOX_PADDING_BOTTOM = 0.375 * this.INCH;

  // Layout constants - matching pdfGenerator layout exactly
  // Vertical lines from pdfGenerator: 1.25", 8.75", 16.375"
  // Center line at 8.75" splits left and right columns
  // RTR-01 on LEFT SIDE, all other systems on RIGHT SIDE
  private readonly LEFT_COLUMN_X = 1.25 * this.INCH; // Left side for RTR-01 (starts at first line)
  private readonly RIGHT_COLUMN_X = 9.0 * this.INCH; // Right side - start position after center line
  private readonly CENTER_LINE_X = 8.75 * this.INCH; // Center split line (matches pdfGenerator LINE_X[1])
  private readonly RIGHT_EDGE_X = 16.375 * this.INCH; // Right edge (third vertical line)
  
  // Component widths (optimized to fit within vertical line boundaries)
  private readonly INPUT_BUBBLE_WIDTH = 1.7 * this.INCH; // 1.5" width (reduced from 2.0")
  private readonly INPUT_BUBBLE_HEIGHT = 0.125 * this.INCH; // Match row height for rectangular bubble
  private readonly CABLE_ID_BOX_WIDTH = 0.625 * this.INCH; // 0.5" width for cable ID box (reduced from 0.625")
  private readonly CONNECTOR_LINE_WIDTH = 0.15 * this.INCH; // 0.15" spacing between components (reduced from 0.25")
  private readonly SYSTEM_BLOCK_WIDTH = 1.5 * this.INCH; // 1.3" width for system block (reduced from 1.5")
  private readonly OUTPUT_BUBBLE_WIDTH = 1.7 * this.INCH; // 1.5" width to match input bubble (reduced from 2.0")
  private readonly OUTPUT_BUBBLE_HEIGHT = 0.125 * this.INCH; // Match row height for rectangular bubble
  private readonly DIAGRAM_SPACING = 0.2 * this.INCH; // Minimal spacing between diagrams (0.2")
  private readonly COMPONENT_START_SPACING = 0.1 * this.INCH; // Spacing from vertical line before components start
  private readonly COMPONENT_END_SPACING = 0.1 * this.INCH; // Spacing before center/edge line where components end
  
  // Left column (RTR-01) spacing from top horizontal line
  private readonly LEFT_COLUMN_SPACING_FROM_TOP = 0.375 * this.INCH; // More spacing from top horizontal line
  
  // Bubble and spacing constants
  private readonly BUBBLE_SIZE = 0.15 * this.INCH; // 0.15" diameter (for connection point)
  private readonly BUBBLE_SPACING = 0.125 * this.INCH; // 0.125" vertical spacing between bubbles
  
  // Block dimensions
  private readonly MIN_BLOCK_HEIGHT = 0.8 * this.INCH; // Minimum block height (0.7998" from image)
  private readonly HEADER_HEIGHT = 0.3 * this.INCH; // Header section height — 2 lines: (systemName + frameName) + location
  private readonly HEADER_PADDING = 0.05 * this.INCH; // Padding inside header (0.05" from image)
  private readonly CONTENT_PADDING = 0.05 * this.INCH; // Padding for content inside block (0.05" from image)
  private readonly CONTENT_START_Y = 0.8 * this.INCH; // Content start Y position (0.8" from image)
  private readonly ROW_HEIGHT = 0.125 * this.INCH; // Height per input/output row (0.125" from image)
  
  // Font sizes (matching image specs - Arial)
  private readonly HEADER_TEXT_SIZE = 7; // For system name and frame name (Arial 0.07")
  private readonly LOCATION_TEXT_SIZE = 6; // For location
  private readonly BUBBLE_TEXT_SIZE = 4.32; // For bubble labels (Arial 0.06" = 4.32pt)
  private readonly PORT_TEXT_SIZE = 4.32; // For port names inside block (Arial 0.06")

  /**
   * 🎯 SPECIAL SYSTEMS CONFIGURATION (LEFT SIDE)
   * 
   * Systems listed here will be automatically placed on the LEFT side of the diagram.
   * All other systems from temp01 will be placed on the RIGHT side and sorted alphabetically.
   * 
   * How it works:
   * 1. All systems are read from temp01 table
   * 2. Each system name is checked against this array (case-insensitive, substring match)
   * 3. If match found → LEFT side placement (LEFT_COLUMN_X = 1.25")
   * 4. If no match → RIGHT side placement (RIGHT_COLUMN_X = 9.0") + alphabetical sorting
   * 
   * To add more special systems:
   * Simply add the system name to this array, e.g., ['RTR-01', 'RTR01', 'RTR-02', 'SPECIAL-SYS']
   * 
   * Examples:
   * - ['RTR-01', 'RTR01'] → Only RTR-01 variants on left
   * - ['RTR-01', 'RTR01', 'RTR-02', 'RTR-03'] → All RTR systems on left
   * - ['RTR-01', 'RTR01', 'MAIN-SYS'] → RTR-01 and MAIN-SYS on left
   */
  private readonly SPECIAL_SYSTEMS = ['RTR-01', 'RTR01','RTR-01b','SW-01>04','SW-01>04b'];
  
  // Store system names from temp01 for continuation checks during drawing
  private systemNameMap: Set<string> = new Set();

  
  /**
   * Generate wiring diagram from database data
   * Automatically handles multi-page if needed
   */
  async generateWiringDiagram(options: WiringDiagramOptions): Promise<string> {
    // Extract FuncSysName from temp00DwgLabel table
    const temp00Table = options.databaseData['temp00DwgLabel'];
    const temp00Data = (Array.isArray(temp00Table) ? temp00Table : temp00Table?.data || []) as DwgLabelData[];
    const funcSysName = temp00Data.length > 0 && temp00Data[0].FuncSysName 
      ? temp00Data[0].FuncSysName 
      : options.systemName; // Fallback to systemName if FuncSysName not found
    
    // Process systems first to check if multi-page is needed
    const systems = this.processSystemData(options.databaseData);
    
    // Check if we need multiple pages
    // Page dimensions: 17" × 11" (width × height) in landscape
    const boxY = this.LABEL + this.SAFE;
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
    const topHorizontalLineY = boxY + boxH - this.BOX_PADDING_TOP;
    const contentStartOffset = 0.125 * this.INCH;
    const contentTopY = topHorizontalLineY - contentStartOffset;
    const contentBottomY = boxY + this.BOX_PADDING_BOTTOM;
    const maxHeight = contentTopY - contentBottomY;
    
    // Calculate total height needed (separate left and right columns)
    const specialSystems = systems.filter(s => s.isSpecialCase);
    const regularSystems = systems.filter(s => !s.isSpecialCase);
    
    let totalHeightLeft = 0;
    let totalHeightRight = 0;
    
    specialSystems.forEach(system => {
      totalHeightLeft += system.height + this.DIAGRAM_SPACING;
    });
    
    regularSystems.forEach(system => {
      totalHeightRight += system.height + this.DIAGRAM_SPACING;
    });
    
    // Use the maximum of left or right column height
    const totalHeight = Math.max(totalHeightLeft, totalHeightRight);
    
    // If content exceeds page height, use multi-page
    if (totalHeight > maxHeight) {
      return this.generateMultiPageWiringDiagram(options);
    }
    
    // Single page generation
    const { pageNumber, systemName, date, outputPath } = options;
    const finalPath =
      outputPath ??
      path.join(app.getPath('temp'), `wiring-diagram-${Date.now()}.pdf`);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: [this.PAGE_WIDTH, this.PAGE_HEIGHT],
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
      });
      const stream = fs.createWriteStream(finalPath);
      doc.pipe(stream);

      // Draw base layout (borders, labels, etc.) with FuncSysName from temp00DwgLabel
      this.drawBaseLayout(doc, funcSysName, date, pageNumber, true);

      // Draw wiring diagram
      this.drawWiringDiagram(doc, systems);

      doc.end();

      stream.on('finish', () => resolve(finalPath));
      stream.on('error', reject);
    });
  }

  /**
   * Process database data into system blocks
   */
  private processSystemData(databaseData: WiringDiagramOptions['databaseData']): SystemBlock[] {
    const systems: SystemBlock[] = [];
    
    // Get table data - handle both direct data array and nested structure
    const temp01Table = databaseData['temp01selfuncsys1'];
    const temp02Table = databaseData['temp02seldsts-left-inputs1'];
    const temp03Table = databaseData['temp03selsrcs-right-outputs1'];
    
    let temp01 = (Array.isArray(temp01Table) ? temp01Table : temp01Table?.data || []) as SystemData[];
    const temp02 = (Array.isArray(temp02Table) ? temp02Table : temp02Table?.data || []) as ConnectionData[];
    const temp03 = (Array.isArray(temp03Table) ? temp03Table : temp03Table?.data || []) as ConnectionData[];

    // Sort temp01 systems alphabetically by systemName FIRST (industry standard)
    temp01 = [...temp01].sort((a, b) => {
      const nameA = (a.systemName || '').toUpperCase();
      const nameB = (b.systemName || '').toUpperCase();
      return nameA.localeCompare(nameB);
    });

    // Create a map of system names from temp01 for quick lookup during drawing
    const systemNameMap = new Set(
      temp01.map((sys: SystemData) => sys.systemName?.toUpperCase())
    );
    
    // Store systemNameMap for use during drawing
    this.systemNameMap = systemNameMap;

    // Process each system from temp01
    temp01.forEach((system: SystemData) => {
      const sysName = system.systemName || '';
      
      // Check if this system is in SPECIAL_SYSTEMS array (case-insensitive substring match)
      const isSpecial = this.SPECIAL_SYSTEMS.some(s => 
        sysName.toUpperCase().includes(s.toUpperCase())
      );

      // Get inputs for this system (from temp02 where systemName_dst matches)
      // IMPORTANT: Keep original database order - DO NOT SEPARATE INTO GROUPS
      const allInputs = temp02.filter((conn: ConnectionData) => {
        const dstName = conn.systemName_dst || '';
        return dstName.toUpperCase() === sysName.toUpperCase();
      });
      
      // Get outputs for this system (from temp03 where systemName_src matches)
      // IMPORTANT: Keep original database order - DO NOT SEPARATE INTO GROUPS
      const allOutputs = temp03.filter((conn: ConnectionData) => {
        const srcName = conn.systemName_src || '';
        return srcName.toUpperCase() === sysName.toUpperCase();
      });

      // Calculate block height based on MAX(inputs, outputs) from database
      // Height = header + content area (based on max connections)
      const maxConnections = Math.max(allInputs.length, allOutputs.length);
      const contentHeight = maxConnections * this.ROW_HEIGHT;
      const height = Math.max(
        this.MIN_BLOCK_HEIGHT,
        this.HEADER_HEIGHT + contentHeight + (this.CONTENT_PADDING * 2)
      );

      systems.push({
        systemName: sysName,
        location: system.Location || '',
        frameName: (system.frameName || '').trim(),
        inputs: allInputs, // Store all inputs in original order
        outputs: allOutputs, // Store all outputs in original order
        continuationInputs: [], // Not used anymore - check during drawing
        continuationOutputs: [], // Not used anymore - check during drawing
        // RTR-01 goes to left column, all others go to right column
        x: isSpecial ? this.LEFT_COLUMN_X : this.RIGHT_COLUMN_X,
        y: 0, // Will be calculated during layout
        width: this.SYSTEM_BLOCK_WIDTH,
        height,
        isSpecialCase: isSpecial,
        showPortNumber: false, // Will be set below for the busiest regular system
      });
    });

    // ALL systems show portNumber inside the block (both left/special and right/regular)
    systems.forEach(s => { s.showPortNumber = true; });

    return systems;
  }

  /**
   * Check if input is a continuation (systemName_src matches a system in temp01)
   * Continuation inputs: NO bubble, just line from left vertical line to cable ID
   */
  private isInputContinuation(input: ConnectionData): boolean {
    const srcName = input.systemName_src || '';
    return this.systemNameMap.has(srcName.toUpperCase());
  }

  /**
   * Check if output is a continuation (systemName_dst matches a system in temp01)
   * Continuation outputs: NO bubble, just line from cable ID to center line
   */
  private isOutputContinuation(output: ConnectionData): boolean {
    const dstName = output.systemName_dst || '';
    return this.systemNameMap.has(dstName.toUpperCase());
  }

  /**
   * Draw base layout (borders, labels, vertical lines)
   */
  private drawBaseLayout(
    doc: PDFKit.PDFDocument,
    funcSysName: string,
    date: string,
    pageNumber: number,
    isFirstPage: boolean = true
  ): void {
    const boxX = this.LABEL + this.SAFE;
    const boxY = this.LABEL + this.SAFE;
    const boxW = this.PAGE_WIDTH - 2 * (this.LABEL + this.SAFE);
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);

    // Draw main box
    doc.save();
    doc.lineWidth(1).strokeColor('black');
    doc.rect(boxX, boxY, boxW, boxH).stroke();
    doc.restore();

    // Draw vertical divider lines - MUST match pdfGenerator LINE_X exactly
    const LINE_X = [1.25 * this.INCH, 8.75 * this.INCH, 16.375 * this.INCH];
    const topY = boxY + boxH - this.BOX_PADDING_TOP;
    const bottomY = boxY + this.BOX_PADDING_BOTTOM;

    LINE_X.forEach((x) => {
      doc.save();
      doc.lineWidth(0.6).strokeColor('black');
      doc.moveTo(x, topY);
      doc.lineTo(x, bottomY);
      doc.stroke();
      doc.restore();

      // Coordinate debug labels – commented out
      // const xInches = (x / this.INCH).toFixed(2);
      // const yTopInches = ((this.PAGE_HEIGHT - topY) / this.INCH).toFixed(3);
      // const yBottomInches = ((this.PAGE_HEIGHT - bottomY) / this.INCH).toFixed(3);
      // doc.save();
      // doc.font('Helvetica').fontSize(8).fillColor('black');
      // const topLabel = `${xInches}",${yTopInches}"`;
      // const bottomLabel = `${xInches}",${yBottomInches}"`;
      // doc.text(topLabel, x - doc.widthOfString(topLabel) / 2, topY + 4);
      // doc.text(bottomLabel, x - doc.widthOfString(bottomLabel) / 2, bottomY - 12);
      // doc.restore();
    });

    // Draw horizontal line at the TOP of the content area — first page only
    if (isFirstPage) {
      doc.save();
      doc.lineWidth(0.6).strokeColor('black');
      const actualTopY = boxY + this.BOX_PADDING_TOP;
      doc.moveTo(LINE_X[0], actualTopY);
      doc.lineTo(LINE_X[1], actualTopY);
      doc.lineTo(LINE_X[2], actualTopY);
      doc.stroke();
      doc.restore();
    }

    

    // Draw left vertical text spine with format: "FuncSysName - Date Pg#"
    const text = `${funcSysName} - ${date} Pg${pageNumber}`;
    doc.save();
    doc.font('Helvetica-Bold');

    // Dynamically find the largest font size that fits within the box height (rotated axis)
    const maxSpineFontSize = 20;
    const minSpineFontSize = 7;
    const availableSpineLength = boxH * 0.9; // 90% of box height for the rotated text
    let spineFontSize = maxSpineFontSize;
    while (spineFontSize > minSpineFontSize) {
      doc.fontSize(spineFontSize);
      if (doc.widthOfString(text) <= availableSpineLength) break;
      spineFontSize -= 0.5;
    }
    doc.fontSize(spineFontSize);
    const textWidth = doc.widthOfString(text);

    // X position: centered horizontally between box left edge and first vertical line
    const firstLineX = LINE_X[0];
    const spineTextX = (boxX + firstLineX) / 2;

    // Y position: vertical center of box
    const boxCenterY = boxY + boxH / 2;

    doc.translate(spineTextX, boxCenterY);
    doc.rotate(-90);
    doc.text(text, -textWidth / 2, -(spineFontSize / 2));

    doc.restore();

    // Corner labels – commented out
    // doc.save();
    // doc.font('Courier').fontSize(7).fillColor('black');
    // doc.text(`0", 11"`, boxX - 6, boxY - 12);
    // doc.text(`17", 11"`, boxX + boxW - 36, boxY - 12);
    // doc.text(`0", 0"`, boxX - 6, boxY + boxH + 2);
    // doc.text(`17", 0"`, boxX + boxW - 36, boxY + boxH + 2);
    // doc.restore();
  }

  /**
   * Draw wiring diagram with system blocks
   */
  private drawWiringDiagram(doc: PDFKit.PDFDocument, systems: SystemBlock[]): void {
    const boxX = this.LABEL + this.SAFE;
    const boxY = this.LABEL + this.SAFE;
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
    
    // Content area calculations
    const topHorizontalLineY = boxY + boxH - this.BOX_PADDING_TOP;
    const contentStartOffset = 0.125 * this.INCH;
    const contentTopY = topHorizontalLineY - contentStartOffset;
    
    // Left column uses more spacing from top horizontal line
    const leftColumnTopY = topHorizontalLineY - this.LEFT_COLUMN_SPACING_FROM_TOP;

    // 🎯 SEPARATE AND SORT SYSTEMS FOR PLACEMENT
    // LEFT SIDE: Special systems (defined in SPECIAL_SYSTEMS array)
    // RIGHT SIDE: Regular systems (all others) - sorted alphabetically
    const specialSystems = systems.filter(s => s.isSpecialCase);
    const regularSystems = systems.filter(s => !s.isSpecialCase);
    // 📊 SORT REGULAR SYSTEMS ALPHABETICALLY (RIGHT SIDE ONLY)
    // Sort A→Z: ACNV-01, ACNV-02, ACNV-03, APRC-10, ENC-11, FS-01, FS-02
    // Using localeCompare with numeric: true for proper number handling
    regularSystems.sort((a, b) => {
      const nameA = a.systemName.toUpperCase();
      const nameB = b.systemName.toUpperCase();
      return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
    });
    // 🔄 REVERSE for correct visual order
    // Drawing works bottom-to-top (high Y → low Y), so reverse to show ACNV-01 at top (low Y)
    regularSystems.reverse();

    // Layout systems vertically
    let currentYLeft = leftColumnTopY;
    let currentYRight = contentTopY;

    // Draw special systems on left (RTR-01)
    specialSystems.forEach((system) => {
      system.y = currentYLeft - system.height;
      this.drawSystemBlock(doc, system, true);
      currentYLeft = system.y - this.DIAGRAM_SPACING;
    });

    // Draw regular systems on right with minimal spacing (sorted alphabetically)
    regularSystems.forEach((system, index) => {
      system.y = currentYRight - system.height;
      this.drawSystemBlock(doc, system, false);
      currentYRight = system.y - this.DIAGRAM_SPACING;
    });
    
    console.log(`📐 Single-page drawing END: Final currentYRight = ${currentYRight.toFixed(2)}`);
  }

  /**
   * Draw a single system block with complete layout
   * Layout (from left to right):
   * 1. Input bubble (1.625") → line → 2. Cable ID box (0.625") → line → 
   * 3. System block (1.5") → line → 4. Cable ID box (0.625") → line → 
   * 5. Output bubble (1.625")
   * 
   * Header: systemName space frameName (no box), then location
   * Content: Inputs (portName_dst) on left, Outputs (portName_dst from temp03) on right
   */
  private drawSystemBlock(
    doc: PDFKit.PDFDocument,
    system: SystemBlock,
    isLeftSide: boolean
  ): void {
    const { y, systemName, location, frameName, inputs, outputs, continuationInputs, continuationOutputs } = system;

    doc.save();

    // Calculate X positions with EQUAL margins on both sides of the column.
    // Left column boundary: LEFT_COLUMN_X → CENTER_LINE_X
    // Right column boundary: CENTER_LINE_X → RIGHT_EDGE_X
    const columnStartX = isLeftSide ? this.LEFT_COLUMN_X : this.CENTER_LINE_X;
    const columnEndX   = isLeftSide ? this.CENTER_LINE_X  : this.RIGHT_EDGE_X;
    const columnWidth  = columnEndX - columnStartX;

    // Total content width (bubbles + connectors + cable boxes + system block)
    const totalContentWidth =
      this.INPUT_BUBBLE_WIDTH +
      this.CONNECTOR_LINE_WIDTH + this.CABLE_ID_BOX_WIDTH +
      this.CONNECTOR_LINE_WIDTH + this.SYSTEM_BLOCK_WIDTH +
      this.CONNECTOR_LINE_WIDTH + this.CABLE_ID_BOX_WIDTH +
      this.CONNECTOR_LINE_WIDTH + this.OUTPUT_BUBBLE_WIDTH;

    // Equal margin so gap at input side == gap at output side
    const equalMargin = Math.max(0, (columnWidth - totalContentWidth) / 2);

    let currentX = columnStartX + equalMargin;

    // Position 1: Input bubble
    const inputBubbleX = currentX;
    currentX += this.INPUT_BUBBLE_WIDTH;

    // Position 2: Line + Cable ID box
    const inputCableX = currentX + this.CONNECTOR_LINE_WIDTH;
    currentX += this.CONNECTOR_LINE_WIDTH + this.CABLE_ID_BOX_WIDTH;

    // Position 3: Line + System block
    const systemBlockX = currentX + this.CONNECTOR_LINE_WIDTH;
    currentX += this.CONNECTOR_LINE_WIDTH + this.SYSTEM_BLOCK_WIDTH;

    // Position 4: Line + Cable ID box
    const outputCableX = currentX + this.CONNECTOR_LINE_WIDTH;
    currentX += this.CONNECTOR_LINE_WIDTH + this.CABLE_ID_BOX_WIDTH;

    // Position 5: Line + Output bubble
    const outputBubbleX = currentX + this.CONNECTOR_LINE_WIDTH;

    // Draw header (systemName space frameName - NO BOX, just text) above system block
    // Skip header for continuation chunks (drawTopBorder === false means it's a continuation)
    const isFirstChunk = system.drawTopBorder !== false;
    const headerY = y + this.HEADER_PADDING;
    
    if (isFirstChunk) {
      const hdrX = systemBlockX + this.CONTENT_PADDING;
      const hdrW = this.SYSTEM_BLOCK_WIDTH - this.CONTENT_PADDING * 2;
      let nextLineY = headerY;

      // Line 1: systemName + frameName (appended with space if frameName is non-empty)
      const trimmedFrame = (frameName || '').trim();
      const headerLine1 = trimmedFrame ? `${systemName} ${trimmedFrame}` : systemName;
      doc.font('Helvetica').fontSize(this.HEADER_TEXT_SIZE).fillColor('black');
      doc.text(headerLine1, hdrX, nextLineY, { width: hdrW, ellipsis: true });
      nextLineY += this.HEADER_TEXT_SIZE + 1;

      // Line 2: location
      if (location) {
        doc.font('Helvetica').fontSize(this.LOCATION_TEXT_SIZE).fillColor('black');
        doc.text(location, hdrX, nextLineY, { width: hdrW, ellipsis: true });
      }
    }

    // Draw system block border (only around content area, not header)
    const contentY = y + this.HEADER_HEIGHT;
    const contentHeight = system.height - this.HEADER_HEIGHT;
    
    // Support for multi-page continuation - conditional border drawing
    const shouldDrawTopBorder = system.drawTopBorder !== false; // Default true
    const shouldDrawBottomBorder = system.drawBottomBorder !== false; // Default true
    
    doc.lineWidth(1).strokeColor('black');
    
    if (shouldDrawTopBorder && shouldDrawBottomBorder) {
      // Normal case: draw full rectangle
      doc.rect(systemBlockX, contentY, this.SYSTEM_BLOCK_WIDTH, contentHeight).stroke();
    } else {
      // Continuation case: draw individual lines
      // Always draw left and right sides
      doc.moveTo(systemBlockX, contentY);
      doc.lineTo(systemBlockX, contentY + contentHeight);
      doc.stroke();
      
      doc.moveTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, contentY);
      doc.lineTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, contentY + contentHeight);
      doc.stroke();
      
      // Conditionally draw top border
      if (shouldDrawTopBorder) {
        doc.moveTo(systemBlockX, contentY);
        doc.lineTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, contentY);
        doc.stroke();
      }
      
      // Conditionally draw bottom border
      if (shouldDrawBottomBorder) {
        doc.moveTo(systemBlockX, contentY + contentHeight);
        doc.lineTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, contentY + contentHeight);
        doc.stroke();
      }
    }

    // Draw content area: inputs on left, outputs on right
    // IMPORTANT: Preserve original database order from temp02 and temp03
    const contentStartY = contentY + this.CONTENT_PADDING;
    
    // showPortNumber: true only for the regular system with most connections
    const showPortNumber = system.showPortNumber === true;

    // Draw all inputs in original temp02 order (checking each for continuation)
    inputs.forEach((input, index) => {
      const rowY = contentStartY + (index * this.ROW_HEIGHT);
      this.drawInputPort(doc, systemBlockX, rowY, input, showPortNumber);
    });

    // Draw all outputs in original temp03 order (checking each for continuation)
    outputs.forEach((output, index) => {
      const rowY = contentStartY + (index * this.ROW_HEIGHT);
      this.drawOutputPort(doc, systemBlockX + this.SYSTEM_BLOCK_WIDTH, rowY, output, showPortNumber);
    });

    // Draw input connections (bubbles, lines, cable IDs) - in original order
    inputs.forEach((input, index) => {
      const rowY = contentStartY + (index * this.ROW_HEIGHT);
      const centerY = rowY + (this.ROW_HEIGHT / 2);
      
      const isContinuation = this.isInputContinuation(input);
      
      if (isContinuation) {
        // Continuation input: NO bubble, line from left vertical line
        const continuationStartX = isLeftSide ? this.LEFT_COLUMN_X : this.CENTER_LINE_X;
        
        doc.lineWidth(0.5).strokeColor('black');
        doc.moveTo(continuationStartX, centerY);
        doc.lineTo(inputCableX, centerY);
        doc.stroke();
      } else {
        // Regular input: draw bubble
        this.drawInputBubble(doc, inputBubbleX, rowY, input);
        
        doc.lineWidth(0.5).strokeColor('black');
        doc.moveTo(inputBubbleX + this.INPUT_BUBBLE_WIDTH, centerY);
        doc.lineTo(inputCableX, centerY);
        doc.stroke();
      }
      
      // Draw input cable ID box from temp02
      const inputCableId = (input as any).cableID || input.cableId || input.cable_id || 
                          (input as any).CableId || (input as any).Cable_ID || 
                          (input as any)['Cable ID'] || (input as any)['cable ID'];
      if (inputCableId) {
        this.drawCableIdBox(doc, inputCableX, rowY, inputCableId.toString());
      }
      
      // Draw line from cable ID to system block
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(inputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
      doc.lineTo(systemBlockX, centerY);
      doc.stroke();
    });

    // Draw output connections (cable IDs, lines, bubbles) - in original order
    outputs.forEach((output, index) => {
      const rowY = contentStartY + (index * this.ROW_HEIGHT);
      const centerY = rowY + (this.ROW_HEIGHT / 2);
      
      const isContinuation = this.isOutputContinuation(output);
      
      // Draw line from system block to cable ID
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, centerY);
      doc.lineTo(outputCableX, centerY);
      doc.stroke();
      
      // Draw output cable ID box from temp03
      const outputCableId = (output as any).cableID || output.cableId || output.cable_id || 
                           (output as any).CableId || (output as any).Cable_ID || 
                           (output as any)['Cable ID'] || (output as any)['cable ID'];
      if (outputCableId) {
        this.drawCableIdBox(doc, outputCableX, rowY, outputCableId.toString());
      }
      
      if (isContinuation) {
        // Continuation output: NO bubble, line extends to edge
        // LEFT side: line to CENTER_LINE_X (8.75")
        // RIGHT side: line to RIGHT_EDGE_X (16.375")
        const continuationEndX = isLeftSide ? this.CENTER_LINE_X : this.RIGHT_EDGE_X;
        
        doc.lineWidth(0.5).strokeColor('black');
        doc.moveTo(outputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
        doc.lineTo(continuationEndX, centerY);
        doc.stroke();
      } else {
        // Regular output: draw bubble
        doc.lineWidth(0.5).strokeColor('black');
        doc.moveTo(outputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
        doc.lineTo(outputBubbleX, centerY);
        doc.stroke();
        
        this.drawOutputBubble(doc, outputBubbleX, rowY, output, system.isSpecialCase);
      }
    });

    doc.restore();
  }

  /**
   * Draw cable ID box (0.625" width)
   */
  private drawCableIdBox(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    cableId: string
  ): void {
    doc.save();
    
    const cableText = cableId.toString();
    doc.font('Helvetica').fontSize(this.BUBBLE_TEXT_SIZE).fillColor('black');
    const textWidth = doc.widthOfString(cableText);
    
    // Draw box (0.625" width, height matches row height)
    // Slight border radius (2pt) - subtle rounding, not too pronounced
    doc.lineWidth(0.5).strokeColor('black');
    doc.roundedRect(x, y, this.CABLE_ID_BOX_WIDTH, this.ROW_HEIGHT, 5);
    doc.stroke();
    
    // Draw cable ID text – left-aligned with small left padding so all rows start at same X
    const CABLE_TEXT_PAD = 3; // 3pt left padding
    const textY = y + (this.ROW_HEIGHT - this.BUBBLE_TEXT_SIZE) / 2;
    doc.text(cableText, x + CABLE_TEXT_PAD, textY, {
      width: this.CABLE_ID_BOX_WIDTH - CABLE_TEXT_PAD * 2,
      align: 'left',
      ellipsis: true,
    });
    
    doc.restore();
  }

  /**
   * Draw input bubble with connection info
   * Format: systemName space portName_src space portNumber_src space signalName_src
   * Text goes INSIDE the bubble (rectangular/rounded rectangle)
   * Width: 2.0 inches to fit all text
   * If portNumber_src is EMPTY, continue with space and add signalName_src if not EMPTY
   */
  private drawInputBubble(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    input: ConnectionData
  ): void {
    doc.save();

    // Format label: systemName space portName_src space portNumber_src space signalName_src
    // Add space for missing values to maintain proper formatting
    const systemName = String(input.systemName_src || '').trim();
    const portName = String(input.portName_src || '').trim();
    const portNumber = String(input.portNumber_src || '').trim();
    const signalName = String(input.signalName_src || '').trim();
    
    // Build label with spaces for missing values
    const parts: string[] = [];
    if (systemName) parts.push(systemName);
    else parts.push(''); // Add space for missing systemName
    
    if (portName) parts.push(portName);
    else if (portNumber || signalName) parts.push(''); // Add space if later values exist
    
    if (portNumber) parts.push(portNumber);
    else if (signalName) parts.push(''); // Add space if signalName exists
    
    if (signalName) parts.push(signalName);
    
    const label = parts.filter((p, i) => p !== '' || i < parts.length - 1).join(' '); // Keep spaces, trim trailing empty

    // Draw bubble as rounded rectangle - text goes INSIDE
    doc.font('Helvetica').fontSize(this.BUBBLE_TEXT_SIZE).fillColor('black');
    const textWidth = doc.widthOfString(label);
    const textHeight = this.BUBBLE_TEXT_SIZE;
    
    // Calculate bubble dimensions (width: 2.0", height: 0.2")
    const bubbleWidth = this.INPUT_BUBBLE_WIDTH;
    const bubbleHeight = this.INPUT_BUBBLE_HEIGHT;
    const borderRadius = 0.05 * this.INCH; // Small border radius for rounded rectangle
    
    // Draw rounded rectangle bubble
    doc.lineWidth(0.5).strokeColor('black');
    doc.roundedRect(x, y, bubbleWidth, bubbleHeight, borderRadius);
    doc.stroke();
    
    // Left-align text – all rows start from the same X so they are visually lined up
    const BUBBLE_TEXT_PAD = 3; // 3pt left padding inside bubble
    const textY = y + (bubbleHeight - textHeight) / 2;
    doc.text(label, x + BUBBLE_TEXT_PAD, textY, {
      width: bubbleWidth - BUBBLE_TEXT_PAD * 2,
      align: 'left',
      ellipsis: true,
    });

    doc.restore();
  }

  /**
   * Draw input port inside block (left side)
   * showPortNumber=true (busiest regular system): portName_dst  portNumber_dst (from temp02)
   * showPortNumber=false (all others + special): portName_dst only
   */
  private drawInputPort(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    input: ConnectionData,
    showPortNumber: boolean = false
  ): void {
    doc.save();
    doc.font('Helvetica').fontSize(this.PORT_TEXT_SIZE).fillColor('black');
    
    const portName = input.portName_dst || '';
    const portX = x + this.CONTENT_PADDING;
    
    // All systems: portName_dst + 2 spaces + portNumber_dst; omit portNumber if empty
    const portNumber = input.portNumber_dst || '';
    const label = (portName && portNumber) ? `${portName}  ${portNumber}` : (portName || portNumber);
    doc.text(label || '—', portX, y, {
      width: this.SYSTEM_BLOCK_WIDTH / 2 - this.CONTENT_PADDING,
      ellipsis: true,
    });
    
    doc.restore();
  }

  /**
   * Draw output bubble with connection info
   * Format: systemName_dst space portName_dst space portNumber_dst space signalName_dst
   * Text goes INSIDE the bubble (rectangular/rounded rectangle)
   * Width: 2.0 inches to fit all text
   * If portNumber_dst is EMPTY, continue with space and add signalName_dst if not EMPTY
   */
  private drawOutputBubble(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    output: ConnectionData,
    isSpecialCase: boolean = false
  ): void {
    doc.save();

    // Format label:
    // Regular systems:  systemName_dst  portName_dst  portNumber_dst  signalName_src (from temp03)
    // Special systems (RTR-01/SW): systemName_dst  portName_dst  portNumber_dst  (NO signalName)
    const systemName = String(output.systemName_dst || '').trim();
    const portName = String(output.portName_dst || '').trim();
    const portNumber = String(output.portNumber_dst || '').trim();
    // signalName_src shown for ALL systems (both regular and special RTR-01/SW)
    const signalName = String(output.signalName_src || '').trim();
    
    // Build label with spaces for missing values
    const parts: string[] = [];
    if (systemName) parts.push(systemName);
    else parts.push(''); // Add space for missing systemName
    
    if (portName) parts.push(portName);
    else if (portNumber || signalName) parts.push(''); // Add space if later values exist
    
    if (portNumber) parts.push(portNumber);
    else if (signalName) parts.push(''); // Add space if signalName exists
    
    if (signalName) parts.push(signalName);
    
    const label = parts.filter((p, i) => p !== '' || i < parts.length - 1).join(' '); // Keep spaces, trim trailing empty

    // Draw bubble as rounded rectangle - text goes INSIDE
    doc.font('Helvetica').fontSize(this.BUBBLE_TEXT_SIZE).fillColor('black');
    const textWidth = doc.widthOfString(label);
    const textHeight = this.BUBBLE_TEXT_SIZE;
    
    // Calculate bubble dimensions (width: 2.0", height: 0.2")
    const bubbleWidth = this.OUTPUT_BUBBLE_WIDTH;
    const bubbleHeight = this.OUTPUT_BUBBLE_HEIGHT;
    const borderRadius = 0.05 * this.INCH; // Small border radius for rounded rectangle
    
    // Draw rounded rectangle bubble
    doc.lineWidth(0.5).strokeColor('black');
    doc.roundedRect(x, y, bubbleWidth, bubbleHeight, borderRadius);
    doc.stroke();
    
    // Left-align text – all rows start from the same X so they are visually lined up
    const OUT_BUBBLE_TEXT_PAD = 3; // 3pt left padding inside bubble
    const textY = y + (bubbleHeight - textHeight) / 2;
    doc.text(label, x + OUT_BUBBLE_TEXT_PAD, textY, {
      width: bubbleWidth - OUT_BUBBLE_TEXT_PAD * 2,
      align: 'left',
      ellipsis: true,
    });

    doc.restore();
  }

  /**
   * Draw output port inside block (right side)
   * showPortNumber=true (busiest regular system): portName_src  portNumber_src (from temp03)
   * showPortNumber=false (all others + special): portName_src only
   */
  private drawOutputPort(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    output: ConnectionData,
    showPortNumber: boolean = false
  ): void {
    doc.save();
    doc.font('Helvetica').fontSize(this.PORT_TEXT_SIZE).fillColor('black');
    
    const portName = output.portName_src || '';
    
    // All systems: portName_src + 2 spaces + portNumber_src; omit portNumber if empty
    const portNumberOut = output.portNumber_src || '';
    const labelOut = (portName && portNumberOut) ? `${portName}  ${portNumberOut}` : (portName || portNumberOut);

    // Left-align from the horizontal centre of the system block, with padding.
    // x = systemBlockX + SYSTEM_BLOCK_WIDTH (right edge); we step back to the midpoint.
    const halfWidth = this.SYSTEM_BLOCK_WIDTH / 2 - this.CONTENT_PADDING * 2;
    const portX = x - this.SYSTEM_BLOCK_WIDTH / 2 + this.CONTENT_PADDING; // starts at block centre + padding
    doc.text(labelOut || '—', portX, y, {
      width: halfWidth,
      align: 'left',
      ellipsis: true,
    });
    
    doc.restore();
  }


  /**
   * Generate multi-page wiring diagram if data is too large
   */
  async generateMultiPageWiringDiagram(
    options: WiringDiagramOptions
  ): Promise<string> {
    // Extract FuncSysName from temp00DwgLabel table
    const temp00Table = options.databaseData['temp00DwgLabel'];
    const temp00Data = (Array.isArray(temp00Table) ? temp00Table : temp00Table?.data || []) as DwgLabelData[];
    const funcSysName = temp00Data.length > 0 && temp00Data[0].FuncSysName 
      ? temp00Data[0].FuncSysName 
      : options.systemName; // Fallback to systemName if FuncSysName not found
    
    const systems = this.processSystemData(options.databaseData);
    console.log('--system', systems);

    const finalPath =
      options.outputPath ??
      path.join(app.getPath('temp'), `wiring-diagram-${Date.now()}.pdf`);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: [this.PAGE_WIDTH, this.PAGE_HEIGHT],
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
      });

      const stream = fs.createWriteStream(finalPath);
      doc.pipe(stream);

      // Separate special systems (left) and regular systems (right)
      const specialSystems = systems.filter(s => s.isSpecialCase);
      const regularSystems = systems.filter(s => !s.isSpecialCase);
      
      // Sort regular systems alphabetically by systemName (from temp01)
      regularSystems.sort((a, b) => {
        const nameA = a.systemName.toUpperCase();
        const nameB = b.systemName.toUpperCase();
        return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
      });
      
      // Calculate available height
      const boxY = this.LABEL + this.SAFE;
      const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
      const topHorizontalLineY = boxY + boxH - this.BOX_PADDING_TOP;
      
      // Use NORMAL spacing (same as drawing) for consistent calculation
      const contentStartOffset = 0.125 * this.INCH;
      const leftColumnOffset = this.LEFT_COLUMN_SPACING_FROM_TOP;
      const contentTopY = topHorizontalLineY - contentStartOffset;
      const leftColumnTopY = topHorizontalLineY - leftColumnOffset;
      const contentBottomY = boxY + this.BOX_PADDING_BOTTOM;
      
      // Calculate maxHeight for BOTH columns (use smaller one to be safe)
      const maxHeightRight = contentTopY - contentBottomY;
      const maxHeightLeft = leftColumnTopY - contentBottomY;
      const maxHeight = Math.min(maxHeightRight, maxHeightLeft);
      
      console.log(`📏 Page splitting calculations (using NORMAL DRAWING spacing):`);
      console.log(`   contentTopY: ${contentTopY.toFixed(2)}`);
      console.log(`   contentBottomY: ${contentBottomY.toFixed(2)}`);
      console.log(`   maxHeight: ${maxHeight.toFixed(2)}`);

      // Process both columns INDEPENDENTLY
      const leftPages: SystemBlock[][] = [];
      const rightPages: SystemBlock[][] = [];
      
      // Process LEFT column (special systems like RTR-01) - with splitting support
      let currentLeftPage: SystemBlock[] = [];
      let currentLeftHeight = 0;
      
      console.log(`\n🔵 Processing LEFT column:`);
      
      specialSystems.forEach((system, sysIndex) => {
        console.log(`   System ${sysIndex + 1}/${specialSystems.length}: ${system.systemName}, height: ${system.height.toFixed(2)}`);
        
        // Check if this single system is too tall for one page
        if (system.height > maxHeight) {
          console.log(`      ⚠️ System too tall (${system.height.toFixed(2)} > ${maxHeight.toFixed(2)}), splitting...`);
          // Need to split this system across multiple pages
          const chunks = this.splitSystemIntoChunks(system, maxHeight);
          
          chunks.forEach((chunk, chunkIndex) => {
            const chunkHeightWithSpacing = chunk.height + this.DIAGRAM_SPACING;
            const wouldExceed = currentLeftHeight + chunkHeightWithSpacing > maxHeight;
            const hasContent = currentLeftPage.length > 0;
            
            console.log(`      Chunk ${chunkIndex + 1}/${chunks.length}: height=${chunk.height.toFixed(2)}, with spacing=${chunkHeightWithSpacing.toFixed(2)}`);
            console.log(`         currentLeftHeight: ${currentLeftHeight.toFixed(2)}, would exceed? ${wouldExceed}`);
            
            if (wouldExceed && hasContent) {
              // Current page is full, start new page
              console.log(`         📝 Creating new LEFT page (current page full)`);
              leftPages.push([...currentLeftPage]);
              currentLeftPage = [chunk];
              currentLeftHeight = chunkHeightWithSpacing;
            } else {
              // Add to current page
              console.log(`         ➕ Adding chunk to current LEFT page`);
              currentLeftPage.push(chunk);
              currentLeftHeight += chunkHeightWithSpacing;
            }
          });
        } else {
          // Normal processing for systems that fit on one page
          const systemHeightWithSpacing = system.height + this.DIAGRAM_SPACING;
          const wouldExceed = currentLeftHeight + systemHeightWithSpacing > maxHeight;
          const hasContent = currentLeftPage.length > 0;
          
          console.log(`      System fits on one page: height=${system.height.toFixed(2)}, with spacing=${systemHeightWithSpacing.toFixed(2)}`);
          console.log(`         currentLeftHeight: ${currentLeftHeight.toFixed(2)}, would exceed? ${wouldExceed}`);
          
          if (wouldExceed && hasContent) {
            // Current page is full, start new page with this system
            console.log(`         📝 Creating new LEFT page (current page full)`);
            leftPages.push([...currentLeftPage]);
            currentLeftPage = [system];
            currentLeftHeight = systemHeightWithSpacing;
          } else {
            // Add to current page
            console.log(`         ➕ Adding system to current LEFT page`);
            currentLeftPage.push(system);
            currentLeftHeight += systemHeightWithSpacing;
          }
        }
        console.log(`      Current page total height: ${currentLeftHeight.toFixed(2)}/${maxHeight.toFixed(2)}`);
      });
      
      if (currentLeftPage.length > 0) {
        console.log(`   📝 Finalizing last LEFT page with ${currentLeftPage.length} systems, height: ${currentLeftHeight.toFixed(2)}`);
        leftPages.push(currentLeftPage);
      }
      
      console.log(`\n🔵 LEFT column summary: ${leftPages.length} pages created`);
      leftPages.forEach((page, i) => {
        const pageHeight = page.reduce((sum, sys) => sum + sys.height + this.DIAGRAM_SPACING, 0);
        console.log(`   Page ${i + 1}: ${page.length} systems, total height: ${pageHeight.toFixed(2)}`);
      });
      
      // Process RIGHT column (regular systems)
      let currentRightPage: SystemBlock[] = [];
      let currentRightHeight = 0;
      
      console.log(`\n🟢 Processing RIGHT column:`);
      
      regularSystems.forEach((system, sysIndex) => {
        console.log(`   System ${sysIndex + 1}/${regularSystems.length}: ${system.systemName}, height: ${system.height.toFixed(2)}`);
        
        const systemHeightWithSpacing = system.height + this.DIAGRAM_SPACING;
        const wouldExceed = currentRightHeight + systemHeightWithSpacing > maxHeight;
        const hasContent = currentRightPage.length > 0;
        
        console.log(`      height with spacing: ${systemHeightWithSpacing.toFixed(2)}`);
        console.log(`      currentRightHeight: ${currentRightHeight.toFixed(2)}, would exceed? ${wouldExceed}`);
        
        if (wouldExceed && hasContent) {
          // Current page is full, start new page with this system
          console.log(`      📝 Creating new RIGHT page (current page full)`);
          rightPages.push([...currentRightPage]);
          currentRightPage = [system];
          currentRightHeight = systemHeightWithSpacing;
        } else {
          // Add to current page
          console.log(`      ➕ Adding to current RIGHT page: ${system.systemName}`);
          currentRightPage.push(system);
          currentRightHeight += systemHeightWithSpacing;
        }
        console.log(`      Current page total height: ${currentRightHeight.toFixed(2)}/${maxHeight.toFixed(2)}`);
      });
      
      if (currentRightPage.length > 0) {
        console.log(`   📝 Finalizing last RIGHT page with ${currentRightPage.length} systems, height: ${currentRightHeight.toFixed(2)}`);
        rightPages.push(currentRightPage);
      }
      
      rightPages.forEach((page, i) => {
        const pageHeight = page.reduce((sum, sys) => sum + sys.height + this.DIAGRAM_SPACING, 0);
        console.log(`   Page ${i + 1}: ${page.length} systems, total height: ${pageHeight.toFixed(2)}`);
      });
      
      // Merge pages: create pages up to max of left/right page counts
      // NO LIMIT - support unlimited pages (scalable for 4-5+ pages if needed)
      const totalPages = Math.max(leftPages.length, rightPages.length);
      
      console.log(`\n📚 Total pages needed: ${totalPages}`);
      console.log(`   Left column pages: ${leftPages.length}`);
      console.log(`   Right column pages: ${rightPages.length}`);
      
      const pages: { left: SystemBlock[]; right: SystemBlock[] }[] = [];
      for (let i = 0; i < totalPages; i++) {
        pages.push({
          left: leftPages[i] || [],
          right: rightPages[i] || []
        });
      }


      // Draw each page
      pages.forEach((pageData, pageIndex) => {
        
        if (pageIndex > 0) {
          doc.addPage();
        }

        this.drawBaseLayout(
          doc,
          funcSysName,
          options.date,
          options.pageNumber + pageIndex,
          pageIndex === 0  // top horizontal line on first page only
        );

        // Adjust Y positions for this page
        const boxY = this.LABEL + this.SAFE;
        const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
        const topHorizontalLineY = boxY + boxH - this.BOX_PADDING_TOP;
        const actualTopY = boxY + this.BOX_PADDING_TOP; // Top horizontal line (Y=53)
        const contentBottomY = boxY + this.BOX_PADDING_BOTTOM;
        
        let currentYLeft: number;
        let currentYRight: number;
        
        const isFirstPage = pageIndex === 0;
        
        // ALL PAGES: Start from same TOP position (consistent spacing)
        const contentStartOffset = 0.2 * this.INCH;
        const leftColumnOffset = this.LEFT_COLUMN_SPACING_FROM_TOP;
        currentYRight = actualTopY + contentStartOffset; // Always start from top (~73)
        currentYLeft = actualTopY + leftColumnOffset; // Always start from top for left
        // Draw left side systems (special cases like RTR-01)
        pageData.left.forEach((system, index) => {
          
          system.y = currentYLeft;
          
          // Border logic is already set by splitSystemIntoChunks, but we can override for page continuation
          // Check if this is a continuation scenario across pages (not just chunks)
          if (system.isSpecialCase && totalPages > 1) {
            const prevPage = pageIndex > 0 ? pages[pageIndex - 1] : null;
            const nextPage = pageIndex < totalPages - 1 ? pages[pageIndex + 1] : null;
            
            // Check if same system continues from previous page
            const continuesFromPrev = prevPage && prevPage.left.length > 0 && 
                                      prevPage.left[prevPage.left.length - 1].systemName === system.systemName;
            // Check if same system continues to next page
            const continuesToNext = nextPage && nextPage.left.length > 0 && 
                                    nextPage.left[0].systemName === system.systemName;
            
            if (continuesFromPrev && index === 0) {
              system.drawTopBorder = false;
              console.log(`    → No top border (continues from prev page)`);
            }
            if (continuesToNext && index === pageData.left.length - 1) {
              system.drawBottomBorder = false;
              console.log(`    → No bottom border (continues to next page)`);
            }
          }
          
          this.drawSystemBlock(doc, system, true);
          currentYLeft += system.height + this.DIAGRAM_SPACING;
        });

        // Draw right side systems (regular systems)
        pageData.right.forEach((system, index) => {
          system.y = currentYRight;
          this.drawSystemBlock(doc, system, false);
          currentYRight += system.height + this.DIAGRAM_SPACING;
          console.log(`      AFTER drawing: currentYRight = ${currentYRight.toFixed(2)} (for next system)`);
        });
        
        console.log(`\n   📊 Page ${pageIndex + 1} Summary:`);
        console.log(`      Final currentYLeft: ${currentYLeft.toFixed(2)}`);
        console.log(`      Final currentYRight: ${currentYRight.toFixed(2)}`);
        console.log(`📄 ========== PAGE ${pageIndex + 1} END ==========\n`);
      });

      console.log(`\n✅ Multi-page generation complete: ${totalPages} pages\n`);

      doc.end();

      stream.on('finish', () => resolve(finalPath));
      stream.on('error', reject);
    });
  }

  /**
   * Calculate how many systems fit per page
   */
  private calculateSystemsPerPage(systems: SystemBlock[]): number {
    const maxHeight = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE) - 
                      this.BOX_PADDING_TOP - this.BOX_PADDING_BOTTOM;
    let currentHeight = 0;
    let count = 0;

    for (const system of systems) {
      if (currentHeight + system.height + (0.3 * this.INCH) <= maxHeight) {
        currentHeight += system.height + (0.3 * this.INCH);
        count++;
      } else {
        break;
      }
    }

    return count || 1; // At least 1 system per page
  }

  /**
   * Split a system that's too tall into multiple chunks that fit on separate pages
   */
  private splitSystemIntoChunks(system: SystemBlock, maxHeight: number): SystemBlock[] {
    const chunks: SystemBlock[] = [];
    
    // Calculate how many rows (inputs/outputs) fit per page
    const headerHeight = this.HEADER_HEIGHT;
    const contentPadding = this.CONTENT_PADDING * 2;
    const availableContentHeight = maxHeight - headerHeight - contentPadding;
    const rowsPerPage = Math.floor(availableContentHeight / this.ROW_HEIGHT);
    
    if (rowsPerPage <= 0) {
      console.error('⚠️  Page too small to fit any rows!');
      return [system]; // Return original if we can't split
    }
    
    // Get all inputs and outputs in original order
    const allInputs = system.inputs;
    const allOutputs = system.outputs;
    const totalRows = Math.max(allInputs.length, allOutputs.length);
    
    const numChunks = Math.ceil(totalRows / rowsPerPage);
    
    console.log(`📋 Splitting ${system.systemName}: ${totalRows} rows → ${numChunks} chunks (${rowsPerPage} rows/page)`);
    
    for (let i = 0; i < numChunks; i++) {
      const startRow = i * rowsPerPage;
      const endRow = Math.min((i + 1) * rowsPerPage, totalRows);
      const chunkRows = endRow - startRow;
      
      // Slice inputs and outputs for this chunk - PRESERVING ORIGINAL ORDER
      const chunkInputs = allInputs.slice(startRow, Math.min(endRow, allInputs.length));
      const chunkOutputs = allOutputs.slice(startRow, Math.min(endRow, allOutputs.length));
      
      // Calculate chunk height
      const contentHeight = chunkRows * this.ROW_HEIGHT;
      const chunkHeight = headerHeight + contentHeight + contentPadding;
      
      const chunk: SystemBlock = {
        ...system,
        inputs: chunkInputs, // Original order preserved
        outputs: chunkOutputs, // Original order preserved
        continuationInputs: [], // Not used - checked during drawing
        continuationOutputs: [], // Not used - checked during drawing
        height: chunkHeight,
        drawTopBorder: i === 0, // First chunk has top border
        drawBottomBorder: i === numChunks - 1, // Last chunk has bottom border
      };
      
      chunks.push(chunk);
      
      console.log(`  Chunk ${i + 1}/${numChunks}: rows ${startRow}-${endRow}, height=${chunkHeight.toFixed(1)}`);
    }
    
    return chunks;
  }
}

export const wiringDiagramGenerator = new WiringDiagramGenerator();
