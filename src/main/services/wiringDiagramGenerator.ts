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

interface WiringDiagramOptions {
  pageNumber: number;
  systemName: string;
  date: string;
  databaseData: {
    [tableName: string]: {
      data?: SystemData[] | ConnectionData[];
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
  // ALL DIAGRAMS ON RIGHT SIDE ONLY
  private readonly LEFT_COLUMN_X = 1.25 * this.INCH; // Left side for RTR-01 (starts at first line)
  private readonly RIGHT_COLUMN_X = 9.0 * this.INCH; // Right side - start position after center line
  private readonly CENTER_LINE_X = 8.75 * this.INCH; // Center split line (matches pdfGenerator LINE_X[1])
  private readonly RIGHT_EDGE_X = 16.375 * this.INCH; // Right edge (third vertical line)
  
  // Component widths (from reference image)
  private readonly INPUT_BUBBLE_WIDTH = 2.0 * this.INCH; // 2.0" width to fit all fields easily
  private readonly INPUT_BUBBLE_HEIGHT = 0.125 * this.INCH; // Match row height for rectangular bubble
  private readonly CABLE_ID_BOX_WIDTH = 0.625 * this.INCH; // 0.625" width for cable ID box
  private readonly CONNECTOR_LINE_WIDTH = 0.25 * this.INCH; // 0.25" spacing between components
  private readonly SYSTEM_BLOCK_WIDTH = 1.5 * this.INCH; // 1.5" width for system block (from image)
  private readonly OUTPUT_BUBBLE_WIDTH = 2.0 * this.INCH; // 2.0" width to match input bubble
  private readonly OUTPUT_BUBBLE_HEIGHT = 0.125 * this.INCH; // Match row height for rectangular bubble
  private readonly DIAGRAM_SPACING = 0.2 * this.INCH; // Minimal spacing between diagrams (0.2")
  
  // Bubble and spacing constants
  private readonly BUBBLE_SIZE = 0.15 * this.INCH; // 0.15" diameter (for connection point)
  private readonly BUBBLE_SPACING = 0.125 * this.INCH; // 0.125" vertical spacing between bubbles
  
  // Block dimensions
  private readonly MIN_BLOCK_HEIGHT = 0.8 * this.INCH; // Minimum block height (0.7998" from image)
  private readonly HEADER_HEIGHT = 0.4 * this.INCH; // Header section height
  private readonly HEADER_PADDING = 0.05 * this.INCH; // Padding inside header (0.05" from image)
  private readonly CONTENT_PADDING = 0.05 * this.INCH; // Padding for content inside block (0.05" from image)
  private readonly CONTENT_START_Y = 0.8 * this.INCH; // Content start Y position (0.8" from image)
  private readonly ROW_HEIGHT = 0.125 * this.INCH; // Height per input/output row (0.125" from image)
  
  // Font sizes (matching image specs - Arial)
  private readonly HEADER_TEXT_SIZE = 7; // For system name and frame name (Arial 0.07")
  private readonly LOCATION_TEXT_SIZE = 6; // For location
  private readonly BUBBLE_TEXT_SIZE = 4.32; // For bubble labels (Arial 0.06" = 4.32pt)
  private readonly PORT_TEXT_SIZE = 4.32; // For port names inside block (Arial 0.06")

  // System name mapping for special cases
  private readonly SPECIAL_SYSTEMS = ['RTR-01', 'RTR01'];

  /**
   * Generate wiring diagram from database data
   * Automatically handles multi-page if needed
   */
  async generateWiringDiagram(options: WiringDiagramOptions): Promise<string> {
    // Process systems first to check if multi-page is needed
    const systems = this.processSystemData(options.databaseData);
    
    // Check if we need multiple pages
    const boxY = this.LABEL + this.SAFE;
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
    const contentTopY = boxY + boxH - this.BOX_PADDING_TOP;
    const contentBottomY = boxY + this.BOX_PADDING_BOTTOM;
    const maxHeight = contentTopY - contentBottomY;
    
    let totalHeight = 0;
    const specialSystems = systems.filter(s => s.isSpecialCase);
    const regularSystems = systems.filter(s => !s.isSpecialCase);
    
    // Calculate total height needed
    specialSystems.forEach(system => {
      totalHeight += system.height + this.DIAGRAM_SPACING;
    });
    regularSystems.forEach(system => {
      totalHeight += system.height + this.DIAGRAM_SPACING;
    });
    
    // If content exceeds page height, use multi-page
    if (totalHeight > maxHeight) {
      return this.generateMultiPageWiringDiagram(options);
    }
    
    // Single page generation
    const { pageNumber, systemName, date, outputPath } = options;
    const finalPath =
      outputPath ??
      path.join(app.getPath('documents'), `wiring-diagram-${Date.now()}.pdf`);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: [this.PAGE_WIDTH, this.PAGE_HEIGHT],
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
      });

      const stream = fs.createWriteStream(finalPath);
      doc.pipe(stream);

      // Draw base layout (borders, labels, etc.)
      this.drawBaseLayout(doc, systemName, date, pageNumber);

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
    
    const temp01 = (Array.isArray(temp01Table) ? temp01Table : temp01Table?.data || []) as SystemData[];
    const temp02 = (Array.isArray(temp02Table) ? temp02Table : temp02Table?.data || []) as ConnectionData[];
    const temp03 = (Array.isArray(temp03Table) ? temp03Table : temp03Table?.data || []) as ConnectionData[];
    
    // Console log for temp02 data and cable ID
    console.log('\n🔍 TEMP02 DATA PROCESSING:');
    console.log(`Total temp02 records: ${temp02.length}`);
    if (temp02.length > 0) {
      console.log('First temp02 record keys:', Object.keys(temp02[0]));
      console.log('First temp02 record:', JSON.stringify(temp02[0], null, 2));
      
      // Check for cableId in different possible field names
      const firstRecord = temp02[0];
      const cableIdValue = firstRecord.cableId || firstRecord.cable_id || firstRecord.CableId || 
                          firstRecord.Cable_ID || firstRecord['Cable ID'] || firstRecord['cable ID'];
      console.log(`🔍 Cable ID from first record: ${cableIdValue || 'NOT FOUND'}`);
      
      // Check how many records have cableId
      const recordsWithCableId = temp02.filter((conn: ConnectionData) => {
        const cid = conn.cableId || conn.cable_id || (conn as any).CableId || 
                   (conn as any).Cable_ID || (conn as any)['Cable ID'] || (conn as any)['cable ID'];
        return cid && cid.toString().trim() !== '';
      });
      console.log(`Records with cable ID: ${recordsWithCableId.length} out of ${temp02.length}`);
    }

    // Create a map of system names from temp01 for quick lookup
    const systemNameMap = new Set(
      temp01.map((sys: SystemData) => sys.systemName?.toUpperCase())
    );

    // Process each system from temp01
    temp01.forEach((system: SystemData) => {
      const sysName = system.systemName || '';
      const isSpecial = this.SPECIAL_SYSTEMS.some(s => 
        sysName.toUpperCase().includes(s.toUpperCase())
      );

      // Get inputs for this system (from temp02 where systemName_dst matches)
      const inputs = temp02.filter((conn: ConnectionData) => {
        const dstName = conn.systemName_dst || '';
        return dstName.toUpperCase() === sysName.toUpperCase();
      });
      
      // Console log for inputs and cable ID for this system
      if (inputs.length > 0) {
        console.log(`\n🔍 Processing inputs for system: ${sysName}`);
        console.log(`Found ${inputs.length} input connections`);
        inputs.forEach((input: ConnectionData, index: number) => {
          // Try multiple possible field names for cableId
          const cableId = input.cableId || input.cable_id || (input as any).CableId || 
                         (input as any).Cable_ID || (input as any)['Cable ID'] || (input as any)['cable ID'];
          console.log(`  Input ${index + 1}:`);
          console.log(`    systemName_src: ${input.systemName_src}`);
          console.log(`    portName_src: ${input.portName_src}`);
          console.log(`    portNumber_src: ${input.portNumber_src}`);
          console.log(`    signalName_src: ${input.signalName_src}`);
          console.log(`    🔍 cableId: ${cableId || 'NOT FOUND'}`);
          console.log(`    All keys: ${Object.keys(input).join(', ')}`);
        });
      }
      
      // Separate inputs into two types:
      // 1. Regular inputs (need input bubble)
      // 2. Continuation inputs (systemName_src matches temp01.systemName - no bubble, just line)
      const regularInputs = inputs.filter((conn: ConnectionData) => {
        const srcName = conn.systemName_src || '';
        return !systemNameMap.has(srcName.toUpperCase());
      });
      
      const continuationInputs = inputs.filter((conn: ConnectionData) => {
        const srcName = conn.systemName_src || '';
        return systemNameMap.has(srcName.toUpperCase());
      });

      // Get outputs for this system (from temp03 where systemName_src matches)
      const allOutputs = temp03.filter((conn: ConnectionData) => {
        const srcName = conn.systemName_src || '';
        return srcName.toUpperCase() === sysName.toUpperCase();
      });
      
      // Separate outputs into two types:
      // 1. Regular outputs (need output bubble)
      // 2. Continuation outputs (systemName_dst matches temp01.systemName - no bubble, just line)
      const regularOutputs = allOutputs.filter((conn: ConnectionData) => {
        const dstName = conn.systemName_dst || '';
        return !systemNameMap.has(dstName.toUpperCase());
      });
      
      const continuationOutputs = allOutputs.filter((conn: ConnectionData) => {
        const dstName = conn.systemName_dst || '';
        return systemNameMap.has(dstName.toUpperCase());
      });

      // Calculate block height based on MAX(inputs + continuationInputs, outputs + continuationOutputs) from temp01
      // Height = header + content area (based on max connections)
      const totalInputs = regularInputs.length + continuationInputs.length;
      const totalOutputs = regularOutputs.length + continuationOutputs.length;
      const maxConnections = Math.max(totalInputs, totalOutputs);
      const contentHeight = maxConnections * this.ROW_HEIGHT;
      const height = Math.max(
        this.MIN_BLOCK_HEIGHT,
        this.HEADER_HEIGHT + contentHeight + (this.CONTENT_PADDING * 2)
      );

      systems.push({
        systemName: sysName,
        location: system.location || '',
        frameName: system.frameName || system.systemName || '',
        inputs: regularInputs,
        outputs: regularOutputs,
        continuationInputs,
        continuationOutputs,
        x: isSpecial ? this.LEFT_COLUMN_X : this.RIGHT_COLUMN_X,
        y: 0, // Will be calculated during layout
        width: this.SYSTEM_BLOCK_WIDTH,
        height,
        isSpecialCase: isSpecial,
      });
    });

    return systems;
  }

