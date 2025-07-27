import React from 'react';
import Card from '../components/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TikTokIcon, CurrencyDollarIcon, BoltIcon, LightBulbIcon, EyeIcon, CursorArrowRaysIcon, ExclamationTriangleIcon } from '../components/icons';
import { translations } from '../translations';

interface TikTokPerformanceProps {
    language: 'tr' | 'en';
}

const getKpiData = (t: any, lang: 'tr' | 'en') => [
  { title: t.kpi.total_views, value: "2.3M", change: "+45%", changeType: "increase", icon: <EyeIcon className="w-8 h-8 text-sky-400" /> },
  { title: t.kpi.cpv, value: lang === 'tr' ? "₺0.05" : "$0.005", change: "-15%", changeType: "decrease", icon: <CurrencyDollarIcon className="w-8 h-8 text-emerald-400" /> },
  { title: t.kpi.engagement_rate, value: "8.2%", change: "+1.2%", changeType: "increase", icon: <CursorArrowRaysIcon className="w-8 h-8 text-sky-400" /> },
  { title: t.kpi.conversions, value: "312", change: "+35%", changeType: "increase", icon: <CurrencyDollarIcon className="w-8 h-8 text-emerald-400" /> },
];

const getPerformanceData = (t: any) => [
  { name: t.days.mon, [t.views]: 250000 },
  { name: t.days.tue, [t.views]: 310000 },
  { name: t.days.wed, [t.views]: 280000 },
  { name: t.days.thu, [t.views]: 420000 },
  { name: t.days.fri, [t.views]: 550000 },
  { name: t.days.sat, [t.views]: 610000 },
  { name: t.days.sun, [t.views]: 580000 },
];

const getTopVideos = (t: any) => [
    { name: t.videos.video1_name, views: '1.2M', engagement: '12.5%' },
    { name: t.videos.video2_name, views: '650K', engagement: '8.1%' },
    { name: t.videos.video3_name, views: '320K', engagement: '6.5%' },
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
                <p className={`text-sm font-semibold ${changeType === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>{change} <span className="text-slate-500 text-xs">{t.vs_last_week}</span></p>
            </div>
        </div>
        <div className="mt-2">
            <p className="text-3xl font-bold text-slate-100">{value}</p>
            <h3 className="text-base text-slate-400 mt-1">{title}</h3>
        </div>
    </Card>
);

const TikTokPerformance: React.FC<TikTokPerformanceProps> = ({ language }) => {
  const t = translations[language].pageContent.tiktokPerformance;
  const kpiData = getKpiData(t, language);
  const performanceData = getPerformanceData(t);
  const topVideos = getTopVideos(t);
  const mockActions = getMockActions(t);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <TikTokIcon className="w-12 h-12 p-1 rounded-lg bg-white" />
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
              <AreaChart data={performanceData}>
                <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Number(value)/1000}K`} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    formatter={(value: number) => [value.toLocaleString(), t.views]}
                />
                <Area type="monotone" dataKey={t.views} stroke="#22d3ee" strokeWidth={2} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title={t.top_videos_title} className="lg:col-span-2">
            <div className="space-y-3">
                {topVideos.map(video => (
                    <div key={video.name} className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="font-semibold text-slate-100 truncate">{video.name}</p>
                        <div className="flex justify-between items-baseline mt-2 text-sm">
                           <p><span className="text-slate-500">{t.views_short}:</span> <span className="font-bold text-sky-400">{video.views}</span></p>
                           <p><span className="text-slate-500">{t.eng_short}:</span> <span className="font-bold text-emerald-400">{video.engagement}</span></p>
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

export default TikTokPerformance;
