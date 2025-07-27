import React from 'react';
import { PromotionOpportunity } from '../types';
import { CalendarDaysIcon, TagIcon, ShoppingBagIcon, SparklesIcon } from '../components/icons';
import { translations } from '../translations';

interface OpportunitiesProps {
    language: 'tr' | 'en';
}

const getMockOpportunities = (t: any): PromotionOpportunity[] => [
    {
        title: t.opp1_title,
        description: t.opp1_desc,
        productName: t.opp1_product,
        timing: t.opp1_timing,
        reason: t.opp1_reason,
        icon: <ShoppingBagIcon className="w-8 h-8 text-sky-400"/>
    },
    {
        title: t.opp2_title,
        description: t.opp2_desc,
        productName: t.opp2_product,
        timing: t.opp2_timing,
        reason: t.opp2_reason,
        icon: <TagIcon className="w-8 h-8 text-emerald-400"/>
    },
    {
        title: t.opp3_title,
        description: t.opp3_desc,
        productName: t.opp3_product,
        timing: t.opp3_timing,
        reason: t.opp3_reason,
        icon: <SparklesIcon className="w-8 h-8 text-amber-400"/>
    },
];

const OpportunityCard: React.FC<{ opportunity: PromotionOpportunity, t: any }> = ({ opportunity, t }) => {
    return (
        <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10">
            <div className="flex-shrink-0 mt-1">{opportunity.icon}</div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                <p className="text-slate-300 mt-2">{opportunity.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                         <span className="font-semibold text-slate-400">{t.product}:</span>
                         <span className="text-slate-200">{opportunity.productName}</span>
                    </div>
                     <div className="flex items-center gap-2">
                         <span className="font-semibold text-slate-400">{t.timing}:</span>
                         <span className="text-sky-300">{opportunity.timing}</span>
                    </div>
                     <div className="flex items-center gap-2">
                         <span className="font-semibold text-slate-400">{t.reason}:</span>
                         <span className="text-slate-300">{opportunity.reason}</span>
                    </div>
                </div>
            </div>
             <button className="w-full sm:w-auto flex-shrink-0 bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors self-center sm:self-end">
                {t.create_campaign_button}
            </button>
        </div>
    );
};


const Opportunities: React.FC<OpportunitiesProps> = ({ language }) => {
    const t = translations[language].pageContent.opportunities;
    const mockOpportunities = getMockOpportunities(t);
    return (
        <div>
            <div className="text-center mb-10">
                <CalendarDaysIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
                   {t.description}
                </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
                {mockOpportunities.map((opportunity, index) => (
                    <OpportunityCard key={index} opportunity={opportunity} t={t} />
                ))}
            </div>
        </div>
    );
};

export default Opportunities;
