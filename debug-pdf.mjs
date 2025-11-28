import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

// Mock DOM globals required by pdfjs-dist
if (!global.DOMMatrix) {
    global.DOMMatrix = class DOMMatrix {
        constructor() {
            this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
        }
        setMatrixValue(str) { }
        multiply(other) { return this; }
        translate(x, y) { return this; }
        scale(x, y) { return this; }
    };
}
if (!global.Path2D) {
    global.Path2D = class Path2D { };
}

async function parsePdf() {
    try {
        const buffer = fs.readFileSync('test.pdf');
        const data = new Uint8Array(buffer);

        const loadingTask = pdfjsLib.getDocument({ data });
        const pdfDocument = await loadingTask.promise;

        let fullText = '';
        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(' ');
            fullText += pageText + '\n';
        }

        console.log("Extracted Text:", fullText);
    } catch (error) {
        console.error("Caught Error:", error);
    }
}

parsePdf();