  /**
   * Draw base layout (borders, labels, vertical lines)
   */
  private drawBaseLayout(
    doc: PDFKit.PDFDocument,
    systemName: string,
    date: string,
    pageNumber: number
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

      // Labels
      const xInches = (x / this.INCH).toFixed(2);
      const yTopInches = ((this.PAGE_HEIGHT - topY) / this.INCH).toFixed(3);
      const yBottomInches = ((this.PAGE_HEIGHT - bottomY) / this.INCH).toFixed(3);

      doc.save();
      doc.font('Helvetica').fontSize(8).fillColor('black');
      const topLabel = `${xInches}",${yTopInches}"`;
      const bottomLabel = `${xInches}",${yBottomInches}"`;
      doc.text(topLabel, x - doc.widthOfString(topLabel) / 2, topY + 4);
      doc.text(bottomLabel, x - doc.widthOfString(bottomLabel) / 2, bottomY - 12);
      doc.restore();
    });

    // Draw horizontal line at the TOP of the page connecting all three vertical lines
    doc.save();
    doc.lineWidth(0.6).strokeColor('black');
    // Draw at the actual top of the content area (inside the box, at the top)
    const actualTopY = boxY + this.BOX_PADDING_TOP;
    doc.moveTo(LINE_X[0], actualTopY);
    doc.lineTo(LINE_X[1], actualTopY);
    doc.lineTo(LINE_X[2], actualTopY);
    doc.stroke();
    doc.restore();

    // Draw left vertical text
    const text = `${systemName} | ${date} | pg${pageNumber}`;
    const centerY = boxY + boxH / 2;
    const textX = boxX + 15;
    doc.save();
    doc.font('Helvetica-Bold').fontSize(12);
    doc.translate(textX, centerY);
    doc.rotate(-90);
    doc.text(text, 0, 0, { align: 'center' });
    doc.restore();

    // Draw corner labels
    doc.save();
    doc.font('Courier').fontSize(7).fillColor('black');
    doc.text(`0", 11"`, boxX - 6, boxY - 12);
    doc.text(`17", 11"`, boxX + boxW - 36, boxY - 12);
    doc.text(`0", 0"`, boxX - 6, boxY + boxH + 2);
    doc.text(`17", 0"`, boxX + boxW - 36, boxY + boxH + 2);
    doc.restore();
  }

  /**
   * Draw wiring diagram with system blocks
   */
  private drawWiringDiagram(doc: PDFKit.PDFDocument, systems: SystemBlock[]): void {
    const boxX = this.LABEL + this.SAFE;
    const boxY = this.LABEL + this.SAFE;
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
    const contentTopY = boxY + boxH - this.BOX_PADDING_TOP;
    const contentBottomY = boxY + this.BOX_PADDING_BOTTOM;

    // Separate special systems (left) and regular systems (right)
    const specialSystems = systems.filter(s => s.isSpecialCase);
    const regularSystems = systems.filter(s => !s.isSpecialCase);

    // Sort regular systems alphabetically by systemName (from temp01)
    // This ensures ACNV-01, ACNV-02, ACNV-03, then APRC-10, etc.
    regularSystems.sort((a, b) => {
      const nameA = a.systemName.toUpperCase();
      const nameB = b.systemName.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    // Layout systems vertically - ensure equal alignment
    // Both left and right start from same Y position for equal alignment
    let currentYLeft = contentTopY;
    let currentYRight = contentTopY;

    // Draw special systems on left (RTR-01) - align equally with right side
    specialSystems.forEach((system) => {
      system.y = currentYLeft - system.height;
      this.drawSystemBlock(doc, system, true);
      currentYLeft = system.y - this.DIAGRAM_SPACING; // Use same minimal spacing as right side
    });

    // Draw regular systems on right with minimal spacing (sorted alphabetically)
    regularSystems.forEach((system) => {
      system.y = currentYRight - system.height;
      this.drawSystemBlock(doc, system, false);
      currentYRight = system.y - this.DIAGRAM_SPACING; // Minimal spacing between diagrams
    });
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

    // Calculate X positions for right side layout
    // Starting from center line (8.75"), add spacing and components
    let currentX = this.RIGHT_COLUMN_X;
    
    // Position 1: Input bubble area (1.625" width)
    const inputBubbleX = currentX;
    currentX += this.INPUT_BUBBLE_WIDTH;
    
    // Position 2: Line + Cable ID box (0.625" width)
    const inputCableX = currentX + this.CONNECTOR_LINE_WIDTH;
    currentX += this.CONNECTOR_LINE_WIDTH + this.CABLE_ID_BOX_WIDTH;
    
    // Position 3: Line + System block (1.5" width)
    const systemBlockX = currentX + this.CONNECTOR_LINE_WIDTH;
    currentX += this.CONNECTOR_LINE_WIDTH + this.SYSTEM_BLOCK_WIDTH;
    
    // Position 4: Line + Cable ID box (0.625" width)
    const outputCableX = currentX + this.CONNECTOR_LINE_WIDTH;
    currentX += this.CONNECTOR_LINE_WIDTH + this.CABLE_ID_BOX_WIDTH;
    
    // Position 5: Line + Output bubble (1.625" width)
    const outputBubbleX = currentX + this.CONNECTOR_LINE_WIDTH;

    // Draw header (systemName space frameName - NO BOX, just text) above system block
    const headerY = y + this.HEADER_PADDING;
    
    // Line 1: systemName space frameName (if frameName exists and different)
    doc.font('Helvetica').fontSize(this.HEADER_TEXT_SIZE).fillColor('black');
    const headerText = frameName && frameName !== systemName 
      ? `${systemName} ${frameName}` 
      : systemName;
    doc.text(headerText, systemBlockX + this.CONTENT_PADDING, headerY);
    
    // Line 2: location (if exists)
    if (location) {
      doc.font('Helvetica').fontSize(this.LOCATION_TEXT_SIZE).fillColor('black');
      const locationY = headerY + (this.HEADER_TEXT_SIZE * 1.2);
      doc.text(location, systemBlockX + this.CONTENT_PADDING, locationY);
    }

    // Draw system block border (only around content area, not header)
    const contentY = y + this.HEADER_HEIGHT;
    const contentHeight = system.height - this.HEADER_HEIGHT;
    
    doc.lineWidth(1).strokeColor('black');
    doc.rect(systemBlockX, contentY, this.SYSTEM_BLOCK_WIDTH, contentHeight).stroke();

    // Draw content area: inputs on left, outputs on right
    const contentStartY = contentY + this.CONTENT_PADDING;
    
    // Combine all inputs and outputs for display order
    const allInputs = [...inputs, ...continuationInputs];
    const allOutputs = [...outputs, ...continuationOutputs];
    let inputIndex = 0;
    let outputIndex = 0;
    
    // Draw regular inputs (left side) - portName_dst from temp02
    inputs.forEach((input, index) => {
      const rowY = contentStartY + (inputIndex * this.ROW_HEIGHT);
      this.drawInputPort(doc, systemBlockX, rowY, input);
      inputIndex++;
    });
    
    // Draw continuation inputs (left side) - portName_dst from temp02
    continuationInputs.forEach((input, index) => {
      const rowY = contentStartY + (inputIndex * this.ROW_HEIGHT);
      this.drawInputPort(doc, systemBlockX, rowY, input);
      inputIndex++;
    });

    // Draw regular outputs (right side) - portName_src from temp03
    outputs.forEach((output, index) => {
      const rowY = contentStartY + (outputIndex * this.ROW_HEIGHT);
      this.drawOutputPort(doc, systemBlockX + this.SYSTEM_BLOCK_WIDTH, rowY, output);
      outputIndex++;
    });
    
    // Draw continuation outputs (right side) - portName_src from temp03
    continuationOutputs.forEach((output, index) => {
      const rowY = contentStartY + (outputIndex * this.ROW_HEIGHT);
      this.drawOutputPort(doc, systemBlockX + this.SYSTEM_BLOCK_WIDTH, rowY, output);
      outputIndex++;
    });

    // Draw regular input bubbles, lines, and cable IDs (left side of system block)
    inputIndex = 0;
    inputs.forEach((input, index) => {
      const rowY = contentStartY + (inputIndex * this.ROW_HEIGHT);
      const centerY = rowY + (this.ROW_HEIGHT / 2);
      
      // Draw input bubble (rectangular/oval)
      this.drawInputBubble(doc, inputBubbleX, rowY, input);
      
      // Draw connecting line from bubble to cable ID
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(inputBubbleX + this.INPUT_BUBBLE_WIDTH, centerY);
      doc.lineTo(inputCableX, centerY);
      doc.stroke();
      
      // Draw input cable ID box from temp02 - prioritize cableID (capital ID)
      const inputCableId = (input as any).cableID || input.cableId || input.cable_id || (input as any).CableId || 
                          (input as any).Cable_ID || (input as any)['Cable ID'] || (input as any)['cable ID'];
      if (inputCableId) {
        this.drawCableIdBox(doc, inputCableX, rowY, inputCableId.toString());
      }
      
      // Draw connecting line from cable ID to system block
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(inputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
      doc.lineTo(systemBlockX, centerY);
      doc.stroke();
      
      inputIndex++;
    });
    
    // Draw continuation inputs (no bubble, just line from center)
    continuationInputs.forEach((input, index) => {
      const rowY = contentStartY + (inputIndex * this.ROW_HEIGHT);
      const centerY = rowY + (this.ROW_HEIGHT / 2);
      
      // Draw simple line from center line (8.75") to cable ID
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(this.CENTER_LINE_X, centerY);
      doc.lineTo(inputCableX, centerY);
      doc.stroke();
      
      // Draw input cable ID box for continuation input from temp02 - prioritize cableID (capital ID)
      const continuationInputCableId = (input as any).cableID || input.cableId || input.cable_id || (input as any).CableId || 
                                      (input as any).Cable_ID || (input as any)['Cable ID'] || (input as any)['cable ID'];
      if (continuationInputCableId) {
        this.drawCableIdBox(doc, inputCableX, rowY, continuationInputCableId.toString());
      }
      
      // Draw connecting line from cable ID to system block
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(inputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
      doc.lineTo(systemBlockX, centerY);
      doc.stroke();
      
      inputIndex++;
    });

    // Draw regular output bubbles, lines, and cable IDs (right side of system block)
    outputIndex = 0;
    outputs.forEach((output, index) => {
      const rowY = contentStartY + (outputIndex * this.ROW_HEIGHT);
      const centerY = rowY + (this.ROW_HEIGHT / 2);
      
      // Draw connecting line from system block to cable ID
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, centerY);
      doc.lineTo(outputCableX, centerY);
      doc.stroke();
      
      // Draw output cable ID box from temp03 - prioritize cableID (capital ID)
      const outputCableId = (output as any).cableID || output.cableId || output.cable_id || (output as any).CableId || 
                           (output as any).Cable_ID || (output as any)['Cable ID'] || (output as any)['cable ID'];
      if (outputCableId) {
        this.drawCableIdBox(doc, outputCableX, rowY, outputCableId.toString());
      }
      
      // Draw connecting line from cable ID to output bubble
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(outputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
      doc.lineTo(outputBubbleX, centerY);
      doc.stroke();
      
      // Draw output bubble (rectangular/oval)
      this.drawOutputBubble(doc, outputBubbleX, rowY, output);
      
      outputIndex++;
    });
    
    // Draw continuation outputs (no bubble, just line to center)
    continuationOutputs.forEach((output, index) => {
      const rowY = contentStartY + (outputIndex * this.ROW_HEIGHT);
      const centerY = rowY + (this.ROW_HEIGHT / 2);
      
      // Draw connecting line from system block to cable ID
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, centerY);
      doc.lineTo(outputCableX, centerY);
      doc.stroke();
      
      // Draw output cable ID box for continuation output from temp03 - prioritize cableID (capital ID)
      const continuationOutputCableId = (output as any).cableID || output.cableId || output.cable_id || (output as any).CableId || 
                                        (output as any).Cable_ID || (output as any)['Cable ID'] || (output as any)['cable ID'];
      if (continuationOutputCableId) {
        this.drawCableIdBox(doc, outputCableX, rowY, continuationOutputCableId.toString());
      } else {
        console.log(`⚠️  No cable ID found for continuation output. System: ${systemName}, Available keys: ${Object.keys(output).join(', ')}`);
      }
      
      // Draw simple line from cable ID to center line (8.75")
      doc.lineWidth(0.5).strokeColor('black');
      doc.moveTo(outputCableX + this.CABLE_ID_BOX_WIDTH, centerY);
      doc.lineTo(this.CENTER_LINE_X, centerY);
      doc.stroke();
      
      outputIndex++;
    });

    // Special case: RTR-01 continuation line at bottom
    if (system.isSpecialCase && isLeftSide) {
      const lineY = y - 0.1 * this.INCH;
      doc.lineWidth(1).strokeColor('black');
      doc.moveTo(systemBlockX, lineY);
      doc.lineTo(systemBlockX + this.SYSTEM_BLOCK_WIDTH, lineY);
      doc.stroke();
    }

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
    doc.lineWidth(0.5).strokeColor('black');
    doc.rect(x, y, this.CABLE_ID_BOX_WIDTH, this.ROW_HEIGHT);
    doc.stroke();
    
    // Draw cable ID text (centered in box)
    const textX = x + (this.CABLE_ID_BOX_WIDTH - textWidth) / 2;
    const textY = y + (this.ROW_HEIGHT - this.BUBBLE_TEXT_SIZE) / 2;
    doc.text(cableText, textX, textY);
    
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
    // If portNumber_src is EMPTY, continue with space and add signalName_src if not EMPTY
    const parts: string[] = [];
    if (input.systemName_src) parts.push(input.systemName_src);
    if (input.portName_src) parts.push(input.portName_src);
    if (input.portNumber_src) {
      parts.push(input.portNumber_src);
      if (input.signalName_src) parts.push(input.signalName_src);
    } else {
      // If portNumber_src is empty, add space and signalName_src if exists
      if (input.signalName_src) parts.push(input.signalName_src);
    }
    
    const label = parts.join(' '); // Single space between parts

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
    
    // Center text inside bubble
    const textX = x + (bubbleWidth - textWidth) / 2;
    const textY = y + (bubbleHeight - textHeight) / 2;
    
    // If text is too wide, wrap it
    if (textWidth > bubbleWidth - 0.1 * this.INCH) {
      doc.text(label, x + 0.05 * this.INCH, textY, {
        width: bubbleWidth - 0.1 * this.INCH,
        align: 'center',
        ellipsis: true,
      });
    } else {
      // Text fits - center it perfectly
      doc.text(label, textX, textY);
    }

    doc.restore();
  }

  /**
   * Draw input port inside block (left side)
   * Shows portName_dst from temp02
   */
  private drawInputPort(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    input: ConnectionData
  ): void {
    doc.save();
    doc.font('Helvetica').fontSize(this.PORT_TEXT_SIZE).fillColor('black');
    
    const portName = input.portName_dst || '';
    const portX = x + this.CONTENT_PADDING;
    
    doc.text(portName, portX, y);
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
    output: ConnectionData
  ): void {
    doc.save();

    // Format label: systemName_dst space portName_dst space portNumber_dst space signalName_dst
    // If portNumber_dst is EMPTY, continue with space and add signalName_dst if not EMPTY
    const parts: string[] = [];
    if (output.systemName_dst) parts.push(output.systemName_dst);
    if (output.portName_dst) parts.push(output.portName_dst);
    if (output.portNumber_dst) {
      parts.push(output.portNumber_dst);
      if (output.signalName_dst) parts.push(output.signalName_dst);
    } else {
      // If portNumber_dst is empty, add space and signalName_dst if exists
      if (output.signalName_dst) parts.push(output.signalName_dst);
    }
    
    const label = parts.join(' '); // Single space between parts

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
    
    // Center text inside bubble
    const textX = x + (bubbleWidth - textWidth) / 2;
    const textY = y + (bubbleHeight - textHeight) / 2;
    
    // If text is too wide, wrap it
    if (textWidth > bubbleWidth - 0.1 * this.INCH) {
      doc.text(label, x + 0.05 * this.INCH, textY, {
        width: bubbleWidth - 0.1 * this.INCH,
        align: 'center',
        ellipsis: true,
      });
    } else {
      // Text fits - center it perfectly
      doc.text(label, textX, textY);
    }

    doc.restore();
  }

  /**
   * Draw output port inside block (right side)
   * Shows portName_src from temp03 (output port name)
   * Note: Based on reference image, outputs use portName_src from temp03
   */
  private drawOutputPort(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    output: ConnectionData
  ): void {
    doc.save();
    doc.font('Helvetica').fontSize(this.PORT_TEXT_SIZE).fillColor('black');
    
    // Output port name from temp03 (portName_src)
    const portName = output.portName_src || '';
    const textWidth = doc.widthOfString(portName);
    const portX = x - textWidth - this.CONTENT_PADDING;
    
    doc.text(portName, portX, y);
    doc.restore();
  }


  /**
   * Generate multi-page wiring diagram if data is too large
   */
  async generateMultiPageWiringDiagram(
    options: WiringDiagramOptions
  ): Promise<string> {
    const systems = this.processSystemData(options.databaseData);
    const systemsPerPage = this.calculateSystemsPerPage(systems);

    const finalPath =
      options.outputPath ??
      path.join(app.getPath('documents'), `wiring-diagram-${Date.now()}.pdf`);

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
        return nameA.localeCompare(nameB);
      });
      
      // Split systems into pages
      // We need to track both left and right columns separately
      const pages: { left: SystemBlock[]; right: SystemBlock[] }[] = [];
      let currentPageLeft: SystemBlock[] = [];
      let currentPageRight: SystemBlock[] = [];
      let currentHeightLeft = 0;
      let currentHeightRight = 0;
      const maxHeight = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE) - 
                        this.BOX_PADDING_TOP - this.BOX_PADDING_BOTTOM;

      // Process special systems (left side)
      specialSystems.forEach((system) => {
        if (currentHeightLeft + system.height > maxHeight && currentPageLeft.length > 0) {
          // Start new page
          if (currentPageLeft.length > 0 || currentPageRight.length > 0) {
            pages.push({ left: currentPageLeft, right: currentPageRight });
          }
          currentPageLeft = [system];
          currentPageRight = [];
          currentHeightLeft = system.height;
          currentHeightRight = 0;
        } else {
          currentPageLeft.push(system);
          currentHeightLeft += system.height + this.DIAGRAM_SPACING;
        }
      });

      // Process regular systems (right side)
      regularSystems.forEach((system) => {
        // Check if we need a new page
        const maxHeightNeeded = Math.max(
          currentHeightLeft + (currentPageLeft.length > 0 ? this.DIAGRAM_SPACING : 0),
          currentHeightRight + system.height + this.DIAGRAM_SPACING
        );
        
        if (maxHeightNeeded > maxHeight && (currentPageLeft.length > 0 || currentPageRight.length > 0)) {
          // Start new page
          pages.push({ left: currentPageLeft, right: currentPageRight });
          currentPageLeft = [];
          currentPageRight = [system];
          currentHeightLeft = 0;
          currentHeightRight = system.height;
        } else {
          currentPageRight.push(system);
          currentHeightRight += system.height + this.DIAGRAM_SPACING;
        }
      });

      // Add last page if it has content
      if (currentPageLeft.length > 0 || currentPageRight.length > 0) {
        pages.push({ left: currentPageLeft, right: currentPageRight });
      }

      // Draw each page
      pages.forEach((pageData, pageIndex) => {
        if (pageIndex > 0) {
          doc.addPage();
        }

        this.drawBaseLayout(
          doc,
          options.systemName,
          options.date,
          options.pageNumber + pageIndex
        );

        // Adjust Y positions for this page
        const boxY = this.LABEL + this.SAFE;
        const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
        const contentTopY = boxY + boxH - this.BOX_PADDING_TOP;

        // Both left and right start from same Y position for equal alignment
        let currentYLeft = contentTopY;
        let currentYRight = contentTopY;

        // Draw left side systems (special cases like RTR-01)
        pageData.left.forEach((system) => {
          system.y = currentYLeft - system.height;
          this.drawSystemBlock(doc, system, true);
          currentYLeft = system.y - this.DIAGRAM_SPACING;
        });

        // Draw right side systems (regular systems)
        pageData.right.forEach((system) => {
          system.y = currentYRight - system.height;
          this.drawSystemBlock(doc, system, false);
          currentYRight = system.y - this.DIAGRAM_SPACING;
        });
      });

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
}

export const wiringDiagramGenerator = new WiringDiagramGenerator();
