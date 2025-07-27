import React from 'react';
import Card from '../components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GoogleIcon, CurrencyDollarIcon, BoltIcon, LightBulbIcon, CheckBadgeIcon, ExclamationTriangleIcon } from '../components/icons';
import { translations } from '../translations';

interface GooglePerformanceProps {
    language: 'tr' | 'en';
}

const getKpiData = (t: any, lang: 'tr' | 'en') => [
  { title: t.kpi.roas, value: "5.2x", change: "+15%", changeType: "increase", icon: <CurrencyDollarIcon className="w-8 h-8 text-emerald-400" /> },
  { title: t.kpi.cpc, value: lang === 'tr' ? "₺2.15" : "$2.15", change: "-8%", changeType: "decrease", icon: <CurrencyDollarIcon className="w-8 h-8 text-sky-400" /> },
  { title: t.kpi.conversions, value: "1,452", change: "+21%", changeType: "increase", icon: <CheckBadgeIcon className="w-8 h-8 text-emerald-400" /> },
  { title: t.kpi.quality_score, value: "8/10", change: "+0.5", changeType: "increase", icon: <LightBulbIcon className="w-8 h-8 text-amber-400" /> },
];

const performanceData = [
  { name: '01/06', ROAS: 4.8, TBM: 2.3 },
  { name: '08/06', ROAS: 5.1, TBM: 2.2 },
  { name: '15/06', ROAS: 5.5, TBM: 2.1 },
  { name: '22/06', ROAS: 5.2, TBM: 2.15 },
  { name: '30/06', ROAS: 5.8, TBM: 2.0 },
];

const getTopCampaigns = (t: any, lang: 'tr' | 'en') => [
    { name: t.campaigns.brand, roas: '8.1x', tbm: lang === 'tr' ? '₺1.20' : '$1.20', status: t.statuses.active },
    { name: t.campaigns.remarketing, roas: '7.5x', tbm: lang === 'tr' ? '₺1.80' : '$1.80', status: t.statuses.active },
    { name: t.campaigns.competitor, roas: '3.2x', tbm: lang === 'tr' ? '₺3.50' : '$3.50', status: t.statuses.optimizing },
    { name: t.campaigns.generic, roas: '2.8x', tbm: lang === 'tr' ? '₺4.10' : '$4.10', status: t.statuses.budget_limited },
];

const getMockActions = (t: any) => [
    { title: t.actions.action1_title, description: t.actions.action1_desc, priority: t.priorities.high },
    { title: t.actions.action2_title, description: t.actions.action2_desc, priority: t.priorities.high },
    { title: t.actions.action3_title, description: t.actions.action3_desc, priority: t.priorities.medium },
];

const KpiCard: React.FC<ReturnType<typeof getKpiData>[0] & { t: any }> = ({ title, value, change, changeType, icon, t }) => (
    <Card title="" className="bg-slate-800/50">
        <div className="flex items-start justify-between">
            <div className="flex-shrink-0">{icon}</div>
             <div className="text-right">
                <p className={`text-sm font-semibold ${changeType === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>{change} <span className="text-slate-500 text-xs">{t.vs_last_month}</span></p>
            </div>
        </div>
        <div className="mt-2">
            <p className="text-3xl font-bold text-slate-100">{value}</p>
            <h3 className="text-base text-slate-400 mt-1">{title}</h3>
        </div>
    </Card>
);

const StatusBadge: React.FC<{ status: string, statuses: any }> = ({ status, statuses }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full inline-block";
    let statusClasses = 'bg-slate-600/30 text-slate-400';
    if(status === statuses.active) statusClasses = 'bg-emerald-500/20 text-emerald-300';
    if(status === statuses.optimizing) statusClasses = 'bg-sky-500/20 text-sky-300';
    if(status === statuses.budget_limited) statusClasses = 'bg-amber-500/20 text-amber-300';
    
    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
}


const GooglePerformance: React.FC<GooglePerformanceProps> = ({ language }) => {
  const t = translations[language].pageContent.googlePerformance;
  const kpiData = getKpiData(t, language);
  const topCampaigns = getTopCampaigns(t, language);
  const mockActions = getMockActions(t);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <GoogleIcon className="w-12 h-12" />
        <div>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-slate-400">{t.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} t={t} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card title={t.chart_title} className="lg:col-span-3">
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#84cc16" orientation="left" />
                <YAxis yAxisId="right" stroke="#38bdf8" orientation="right" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}/>
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="ROAS" stroke="#84cc16" name={t.kpi.roas}/>
                <Line yAxisId="right" type="monotone" dataKey="TBM" stroke="#38bdf8" name={`${t.kpi.cpc} (${language === 'tr' ? '₺' : '$'})`}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title={t.top_campaigns_title} className="lg:col-span-2">
            <div className="space-y-3">
                {topCampaigns.map(campaign => (
                    <div key={campaign.name} className="p-3 bg-slate-900/50 rounded-lg">
                        <div className="flex justify-between items-center">
                           <p className="font-semibold text-slate-100 w-2/3 truncate">{campaign.name}</p>
                           <StatusBadge status={campaign.status} statuses={t.statuses} />
                        </div>
                        <div className="flex justify-between items-baseline mt-2 text-sm">
                           <p><span className="text-slate-500">{t.kpi.roas}:</span> <span className="font-bold text-emerald-400">{campaign.roas}</span></p>
                           <p><span className="text-slate-500">{t.kpi.cpc}:</span> <span className="font-bold text-sky-400">{campaign.tbm}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
      </div>
      
      <Card title={t.actions_title} icon={<BoltIcon className="w-6 h-6 text-sky-400" />}>
        <div className="space-y-4">
            {mockActions.map((action, index) => (
                <div key={index} className="bg-slate-800/70 p-4 rounded-lg flex items-start gap-4 border-l-4 border-sky-500/60">
                    <div className="flex-shrink-0 pt-1">
                        {action.priority === t.priorities.high && <ExclamationTriangleIcon className="w-6 h-6 text-rose-400" />}
                        {action.priority === t.priorities.medium && <LightBulbIcon className="w-6 h-6 text-amber-400" />}
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-100">{action.title}</h4>
                        <p className="text-sm text-slate-400">{action.description}</p>
                    </div>
                    <button className="ml-auto flex-shrink-0 bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors self-center">
                        {t.apply_button}
                    </button>
                </div>
            ))}
        </div>
      </Card>

    </div>
  );
};

export default GooglePerformance;
