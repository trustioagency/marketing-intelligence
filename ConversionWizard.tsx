
import React, { useState, useMemo, useEffect } from 'react';
import { translations } from '../translations';
import { ConversionInsight, ConversionInsightPriority } from '../types';
import { WandIcon, LightBulbIcon, DocumentTextIcon, LinkIcon } from '../components/icons';

interface ConversionWizardProps {
    language: 'tr' | 'en';
}

const InsightCard: React.FC<{ insight: ConversionInsight; t: any }> = ({ insight, t }) => {
    const priorityStyles: Record<ConversionInsightPriority, { bg: string, text: string, icon: string, border: string }> = {
        'Kritik': { bg: 'bg-rose-500/10', text: 'text-rose-400', icon: '❗', border: 'border-rose-500/50' },
        'Önemli': { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: '✨', border: 'border-amber-500/50' },
        'İyileştirme': { bg: 'bg-sky-500/10', text: 'text-sky-400', icon: '💡', border: 'border-sky-500/50' },
    };

    const style = priorityStyles[insight.priority];

    return (
        <div className={`bg-slate-800/70 p-6 rounded-2xl border ${style.border} flex flex-col gap-5 shadow-lg animate-fade-in`}>
            {/* Header */}
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-slate-100">{insight.title}</h3>
                <div className={`text-2xl ${style.text}`}>{style.icon}</div>
            </div>
            
            {/* Body */}
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-slate-400 mb-1">{t.card_labels.detection}</h4>
                    <p className="text-slate-300">{insight.detection}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-400 mb-1">{t.card_labels.impact}</h4>
                    <p className="text-slate-300">{insight.impact}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-400 mb-1">{t.card_labels.action}</h4>
                    <p className="font-medium text-sky-300">{insight.action}</p>
                </div>
            </div>

            {/* Footer with help buttons */}
             {(insight.helpLinkText || insight.codeSnippet) && (
                <div className="mt-auto pt-5 border-t border-slate-700/50 flex flex-wrap gap-3">
                    {insight.helpLinkText && (
                         <a href="#" className="flex items-center gap-2 text-sm text-slate-300 font-semibold py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                            <LinkIcon className="w-4 h-4" />
                            {insight.helpLinkText}
                        </a>
                    )}
                    {insight.codeSnippet && (
                         <button onClick={() => navigator.clipboard.writeText(insight.codeSnippet || '')} className="flex items-center gap-2 text-sm text-slate-300 font-semibold py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                            <DocumentTextIcon className="w-4 h-4" />
                            {t.help_buttons.copy_code}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const ConversionWizard: React.FC<ConversionWizardProps> = ({ language }) => {
    const t = translations[language].pageContent.conversionWizard;
    const mockInsights: ConversionInsight[] = t.mock;

    const [isLoading, setIsLoading] = useState(false);
    const [lastScanTime, setLastScanTime] = useState<Date | null>(new Date());
    const [activeFilter, setActiveFilter] = useState<'all' | ConversionInsightPriority>('all');
    
    const handleScan = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setLastScanTime(new Date());
        }, 2500); // Simulate scanning time
    };

    const filteredInsights = useMemo(() => {
        if (activeFilter === 'all') return mockInsights;
        return mockInsights.filter(insight => insight.priority === activeFilter);
    }, [activeFilter, mockInsights]);

    const priorityFilters: ('all' | ConversionInsightPriority)[] = ['all', 'Kritik', 'Önemli', 'İyileştirme'];
    const priorityTranslations: Record<string, string> = {
        'all': t.filters.all,
        'Kritik': t.filters.critical,
        'Önemli': t.filters.important,
        'İyileştirme': t.filters.improvement
    };

    return (
        <div>
            <div className="text-center mb-8">
                <WandIcon className="w-16 h-16 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-lg">{t.description}</p>
            </div>
            
            <div className="sticky top-0 z-10 bg-slate-800/50 backdrop-blur-sm p-4 rounded-b-2xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex flex-wrap justify-center gap-2">
                    {priorityFilters.map(priority => (
                        <button
                            key={priority}
                            onClick={() => setActiveFilter(priority)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                                activeFilter === priority
                                    ? 'bg-sky-600 text-white shadow-md'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {priorityTranslations[priority]}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {lastScanTime && (
                        <p className="text-xs text-slate-500 hidden sm:block">
                            {t.last_scan} {lastScanTime.toLocaleTimeString(language)}
                        </p>
                    )}
                    <button
                        onClick={handleScan}
                        disabled={isLoading}
                        className="bg-slate-700 text-white font-bold py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2 disabled:bg-slate-500 disabled:cursor-wait"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                                {t.scan_button_loading}
                            </>
                        ) : t.scan_button}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredInsights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} t={t} />
                ))}
            </div>
        </div>
    );
};

export default ConversionWizard;
