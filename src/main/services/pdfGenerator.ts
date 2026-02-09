import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';

interface WiringDiagramOptions {
  pageNumber: number;
  systemName: string;
  date: string;
  outputPath?: string;
}

export class PDFGenerator {
  private readonly INCH = 72;

  // LANDSCAPE: 17 × 11 inches
  private readonly PAGE_WIDTH = 17 * this.INCH;
  private readonly PAGE_HEIGHT = 11 * this.INCH;

  // Margins
  private readonly LABEL = 20;
  private readonly SAFE = 6;

  // Vertical line X positions
  private readonly LINE_X = [
    1.25 * this.INCH, // 1.25
    8.75 * this.INCH,
    16.375 * this.INCH,
  ];

  // Padding inside main box
  private readonly BOX_PADDING_TOP = 0.375 * this.INCH;
  private readonly BOX_PADDING_BOTTOM = 0.375 * this.INCH;

  private pointsToInches(pt: number): string {
    return (pt / this.INCH).toFixed(3);
  }

  private drawingY(y: number): string {
    return ((this.PAGE_HEIGHT - y) / this.INCH).toFixed(3);
  }

  async generatePDF(options: WiringDiagramOptions): Promise<string> {
    const { pageNumber, systemName, date, outputPath } = options;

    const finalPath =
      outputPath ??
      path.join(app.getPath('documents'), `wiring-diagram-pg${pageNumber}.pdf`);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: [this.PAGE_WIDTH, this.PAGE_HEIGHT],
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
      });

      const stream = fs.createWriteStream(finalPath);
      doc.pipe(stream);

      this.drawMainBox(doc);
      this.drawVerticalLines(doc);
      this.drawLeftVerticalText(doc, systemName, date, pageNumber);
      this.drawCornerLabels(doc);

      doc.end();

      stream.on('finish', () => resolve(finalPath));
      stream.on('error', reject);
    });
  }

  // ─────────────────────────────
  private drawMainBox(doc: PDFKit.PDFDocument): void {
    const x = this.LABEL + this.SAFE;
    const y = this.LABEL + this.SAFE;
    const w = this.PAGE_WIDTH - 2 * (this.LABEL + this.SAFE);
    const h = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);

    doc.save();
    doc.lineWidth(1).strokeColor('black');
    doc.rect(x, y, w, h).stroke();
    doc.restore();
  }

  // ─────────────────────────────
  // Left vertical text (SysName | Date | Page)
  private drawLeftVerticalText(
    doc: PDFKit.PDFDocument,
    systemName: string,
    date: string,
    pageNumber: number
  ): void {
    const boxX = this.LABEL + this.SAFE;
    const boxY = this.LABEL + this.SAFE;
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);

    const text = `${systemName} | ${date} | pg${pageNumber}`;

  const centerY = boxY + boxH / 2;
  const xInside = boxX + 18;

  doc.save();
  doc.font('Helvetica-Bold').fontSize(14);

    const textWidth = doc.widthOfString(text);
    
    // ✨ X position: centered between box left edge and first vertical line
    const firstLineX = this.LINE_X[0]; // 0.75 inch = 54 points
    const textX = (boxX + firstLineX) / 2; // ~40 points from left
    
    // ✨ Y position: center of box height
    const boxCenterY = boxY + boxH / 2;
    
  // 1. Move to the position first
doc.translate(textX, boxCenterY);

// 2. Then rotate the coordinate system
doc.rotate(-90);

// 3. Draw text at the new origin with centering offset
doc.text(text, -textWidth / 2, -6, {
  width: textWidth,
  align: 'center',
});

    doc.restore();
  }

  // ─────────────────────────────
  // Vertical lines + labels inside the box
  private drawVerticalLines(doc: PDFKit.PDFDocument): void {
    const boxX = this.LABEL + this.SAFE;
    const boxY = this.LABEL + this.SAFE;
    const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
    const boxW = this.PAGE_WIDTH - 2 * (this.LABEL + this.SAFE);

    const topY = boxY + boxH - this.BOX_PADDING_TOP; // top inside box
    const bottomY = boxY + this.BOX_PADDING_BOTTOM;   // bottom inside box
    
    const boxRightEdge = boxX + boxW; // Right edge of box

    this.LINE_X.forEach((x) => {
      // Draw line
      doc.save();
      doc.lineWidth(0.6).strokeColor('black');
      doc.moveTo(x, topY);
      doc.lineTo(x, bottomY);
      doc.stroke();
      doc.restore();

      // Labels in "X.XXX, Y.YYY" format
      const xInches = (x / this.INCH).toFixed(2);
      const yTopInches = ((this.PAGE_HEIGHT - topY) / this.INCH).toFixed(3);
      const yBottomInches = ((this.PAGE_HEIGHT - bottomY) / this.INCH).toFixed(3);

      doc.save();
      doc.font('Helvetica').fontSize(8).fillColor('black');

      // Top label - format: x", y"
      const topLabelY = topY + (this.BOX_PADDING_TOP / 2) - 4;
      const topLabel = `${xInches}",${yTopInches}"`;
      const topLabelWidth = doc.widthOfString(topLabel);
      
      // Prevent overflow on right edge
      let topLabelX = x - topLabelWidth / 2;
      if (topLabelX + topLabelWidth > boxRightEdge) {
        topLabelX = boxRightEdge - topLabelWidth - 2;
      }
      
      doc.text(topLabel, topLabelX, topLabelY, {
        width: topLabelWidth + 10,
        align: 'center',
      });

      // Bottom label - format: x", y"
      const bottomLabelY = boxY + (this.BOX_PADDING_BOTTOM / 2) - 4;
      const bottomLabel = `${xInches}",${yBottomInches}"`;
      const bottomLabelWidth = doc.widthOfString(bottomLabel);
      
      // Prevent overflow on right edge - only 1pt margin for rightmost line
      let bottomLabelX = x - bottomLabelWidth / 2;
      if (bottomLabelX + bottomLabelWidth > boxRightEdge) {
        bottomLabelX = boxRightEdge - bottomLabelWidth - 6;  // ⭐ 1pt margin
      }
      
      doc.text(bottomLabel, bottomLabelX, bottomLabelY, {
        width: bottomLabelWidth + 10,
        align: 'center',
      });
      
      doc.restore();
    });
  }

  // ─────────────────────────────
  private drawCornerLabels(doc: PDFKit.PDFDocument): void {
     const boxX = this.LABEL + this.SAFE;
  const boxY = this.LABEL + this.SAFE;
  const boxW = this.PAGE_WIDTH - 2 * (this.LABEL + this.SAFE);
  const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE);
    doc.save();
    doc.font('Courier').fontSize(7).fillColor('black');

      // ─── TOP LEFT (0", 11")
  doc.text(`0", 11"`, boxX - 6, boxY - 12);

  // ─── TOP RIGHT (17", 11")
  doc.text(`17", 11"`, boxX + boxW - 36, boxY - 12);

  // ─── BOTTOM LEFT (0", 0")
  doc.text(`0", 0"`, boxX - 6, boxY + boxH + 2);

  // ─── BOTTOM RIGHT (17", 0")
  doc.text(`17", 0"`, boxX + boxW - 36, boxY + boxH + 2);
    // // Bottom-left
    // doc.text(`0, 0`, this.LABEL, this.PAGE_HEIGHT - this.LABEL + 4);

    // // Bottom-right
    // doc.text(`17, 0`, this.PAGE_WIDTH - this.LABEL - 40, this.PAGE_HEIGHT - this.LABEL + 4);

    // // Top-left
    // doc.text(`0, 11`, this.LABEL, this.LABEL - 14);

    // // Top-right
    // doc.text(`17, 11`, this.PAGE_WIDTH - this.LABEL - 40, this.LABEL - 14);

    doc.restore();
  }
}

export const pdfGenerator = new PDFGenerator();
