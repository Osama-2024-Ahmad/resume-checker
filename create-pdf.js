const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function createPdf() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Hello World! This is a test PDF.');
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('test.pdf', pdfBytes);
    console.log('test.pdf created');
}

createPdf();
