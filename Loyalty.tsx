import React from 'react';
import { PredictiveSegment, LoyaltySuggestion } from '../types';
import { StarIcon, ExclamationTriangleIcon, LightBulbIcon, ShieldCheckIcon, CursorArrowRaysIcon, TagIcon } from '../components/icons';
import { translations } from '../translations';

interface LoyaltyProps {
    language: 'tr' | 'en';
}

const getMockSegments = (t: any): PredictiveSegment[] => [
    { name: t.segments.on_the_verge, description: t.segments.on_the_verge_desc, customerCount: 250, icon: <CursorArrowRaysIcon className="w-10 h-10 text-emerald-400" /> },
    { name: t.segments.loyal, description: t.segments.loyal_desc, customerCount: 610, icon: <ShieldCheckIcon className="w-10 h-10 text-sky-400" /> },
    { name: t.segments.at_risk, description: t.segments.at_risk_desc, customerCount: 35, icon: <ExclamationTriangleIcon className="w-10 h-10 text-rose-400" /> },
    { name: t.segments.window_shoppers, description: t.segments.window_shoppers_desc, customerCount: 420, icon: <TagIcon className="w-10 h-10 text-amber-400" /> },
];

const getMockSuggestions = (t: any): LoyaltySuggestion[] => [
    {
        type: 'signal',
        title: t.suggestions.signal_title,
        description: t.suggestions.signal_desc,
        actionText: t.suggestions.signal_action
    },
    {
        type: 'risk',
        title: t.suggestions.risk_title,
        description: t.suggestions.risk_desc,
        actionText: t.suggestions.risk_action
    },
];


const SuggestionCard: React.FC<{ suggestion: LoyaltySuggestion, t: any }> = ({ suggestion, t }) => {
    const isRisk = suggestion.type === 'risk';
    const borderColor = isRisk ? 'border-rose-500/50' : 'border-emerald-500/50';
    const iconColor = isRisk ? 'text-rose-400' : 'text-emerald-400';
    const buttonColor = isRisk ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500';
    const icon = isRisk ? <ExclamationTriangleIcon className={`w-12 h-12 ${iconColor}`}/> : <LightBulbIcon className={`w-12 h-12 ${iconColor}`}/>;

    return (
        <div className={`bg-slate-800/70 p-6 rounded-xl border-l-4 ${borderColor} flex flex-col md:flex-row items-center gap-6 mb-6`}>
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-white">{suggestion.title}</h3>
                <p className="text-slate-300 mt-1">{suggestion.description}</p>
            </div>
            <button className={`flex-shrink-0 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full md:w-auto ${buttonColor}`}>
                {suggestion.actionText}
            </button>
        </div>
    );
};

const SegmentCard: React.FC<{ segment: PredictiveSegment, t: any }> = ({ segment, t }) => {
    return (
        <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col text-left transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10 h-full">
            <div className="flex items-center gap-4 mb-3">
                {segment.icon}
                <h3 className="text-xl font-semibold text-slate-100">{segment.name}</h3>
            </div>
            <p className="text-sm text-slate-400 flex-grow">{segment.description}</p>
            <div className="flex justify-between items-end mt-6">
                <div>
                    <p className="text-3xl font-bold text-white">{segment.customerCount}</p>
                    <p className="text-sm text-slate-500">{t.customers}</p>
                </div>
                <button className="bg-slate-700 text-slate-200 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors">
                    {t.create_campaign}
                </button>
            </div>
        </div>
    );
};


const Loyalty: React.FC<LoyaltyProps> = ({ language }) => {
    const t = translations[language].pageContent.loyalty;
    const mockSegments = getMockSegments(t);
    const mockSuggestions = getMockSuggestions(t);

    return (
        <div>
            <div className="text-center mb-8">
                <StarIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
                    {t.description}
                </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6 mb-10">
                {mockSuggestions.map((suggestion, index) => (
                    <SuggestionCard key={index} suggestion={suggestion} t={t}/>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {mockSegments.map(segment => (
                    <SegmentCard key={segment.name} segment={segment} t={t}/>
                ))}
            </div>
        </div>
    );
};

export default Loyalty;
