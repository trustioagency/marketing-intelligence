
import React from 'react';
import Card from '../components/Card';
import { translations } from '../translations';
import { Influencer, CollaborationInsight } from '../types';
import { ShareIcon, TrophyIcon, ExclamationTriangleIcon, PlusIcon } from '../components/icons';

interface CollaborationsProps {
    language: 'tr' | 'en';
}

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    const rate = lang === 'tr' ? 1 : 0.03;
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value * rate);
};

const mockInfluencers: Influencer[] = [
    { id: 1, name: 'Ayşe Kaya', instagramHandle: '@aysekaya', avatar: 'https://i.pravatar.cc/150?u=20', sales: 15000, commission: 1500, conversionRate: 1.8 },
    { id: 2, name: 'Deniz Can', instagramHandle: '@denizstyle', avatar: 'https://i.pravatar.cc/150?u=21', sales: 12500, commission: 1250, conversionRate: 1.5 },
    { id: 3, name: 'Ece Güneş', instagramHandle: '@egegunes', avatar: 'https://i.pravatar.cc/150?u=22', sales: 9800, commission: 980, conversionRate: 1.2 },
    { id: 4, name: 'Burak Can', instagramHandle: '@burakcan', avatar: 'https://i.pravatar.cc/150?u=23', sales: 500, commission: 50, conversionRate: 0.08 },
    { id: 5, name: 'Selin Yener', instagramHandle: '@selinyener', avatar: 'https://i.pravatar.cc/150?u=24', sales: 7200, commission: 720, conversionRate: 1.1 },
];

const mockInsights = (t: any, lang: 'tr' | 'en'): CollaborationInsight[] => [
    { 
        type: 'highlight', 
        title: t.highlightTitle, 
        influencerName: 'Ayşe Kaya',
        description: t.highlightDesc('Ayşe Kaya', formatCurrency(15000, lang), formatCurrency(1500, lang)),
        icon: <TrophyIcon className="w-10 h-10 text-amber-400" />
    },
    { 
        type: 'warning', 
        title: t.warningTitle, 
        influencerName: 'Burak Can',
        description: t.warningDesc('Burak Can'),
        icon: <ExclamationTriangleIcon className="w-10 h-10 text-rose-400" />
    }
];

const InsightCard: React.FC<{ insight: CollaborationInsight }> = ({ insight }) => {
    const borderColor = insight.type === 'highlight' ? 'border-amber-500/50' : 'border-rose-500/50';
    return (
        <div className={`bg-slate-800/70 p-6 rounded-xl border-l-4 ${borderColor} flex items-start gap-6 shadow-lg`}>
            <div className="flex-shrink-0 pt-1">{insight.icon}</div>
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-white">{insight.title}</h4>
                <p className="text-slate-200 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: insight.description }}></p>
            </div>
        </div>
    );
};

const Collaborations: React.FC<CollaborationsProps> = ({ language }) => {
    const t = translations[language].pageContent.collaborations;
    const insights = mockInsights(t, language);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <ShareIcon className="w-10 h-10 text-sky-400"/>
                    <div>
                        <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                        <p className="text-slate-400">{t.description}</p>
                    </div>
                </div>
                <button className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                    <PlusIcon className="w-5 h-5" />
                    {t.add_button}
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {insights.map(insight => <InsightCard key={insight.title} insight={insight} />)}
            </div>
            
            <Card title={t.leaderboardTitle}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-300">{t.header_influencer}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right">{t.header_sales}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right">{t.header_commission}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right">{t.header_conversion}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInfluencers.sort((a,b) => b.sales - a.sales).map((influencer) => (
                                <tr key={influencer.id} className="border-b border-slate-800 hover:bg-slate-700/50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={influencer.avatar} alt={influencer.name} className="w-12 h-12 rounded-full object-cover"/>
                                            <div>
                                                <p className="font-semibold text-slate-100">{influencer.name}</p>
                                                <p className="text-sm text-sky-400">{influencer.instagramHandle}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-100 font-mono text-right font-semibold">{formatCurrency(influencer.sales, language)}</td>
                                    <td className="p-4 text-slate-300 font-mono text-right">{formatCurrency(influencer.commission, language)}</td>
                                    <td className="p-4 font-mono text-right">
                                        <span className={influencer.conversionRate >= 1.5 ? 'text-emerald-400' : influencer.conversionRate >= 1.0 ? 'text-amber-400' : 'text-rose-400'}>
                                            {influencer.conversionRate.toFixed(2)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Collaborations;
