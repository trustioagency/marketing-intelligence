import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import { AttributionData, AttributionInsight } from '../types';
import { ScaleIcon, LightBulbIcon, InformationCircleIcon, DocumentTextIcon } from '../components/icons';
import { translations } from '../translations';

interface ImpactAnalysisProps {
    language: 'tr' | 'en';
}

const getMockAttributionData = (t: any, language: 'tr' | 'en'): AttributionData[] => {
  const multiplier = language === 'tr' ? 1 : 0.03;
  return [
    { channel: t.channels.google_ads, trueContribution: 180000 * multiplier, lastClickValue: 250000 * multiplier },
    { channel: t.channels.meta_ads, trueContribution: 165000 * multiplier, lastClickValue: 150000 * multiplier },
    { channel: t.channels.blog_content, trueContribution: 95000 * multiplier, lastClickValue: 5000 * multiplier },
    { channel: t.channels.organic_search, trueContribution: 80000 * multiplier, lastClickValue: 120000 * multiplier },
    { channel: t.channels.email_marketing, trueContribution: 55000 * multiplier, lastClickValue: 50000 * multiplier },
  ];
};

const getMockInsight = (t: any): AttributionInsight => ({
  title: t.strategicInsightTitle,
  description: t.strategicInsightDescription,
  icon: <LightBulbIcon className="w-10 h-10 text-amber-400" />,
});


const TooltipDisplay: React.FC<{ text: string, children: React.ReactNode }> = ({ text, children }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 text-slate-200 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-slate-700">
            {text}
        </div>
    </div>
);

const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({ language }) => {
    const t = translations[language].pageContent.impactAnalysis;
    const attributionData = getMockAttributionData(t, language);
    const insight = getMockInsight(t);

    const formatCurrency = (value: number) => {
        const currency = language === 'tr' ? 'TRY' : 'USD';
        return new Intl.NumberFormat(language, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="space-y-10">
            <div className="text-center">
                <ScaleIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <div className="flex items-center gap-2 justify-center mt-4">
                    <h3 className="text-xl font-semibold text-slate-300">{t.attributionTitle}</h3>
                    <TooltipDisplay text={t.markovTooltip}>
                        <InformationCircleIcon className="w-5 h-5 text-slate-500 cursor-help"/>
                    </TooltipDisplay>
                    <TooltipDisplay text={t.shapleyTooltip}>
                        <InformationCircleIcon className="w-5 h-5 text-slate-500 cursor-help"/>
                    </TooltipDisplay>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-800/70 p-6 rounded-2xl border-l-4 border-amber-500/50 flex items-start gap-6 shadow-2xl animate-fade-in">
                <div className="flex-shrink-0 pt-1">{insight.icon}</div>
                <div className="flex-grow">
                    <h4 className="text-xl font-bold text-amber-300">{insight.title}</h4>
                    <p className="text-slate-200 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: insight.description }}></p>
                </div>
            </div>

            <Card title={t.chartTitle} className="max-w-6xl mx-auto">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={attributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="channel" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} 
                                formatter={(value: number) => formatCurrency(value)}
                                cursor={{fill: 'rgba(51, 65, 85, 0.5)'}}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                            <Bar dataKey="lastClickValue" fill="#818cf8" name={t.lastClick} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="trueContribution" fill="#34d399" name={t.trueContribution} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default ImpactAnalysis;