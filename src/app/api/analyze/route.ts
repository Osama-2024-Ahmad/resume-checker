import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { cvText, jdText, language = 'en' } = await req.json();

        if (!cvText || !jdText) {
            return NextResponse.json(
                { error: 'Missing CV or Job Description' },
                { status: 400 }
            );
        }

        // TODO: Integrate actual LLM here.
        // For now, return a mock response after a delay to simulate processing.

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockResponses = {
            en: {
                atsScore: 72,
                strengths: [
                    "Strong experience with React and Next.js ecosystem.",
                    "Clear project descriptions with some metrics.",
                    "Education section is well-formatted."
                ],
                weaknesses: [
                    "Missing specific keywords from JD: 'GraphQL', 'AWS', 'CI/CD'.",
                    "Summary is too generic and doesn't mention the target role.",
                    "Some bullet points lack quantifiable impact (e.g., 'Improved performance' without %)."
                ],
                recommendations: [
                    {
                        gap: "Missing Cloud Experience",
                        suggestion: "Add a bullet point about deploying apps to AWS or Vercel if you have that experience."
                    },
                    {
                        gap: "Generic Summary",
                        suggestion: "Rewrite summary to include 'Senior Frontend Developer' and mention passion for 'scalable web apps'."
                    },
                    {
                        gap: "Keyword Density",
                        suggestion: "Include 'TypeScript' and 'Tailwind CSS' more frequently in the skills section."
                    }
                ],
                keywordMapping: [
                    { keyword: "React", present: true },
                    { keyword: "Next.js", present: true },
                    { keyword: "TypeScript", present: true },
                    { keyword: "GraphQL", present: false },
                    { keyword: "AWS", present: false },
                    { keyword: "Tailwind CSS", present: true },
                    { keyword: "CI/CD", present: false },
                    { keyword: "Agile", present: true }
                ],
                revisedVersion: "• Engineered a high-performance e-commerce platform using Next.js and GraphQL, reducing page load time by 40%.\n• Orchestrated CI/CD pipelines via GitHub Actions to automate testing and deployment to AWS, cutting release time by 50%.\n• Mentored 3 junior developers in React best practices and TypeScript type safety.",
                finalAssessment: {
                    projectedScore: 88,
                    confidence: "High",
                    notes: "With the suggested changes, particularly adding the missing cloud keywords and quantifying achievements, this CV will be a strong match for the role."
                }
            },
            de: {
                atsScore: 72,
                strengths: [
                    "Starke Erfahrung mit dem React- und Next.js-Ökosystem.",
                    "Klare Projektbeschreibungen mit einigen Kennzahlen.",
                    "Der Ausbildungsbereich ist gut formatiert."
                ],
                weaknesses: [
                    "Fehlende spezifische Schlüsselwörter aus der Stellenbeschreibung: 'GraphQL', 'AWS', 'CI/CD'.",
                    "Die Zusammenfassung ist zu allgemein und erwähnt nicht die Zielposition.",
                    "Einigen Aufzählungspunkten fehlt der quantifizierbare Einfluss (z. B. 'Verbesserte Leistung' ohne %)."
                ],
                recommendations: [
                    {
                        gap: "Fehlende Cloud-Erfahrung",
                        suggestion: "Fügen Sie einen Punkt über das Bereitstellen von Apps auf AWS oder Vercel hinzu, falls Sie diese Erfahrung haben."
                    },
                    {
                        gap: "Allgemeine Zusammenfassung",
                        suggestion: "Schreiben Sie die Zusammenfassung um, um 'Senior Frontend Developer' aufzunehmen und erwähnen Sie die Leidenschaft für 'skalierbare Web-Apps'."
                    },
                    {
                        gap: "Schlüsselwortdichte",
                        suggestion: "Fügen Sie 'TypeScript' und 'Tailwind CSS' häufiger im Kompetenzbereich ein."
                    }
                ],
                keywordMapping: [
                    { keyword: "React", present: true },
                    { keyword: "Next.js", present: true },
                    { keyword: "TypeScript", present: true },
                    { keyword: "GraphQL", present: false },
                    { keyword: "AWS", present: false },
                    { keyword: "Tailwind CSS", present: true },
                    { keyword: "CI/CD", present: false },
                    { keyword: "Agile", present: true }
                ],
                revisedVersion: "• Entwicklung einer leistungsstarken E-Commerce-Plattform mit Next.js und GraphQL, wodurch die Ladezeit der Seite um 40 % reduziert wurde.\n• Orchestrierung von CI/CD-Pipelines über GitHub Actions zur Automatisierung von Tests und Bereitstellung auf AWS, wodurch die Release-Zeit um 50 % verkürzt wurde.\n• Mentoring von 3 Junior-Entwicklern in React-Best-Practices und TypeScript-Typsicherheit.",
                finalAssessment: {
                    projectedScore: 88,
                    confidence: "Hoch",
                    notes: "Mit den vorgeschlagenen Änderungen, insbesondere dem Hinzufügen der fehlenden Cloud-Schlüsselwörter und der Quantifizierung von Erfolgen, wird dieser Lebenslauf sehr gut zur Rolle passen."
                }
            }
        };

        // @ts-ignore
        const mockResponse = mockResponses[language] || mockResponses.en;

        return NextResponse.json(mockResponse);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
