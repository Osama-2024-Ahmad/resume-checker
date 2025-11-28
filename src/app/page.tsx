'use client';

import { useState, useRef } from 'react';
import { AnalysisResult, AnalysisData } from '@/components/AnalysisResult';
import { ArrowRight, Sparkles, FileText, Briefcase, Upload, X, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations, Language } from '@/lib/translations';

export default function Home() {
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [inputType, setInputType] = useState<'text' | 'pdf'>('text');
  const [language, setLanguage] = useState<Language>('en');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleAnalyze = async () => {
    if (!cvText.trim() || !jdText.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, jdText, language }),
      });

      if (!response.ok) throw new Error(t.errorAnalysis);

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingPdf(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t.errorParsing);
      }

      const data = await response.json();
      setCvText(data.text);
      setInputType('text'); // Switch back to text view to show extracted content
    } catch (error) {
      console.error('PDF upload error:', error);
      alert(error instanceof Error ? error.message : t.errorParsing);
    } finally {
      setIsParsingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-blue-500/30">

      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <FileCheck className="w-5 h-5" />
            </div>
            Resume Checker AI
          </div>
          <nav className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange('en');
              }}
              className={cn(
                "w-8 h-8 rounded-full overflow-hidden border-2 transition-all relative z-20",
                language === 'en' ? "border-blue-500 scale-110" : "border-transparent opacity-70 hover:opacity-100"
              )}
              title="English"
            >
              <img
                src="https://flagcdn.com/us.svg"
                alt="English"
                className="w-full h-full object-cover pointer-events-none"
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange('de');
              }}
              className={cn(
                "w-8 h-8 rounded-full overflow-hidden border-2 transition-all relative z-20",
                language === 'de' ? "border-blue-500 scale-110" : "border-transparent opacity-70 hover:opacity-100"
              )}
              title="Deutsch"
            >
              <img
                src="https://flagcdn.com/de.svg"
                alt="Deutsch"
                className="w-full h-full object-cover pointer-events-none"
              />
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {t.subtitle}
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* CV Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-300">
                <FileText className="w-4 h-4" />
                {t.uploadLabel}
              </label>
              <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                <button
                  onClick={() => setInputType('text')}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    inputType === 'text'
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  {t.pasteText}
                </button>
                <button
                  onClick={() => setInputType('pdf')}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    inputType === 'pdf'
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  {t.uploadPdf}
                </button>
              </div>
            </div>

            {inputType === 'text' ? (
              <textarea
                className="w-full h-80 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm transition-all shadow-sm"
                placeholder={t.cvPlaceholder}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            ) : (
              <div className="w-full h-80 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center p-6 transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                {isParsingPdf ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{t.parsing}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{t.dragDrop}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.supports}</p>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    >
                      {t.changeFile}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* JD Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-300">
              <Briefcase className="w-4 h-4" />
              Job Description
            </label>
            <textarea
              className="w-full h-80 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm transition-all shadow-sm"
              placeholder={t.jdPlaceholder}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !cvText || !jdText}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t.analyzing}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {t.analyzeButton} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </div>

        {/* Results Section */}
        <div id="results">
          <AnalysisResult data={result} isLoading={isLoading} language={language} />
        </div>

      </div>
    </main>
  );
}
