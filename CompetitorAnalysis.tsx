import React, { useState } from 'react';
import { Competitor } from '../types';
import { EyeIcon, GlobeAltIcon, ChartPieIcon, KeyIcon, UsersIcon, XMarkIcon } from '../components/icons';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { translations } from '../translations';

interface CompetitorAnalysisProps {
    language: 'tr' | 'en';
}

const mockCompetitorsData: Competitor[] = [
  {
    id: 1,
    name: 'ModaTrend',
    url: 'modatrend.com',
    logo: `https://logo.clearbit.com/modatrend.com`,
    metrics: {
      monthlyTraffic: '1.2M',
      socialEngagement: '25.4K',
      keywords: '5,600'
    },
    trafficHistory: [
      { month: 'Jan', traffic: 4000 }, { month: 'Feb', traffic: 3000 },
      { month: 'Mar', traffic: 5000 }, { month: 'Apr', traffic: 4500 },
      { month: 'May', traffic: 6000 }, { month: 'Jun', traffic: 5800 },
    ],
  },
  {
    id: 2,
    name: 'StilGiyim',
    url: 'stilgiyim.com.tr',
    logo: `https://logo.clearbit.com/stilgiyim.com.tr`,
    metrics: {
      monthlyTraffic: '850K',
      socialEngagement: '18.1K',
      keywords: '3,200'
    },
    trafficHistory: [
      { month: 'Jan', traffic: 3200 }, { month: 'Feb', traffic: 3500 },
      { month: 'Mar', traffic: 3100 }, { month: 'Apr', traffic: 4200 },
      { month: 'May', traffic: 4500 }, { month: 'Jun', traffic: 4700 },
    ],
  },
  {
    id: 3,
    name: 'HizliModa',
    url: 'hizlimoda.net',
    logo: `https://logo.clearbit.com/hizlimoda.net`,
    metrics: {
      monthlyTraffic: '1.5M',
      socialEngagement: '32.8K',
      keywords: '7,100'
    },
    trafficHistory: [
      { month: 'Jan', traffic: 5000 }, { month: 'Feb', traffic: 5200 },
      { month: 'Mar', traffic: 6100 }, { month: 'Apr', traffic: 5800 },
      { month: 'May', traffic: 6500 }, { month: 'Haz', traffic: 7200 },
    ],
  },
];

const MetricItem: React.FC<{ icon: React.ReactNode, value: string, label: string }> = ({ icon, value, label }) => (
    <div className="flex items-center gap-3">
        <div className="flex-shrink-0 text-slate-400">{icon}</div>
        <div>
            <p className="text-xl font-bold text-slate-100">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
        </div>
    </div>
);


const CompetitorCard: React.FC<{ competitor: Competitor, onRemove: (id: number) => void, t: any }> = ({ competitor, onRemove, t }) => {
  return (
    <div className="bg-slate-800/70 rounded-xl border border-slate-700 overflow-hidden group transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col">
      <div className="p-5 border-b border-slate-700/50">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <img src={competitor.logo} alt={`${competitor.name} logo`} className="w-12 h-12 rounded-lg bg-white p-1 object-contain" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80'; }}/>
                <div>
                    <h3 className="font-bold text-lg text-slate-100">{competitor.name}</h3>
                    <p className="text-sm text-sky-400">{competitor.url}</p>
                </div>
            </div>
             <button onClick={() => onRemove(competitor.id)} className="text-slate-500 hover:text-rose-400 transition-colors">
                <XMarkIcon className="w-5 h-5" />
                <span className="sr-only">{t.remove}</span>
            </button>
        </div>
      </div>
      <div className="p-5 grid grid-cols-3 gap-4">
          <MetricItem icon={<ChartPieIcon className="w-6 h-6"/>} value={competitor.metrics.monthlyTraffic} label={t.monthly_traffic} />
          <MetricItem icon={<UsersIcon className="w-6 h-6"/>} value={competitor.metrics.socialEngagement} label={t.social_engagement} />
          <MetricItem icon={<KeyIcon className="w-6 h-6"/>} value={competitor.metrics.keywords} label={t.keywords} />
      </div>
      <div className="h-40 mt-auto p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={competitor.trafficHistory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#cbd5e1' }}
                itemStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                formatter={(value: number) => [value.toLocaleString(), t.traffic]}
            />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${Number(value)/1000}k`}/>
            <Area type="monotone" dataKey="traffic" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ language }) => {
    const t = translations[language].pageContent.competitorAnalysis;
    const [competitors, setCompetitors] = useState(mockCompetitorsData);
    const [newCompetitorUrl, setNewCompetitorUrl] = useState('');

    const handleAddCompetitor = () => {
        if (!newCompetitorUrl.trim()) return;
        
        const name = newCompetitorUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0].split('.')[0];
        const newCompetitor: Competitor = {
            id: Date.now(),
            name: name.charAt(0).toUpperCase() + name.slice(1),
            url: newCompetitorUrl.replace(/^(?:https?:\/\/)?/i, ""),
            logo: `https://logo.clearbit.com/${newCompetitorUrl.replace(/^(?:https?:\/\/)?/i, "")}`,
            metrics: { monthlyTraffic: 'N/A', socialEngagement: 'N/A', keywords: 'N/A' },
            trafficHistory: [
                { month: 'Jan', traffic: 0 }, { month: 'Feb', traffic: 0 },
                { month: 'Mar', traffic: 0 }, { month: 'Apr', traffic: 0 },
                { month: 'May', traffic: 0 }, { month: 'Jun', traffic: 0 },
            ]
        };
        setCompetitors([newCompetitor, ...competitors]);
        setNewCompetitorUrl('');
    };

    const handleRemoveCompetitor = (id: number) => {
        setCompetitors(competitors.filter(c => c.id !== id));
    };

    return (
        <div>
            <div className="text-center mb-6">
              <EyeIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
              <h2 className="text-3xl font-bold text-white">{t.title}</h2>
              <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                {t.description}
              </p>
            </div>
            
            <div className="max-w-xl mx-auto mb-10 bg-slate-800/70 p-4 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={newCompetitorUrl}
                        onChange={(e) => setNewCompetitorUrl(e.target.value)}
                        placeholder={t.placeholder}
                        className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                    />
                    <button
                        onClick={handleAddCompetitor}
                        className="bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                        disabled={!newCompetitorUrl.trim()}
                    >
                        {t.add_button}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {competitors.map(c => (
                    <CompetitorCard key={c.id} competitor={c} onRemove={handleRemoveCompetitor} t={t} />
                ))}
            </div>
        </div>
    );
};

export default CompetitorAnalysis;
