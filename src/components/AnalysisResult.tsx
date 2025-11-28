import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, List, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations, Language } from '@/lib/translations';

export interface AnalysisData {
    atsScore: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: {
        gap: string;
        suggestion: string;
    }[];
    keywordMapping: {
        keyword: string;
        present: boolean;
        location?: string;
    }[];
    revisedVersion?: string;
    finalAssessment: {
        projectedScore: number;
        confidence: string;
        notes: string;
    };
}

interface AnalysisResultProps {
    data: AnalysisData | null;
    isLoading: boolean;
    language: Language;
}

export function AnalysisResult({ data, isLoading, language }: AnalysisResultProps) {
    const t = translations[language];
    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 space-y-4 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Score Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{t.score}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Based on formatting, keywords, and structure.</p>
                </div>
                <div className="relative flex items-center justify-center">
                    <div className={cn(
                        "w-32 h-32 rounded-full border-8 flex items-center justify-center text-4xl font-bold",
                        data.atsScore >= 80 ? "border-green-500 text-green-600" :
                            data.atsScore >= 60 ? "border-yellow-500 text-yellow-600" :
                                "border-red-500 text-red-600"
                    )}>
                        {data.atsScore}
                    </div>
                </div>
            </div>

            {/* Strengths & Weaknesses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-100 dark:border-green-900/20">
                    <div className="flex items-center gap-2 mb-4 text-green-700 dark:text-green-400">
                        <CheckCircle className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">{t.strengths}</h3>
                    </div>
                    <ul className="space-y-3">
                        {data.strengths.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/20">
                    <div className="flex items-center gap-2 mb-4 text-red-700 dark:text-red-400">
                        <AlertCircle className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">{t.weaknesses}</h3>
                    </div>
                    <ul className="space-y-3">
                        {data.weaknesses.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400">
                    <TrendingUp className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{t.recommendations}</h3>
                </div>
                <div className="space-y-4">
                    {data.recommendations.map((rec, i) => (
                        <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Gap: {rec.gap}</h4>
                            <p className="text-zinc-600 dark:text-zinc-300 text-sm"><span className="font-semibold">Suggestion:</span> {rec.suggestion}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Keyword Mapping */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-6 text-purple-600 dark:text-purple-400">
                    <List className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{t.keywords}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.keywordMapping.map((kw, i) => (
                        <span key={i} className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium border",
                            kw.present
                                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                                : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                        )}>
                            {kw.keyword} {kw.present && "✓"}
                        </span>
                    ))}
                </div>
            </div>

            {/* Revised Version */}
            {data.revisedVersion && (
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-6 text-amber-600 dark:text-amber-400">
                        <FileText className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">{t.revised}</h3>
                    </div>
                    <div className="prose dark:prose-invert max-w-none bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-700 dark:text-zinc-300">{data.revisedVersion}</pre>
                    </div>
                </div>
            )}

            {/* Final Assessment */}
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h3 className="text-xl font-bold">Final Assessment</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-sm opacity-80">Confidence: {data.finalAssessment.confidence}</span>
                        <div className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                            Projected Score: {data.finalAssessment.projectedScore}
                        </div>
                    </div>
                </div>
                <p className="opacity-90 leading-relaxed">{data.finalAssessment.notes}</p>
            </div>

        </div>
    );
}
