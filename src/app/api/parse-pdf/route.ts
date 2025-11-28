import { NextResponse } from 'next/server';
// @ts-ignore
const pdf = require('pdf-parse');

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const data = await pdf(buffer);

        return NextResponse.json({ text: data.text });
    } catch (error) {
        console.error('PDF parsing error details:', error);
        return NextResponse.json(
            { error: `Failed to parse PDF: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}

