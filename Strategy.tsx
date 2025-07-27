import React from 'react';
import Card from '../components/Card';
import { DocumentChartBarIcon } from '../components/icons';
import { translations } from '../translations';

interface StrategyProps {
    language: 'tr' | 'en';
}

const getMockStrategies = (t: any) => [
  { title: t.strategy1_title, status: t.status_active, updated: t.update_1w, owner: t.owner_marketing },
  { title: t.strategy2_title, status: t.status_draft, updated: t.update_2d, owner: t.owner_product_m },
  { title: t.strategy3_title, status: t.status_active, updated: t.update_3w, owner: t.owner_content },
  { title: t.strategy4_title, status: t.status_archived, updated: t.update_2m, owner: t.owner_social },
  { title: t.strategy5_title, status: t.status_review, updated: t.update_yesterday, owner: t.owner_seo },
];

const StatusBadge: React.FC<{ status: string, t: any }> = ({ status, t }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    let statusClasses = 'bg-slate-600/30 text-slate-400';
    if(status === t.status_active) statusClasses = 'bg-emerald-500/20 text-emerald-300';
    else if(status === t.status_draft) statusClasses = 'bg-amber-500/20 text-amber-300';
    else if(status === t.status_review) statusClasses = 'bg-sky-500/20 text-sky-300';
    else if(status === t.status_archived) statusClasses = 'bg-slate-600/30 text-slate-400';
    
    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>
};

const Strategy: React.FC<StrategyProps> = ({ language }) => {
  const t = translations[language].pageContent.strategy;
  const mockStrategies = getMockStrategies(t.mock);
  return (
    <Card title={t.title} icon={<DocumentChartBarIcon className="w-6 h-6"/>}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-slate-400 text-sm">{t.description}</p>
            <button className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors w-full sm:w-auto">
                {t.create_button}
            </button>
        </div>
        <div className="space-y-4">
            {mockStrategies.map((strategy, index) => (
                <div key={index} className="p-4 bg-slate-800/70 rounded-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-sky-500 transition-colors">
                    <div className="flex-grow">
                        <h4 className="font-semibold text-slate-100">{strategy.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{t.responsible}: {strategy.owner} &middot; {t.last_update}: {strategy.updated}</p>
                    </div>
                    <div className="flex-shrink-0 mt-2 sm:mt-0">
                        <StatusBadge status={strategy.status} t={t.mock}/>
                    </div>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default Strategy;
