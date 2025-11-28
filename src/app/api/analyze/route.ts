import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { cvText, jdText, language = 'en' } = await req.json();

        if (!cvText || !jdText) {
            return NextResponse.json(
                { error: 'Missing CV or Job Description' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is not set');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are an expert AI Resume Coach and ATS (Applicant Tracking System) specialist.
        Analyze the following CV against the Job Description (JD).
        
        Language: ${language === 'de' ? 'German' : 'English'} (Output must be in this language).

        CV:
        ${cvText}

        Job Description:
        ${jdText}

        Provide the output strictly in the following JSON format (no markdown, no backticks):
        {
            "atsScore": number (0-100),
            "strengths": string[] (3-5 key strengths),
            "weaknesses": string[] (3-5 key weaknesses),
            "recommendations": [
                {
                    "gap": string (short title of the gap),
                    "suggestion": string (actionable advice)
                }
            ],
            "keywordMapping": [
                { "keyword": string, "present": boolean }
            ] (Analyze 8-10 critical keywords from the JD),
            "revisedVersion": string (Rewrite 2-3 bullet points from the CV to better match the JD, separated by newlines),
            "finalAssessment": {
                "projectedScore": number (projected score after improvements),
                "confidence": string ("High", "Medium", "Low"),
                "notes": string (Brief final summary)
            }
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response if it contains markdown code blocks
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const analysisData = JSON.parse(cleanText);
            return NextResponse.json(analysisData);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Raw Text:', text);
            return NextResponse.json(
                { error: 'Failed to parse AI response' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Analysis error:', error);
        // @ts-ignore
        if (error.response) {
            // @ts-ignore
            console.error('API Response Error:', await error.response.text());
        }
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
