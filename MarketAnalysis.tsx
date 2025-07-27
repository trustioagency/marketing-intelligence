import React, { useState, useCallback } from 'react';
import { AnalysisResult, WebInsight } from '../types';
import { generateMarketAnalysis, generateWebInsights } from '../services/geminiService';
import Card from '../components/Card';
import { LightBulbIcon, LinkIcon } from '../components/icons';
import { translations } from '../translations';

interface MarketAnalysisProps {
    language: 'tr' | 'en';
}

const LoadingSpinner: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex flex-col items-center justify-center space-y-2">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
        <p className="text-slate-400">{text}</p>
    </div>
);

const AnalysisDisplay: React.FC<{ result: AnalysisResult, t: typeof translations['tr']['pageContent']['marketAnalysis'] }> = ({ result, t }) => (
    <div className="space-y-6 animate-fade-in">
        <Card title={t.executiveSummary} icon={<LightBulbIcon className="w-6 h-6" />}>
            <p className="text-slate-300 leading-relaxed">{result.summary}</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title={t.mainTrends}>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {result.trends.map((trend, index) => <li key={index}>{trend}</li>)}
                </ul>
            </Card>
            <Card title={t.opportunities}>
                 <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {result.opportunities.map((opp, index) => <li key={index}>{opp}</li>)}
                </ul>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title={t.risks}>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {result.risks.map((risk, index) => <li key={index}>{risk}</li>)}
                </ul>
            </Card>
            <Card title={t.targetAudience}>
                <p className="text-slate-300 leading-relaxed">{result.targetAudience}</p>
            </Card>
        </div>

        <Card title={t.competitorAnalysis}>
            <div className="space-y-4">
                {result.competitors.map((comp, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                        <h4 className="font-semibold text-sky-400">{comp.name}</h4>
                        <p className="text-slate-300 mt-1">{comp.analysis}</p>
                    </div>
                ))}
            </div>
        </Card>
    </div>
);

const WebInsightsDisplay: React.FC<{ insights: WebInsight[], query: string, t: typeof translations['tr']['pageContent']['marketAnalysis'] }> = ({ insights, query, t }) => (
    <div className="mt-6 animate-fade-in">
        <Card title={`"${query}" ${t.webResources}`} icon={<LinkIcon className="w-6 h-6" />}>
            <ul className="space-y-3">
                {insights.map((insight, index) => (
                    <li key={index}>
                        <a href={insight.uri} target="_blank" rel="noopener noreferrer" className="group flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                             <LinkIcon className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0"/>
                             <div className="flex-grow">
                                <p className="font-medium text-sky-400 group-hover:underline">{insight.title}</p>
                                <p className="text-xs text-slate-500 truncate">{insight.uri}</p>
                             </div>
                        </a>
                    </li>
                ))}
            </ul>
        </Card>
    </div>
);


const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ language }) => {
    const [topic, setTopic] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [webInsights, setWebInsights] = useState<WebInsight[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastQuery, setLastQuery] = useState('');
    const t = translations[language].pageContent.marketAnalysis;

    const handleAnalysis = useCallback(async () => {
        if (!topic.trim()) {
            setError(t.errorPrompt);
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);
        setWebInsights(null);
        setLastQuery(topic);

        try {
            // NOTE: Gemini service is not translated yet, so results will be in Turkish.
            const [analysis, insightsResponse] = await Promise.all([
                generateMarketAnalysis(topic),
                generateWebInsights(topic)
            ]);
            
            setAnalysisResult(analysis);
            if (insightsResponse.insights && insightsResponse.insights.length > 0) {
                setWebInsights(insightsResponse.insights);
            }
        } catch (err) {
            console.error(err);
            setError(t.errorApi);
        } finally {
            setIsLoading(false);
        }
    }, [topic, t]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
                <p className="text-slate-400 mb-4">{t.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder={t.placeholder}
                        className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleAnalysis}
                        disabled={isLoading || !topic.trim()}
                        className="bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {isLoading ? t.buttonLoading : t.button}
                    </button>
                </div>
                {error && <p className="text-rose-400 mt-4">{error}</p>}
            </div>

            <div className="mt-8">
                {isLoading && <LoadingSpinner text={t.loading}/>}
                {analysisResult && <AnalysisDisplay result={analysisResult} t={t} />}
                {webInsights && <WebInsightsDisplay insights={webInsights} query={lastQuery} t={t} />}
            </div>
        </div>
    );
};

export default MarketAnalysis;