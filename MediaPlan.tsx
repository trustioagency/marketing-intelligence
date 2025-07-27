
import React, { useState } from 'react';
import Card from '../components/Card';
import { translations } from '../translations';
import { MediaPlan, BrandProfile } from '../types';
import { generateMediaPlan } from '../services/geminiService';
import { PresentationChartBarIcon, LightBulbIcon, CheckBadgeIcon, FunnelIcon, GoogleIcon, MetaIcon, TikTokIcon } from '../components/icons';

interface MediaPlanProps {
    language: 'tr' | 'en';
}

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value);
};

const LoadingSpinner: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex flex-col items-center justify-center space-y-2 py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
        <p className="text-slate-400">{text}</p>
    </div>
);

const MediaPlan: React.FC<MediaPlanProps> = ({ language }) => {
    const t = translations[language].pageContent.mediaPlan;
    const [budget, setBudget] = useState('');
    const [plan, setPlan] = useState<MediaPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePlan = async () => {
        const numericBudget = parseFloat(budget);
        if (isNaN(numericBudget) || numericBudget <= 0) {
            setError(t.error_budget);
            return;
        }

        setIsLoading(true);
        setError(null);
        setPlan(null);

        try {
            // In a real app, the brand profile would be fetched from a global state/context
            const mockBrandProfile: BrandProfile = {
                businessModel: 'E-Ticaret',
                industry: 'Moda & Giyim',
                customerType: 'B2C',
                marketingGoal: 'Satışları Artırma',
            };
            const generatedPlan = await generateMediaPlan(mockBrandProfile, numericBudget);
            setPlan(generatedPlan);
        } catch (err) {
            console.error(err);
            setError(t.error_api);
        } finally {
            setIsLoading(false);
        }
    };

    const getChannelIcon = (channel: string) => {
        if (channel.toLowerCase().includes('google')) return <GoogleIcon className="w-6 h-6" />;
        if (channel.toLowerCase().includes('meta')) return <MetaIcon className="w-6 h-6" />;
        if (channel.toLowerCase().includes('tiktok')) return <TikTokIcon className="w-6 h-6 p-0.5 bg-white rounded-sm" />;
        return <PresentationChartBarIcon className="w-6 h-6 text-slate-400" />;
    };

    const funnelColors: { [key: string]: string } = {
        'Farkındalık': 'bg-sky-500',
        'Değerlendirme': 'bg-indigo-500',
        'Dönüşüm': 'bg-emerald-500',
    };
     const funnelTranslations: { [key: string]: string } = {
        'Farkındalık': t.funnel_stages.awareness,
        'Değerlendirme': t.funnel_stages.consideration,
        'Dönüşüm': t.funnel_stages.conversion,
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
                <PresentationChartBarIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{t.description}</p>
            </div>

            <Card title={t.budget_input_title}>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder={t.budget_placeholder}
                        className="flex-grow w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleGeneratePlan}
                        disabled={isLoading || !budget}
                        className="w-full sm:w-auto bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {isLoading ? t.button_loading : t.button_generate}
                    </button>
                </div>
                {error && <p className="text-rose-400 mt-4 text-center">{error}</p>}
            </Card>

            {isLoading && <LoadingSpinner text={t.loading_text} />}

            {plan && (
                <div className="space-y-6 animate-fade-in">
                    <Card title={t.rationale_title} icon={<LightBulbIcon className="w-6 h-6 text-amber-300" />}>
                        <p className="text-slate-300 leading-relaxed">{plan.strategicRationale}</p>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card title={t.funnel_title} icon={<FunnelIcon className="w-6 h-6 text-sky-400"/>} className="lg:col-span-1">
                             <div className="space-y-4">
                                {plan.funnelAllocation.map(item => (
                                    <div key={item.stage}>
                                        <div className="flex justify-between items-center mb-1 text-sm text-slate-200">
                                            <span>{funnelTranslations[item.stage] || item.stage}</span>
                                            <span className="font-bold">{item.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-3">
                                            <div
                                                className={`${funnelColors[item.stage]} h-3 rounded-full`}
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card title={t.breakdown_title} className="lg:col-span-2">
                             <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-slate-700">
                                        <tr>
                                            <th className="p-3 text-sm font-semibold text-slate-300">{t.table_headers.channel}</th>
                                            <th className="p-3 text-sm font-semibold text-slate-300 text-right">{t.table_headers.budget}</th>
                                            <th className="p-3 text-sm font-semibold text-slate-300">{t.table_headers.funnel_stage}</th>
                                            <th className="p-3 text-sm font-semibold text-slate-300">{t.table_headers.estimated_kpi}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plan.channelBreakdown.map((channel, index) => (
                                            <tr key={index} className="border-b border-slate-800 hover:bg-slate-700/50">
                                                <td className="p-3 font-medium text-slate-100 flex items-center gap-2">
                                                    {getChannelIcon(channel.channel)}
                                                    {channel.channel}
                                                </td>
                                                <td className="p-3 text-slate-300 font-mono text-right">{formatCurrency(channel.budget, language)}</td>
                                                <td className="p-3 text-slate-400 text-sm">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${funnelColors[channel.funnelStage]}/20 text-${Object.keys(funnelColors).find(key => funnelColors[key] === funnelColors[channel.funnelStage])}-300`}>
                                                        {funnelTranslations[channel.funnelStage] || channel.funnelStage}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-slate-400 text-sm">{channel.estimatedKpi}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                     <div className="flex justify-center mt-6">
                        <button className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-500 transition-colors flex items-center gap-2">
                            <CheckBadgeIcon className="w-6 h-6"/>
                            {t.button_approve}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPlan;