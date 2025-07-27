import React from 'react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetaIcon, CurrencyDollarIcon, BoltIcon, LightBulbIcon, UsersIcon, UserGroupIcon, ExclamationTriangleIcon } from '../components/icons';
import { translations } from '../translations';

interface MetaPerformanceProps {
    language: 'tr' | 'en';
}

const getKpiData = (t: any, lang: 'tr' | 'en') => [
  { title: t.kpi.roas, value: "4.5x", change: "+12%", changeType: "increase", icon: <CurrencyDollarIcon className="w-8 h-8 text-emerald-400" /> },
  { title: t.kpi.engagement_rate, value: "3.8%", change: "+0.5%", changeType: "increase", icon: <UsersIcon className="w-8 h-8 text-sky-400" /> },
  { title: t.kpi.cpl, value: lang === 'tr' ? "₺25.50" : "$25.50", change: "-10%", changeType: "decrease", icon: <UserGroupIcon className="w-8 h-8 text-emerald-400" /> },
  { title: t.kpi.weekly_spend, value: lang === 'tr' ? "₺12,500" : "$12,500", change: "+5%", changeType: "increase", icon: <CurrencyDollarIcon className="w-8 h-8 text-amber-400" /> },
];

const getPerformanceData = (t: any) => [
  { name: t.days.mon, [t.chart.engagement]: 250, [t.chart.conversions]: 15 },
  { name: t.days.tue, [t.chart.engagement]: 310, [t.chart.conversions]: 22 },
  { name: t.days.wed, [t.chart.engagement]: 280, [t.chart.conversions]: 18 },
  { name: t.days.thu, [t.chart.engagement]: 420, [t.chart.conversions]: 35 },
  { name: t.days.fri, [t.chart.engagement]: 390, [t.chart.conversions]: 31 },
  { name: t.days.sat, [t.chart.engagement]: 550, [t.chart.conversions]: 45 },
  { name: t.days.sun, [t.chart.engagement]: 510, [t.chart.conversions]: 41 },
];

const getTopCreatives = (t: any, lang: 'tr' | 'en') => [
    { name: t.creatives.creative1_name, type: t.creatives.video, roas: '6.2x', spend: lang === 'tr' ? '₺2,500' : '$2,500' },
    { name: t.creatives.creative2_name, type: t.creatives.image, roas: '5.8x', spend: lang === 'tr' ? '₺1,800' : '$1,800' },
    { name: t.creatives.creative3_name, type: t.creatives.carousel, roas: '4.9x', spend: lang === 'tr' ? '₺3,200' : '$3,200' },
];

const getMockActions = (t: any) => [
    { title: t.actions.action1_title, description: t.actions.action1_desc, priority: t.priorities.high },
    { title: t.actions.action2_title, description: t.actions.action2_desc, priority: t.priorities.medium },
    { title: t.actions.action3_title, description: t.actions.action3_desc, priority: t.priorities.medium },
];

const KpiCard: React.FC<ReturnType<typeof getKpiData>[0] & { t: any }> = ({ title, value, change, changeType, icon, t }) => (
    <Card title="" className="bg-slate-800/50">
        <div className="flex items-start justify-between">
            <div className="flex-shrink-0">{icon}</div>
             <div className="text-right">
                <p className={`text-sm font-semibold ${changeType === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>{change} <span className="text-slate-500 text-xs">{t.vs_last_week}</span></p>
            </div>
        </div>
        <div className="mt-2">
            <p className="text-3xl font-bold text-slate-100">{value}</p>
            <h3 className="text-base text-slate-400 mt-1">{title}</h3>
        </div>
    </Card>
);

const MetaPerformance: React.FC<MetaPerformanceProps> = ({ language }) => {
  const t = translations[language].pageContent.metaPerformance;
  const kpiData = getKpiData(t, language);
  const performanceData = getPerformanceData(t);
  const topCreatives = getTopCreatives(t, language);
  const mockActions = getMockActions(t);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <MetaIcon className="w-12 h-12" />
        <div>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-slate-400">{t.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} t={t}/>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card title={t.weekly_performance_title} className="lg:col-span-3">
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} cursor={{fill: '#334155'}}/>
                <Legend />
                <Bar dataKey={t.chart.engagement} fill="#818cf8" name={t.chart.engagement} />
                <Bar dataKey={t.chart.conversions} fill="#34d399" name={t.chart.conversions} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title={t.top_creatives_title} className="lg:col-span-2">
            <div className="space-y-3">
                {topCreatives.map(creative => (
                    <div key={creative.name} className="p-3 bg-slate-900/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                           <p className="font-semibold text-slate-100 w-2/3 truncate">{creative.name}</p>
                           <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-700 text-slate-300">{creative.type}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-sm">
                           <p><span className="text-slate-500">{t.kpi.roas}:</span> <span className="font-bold text-emerald-400">{creative.roas}</span></p>
                           <p><span className="text-slate-500">{t.kpi.spend}:</span> <span className="font-bold text-sky-400">{creative.spend}</span></p>
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

export default MetaPerformance;
