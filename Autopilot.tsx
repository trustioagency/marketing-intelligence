import React, { useState } from 'react';
import { AutopilotState, FunnelStage } from '../types';
import { BrainIcon, MegaphoneIcon, UserGroupIcon, CurrencyDollarIcon, InformationCircleIcon } from '../components/icons';
import { translations } from '../translations';

interface AutopilotProps {
    language: 'tr' | 'en';
}

const getMockAutopilotState = (t: any): AutopilotState => ({
    status: 'inactive',
    goal: 600000,
    budget: 50000,
    currentValue: 325000,
    funnel: [
        { stage: t.funnel.awareness, percentage: 20 },
        { stage: t.funnel.engagement, percentage: 35 },
        { stage: t.funnel.conversion, percentage: 45 },
    ],
    activityLog: [
        { id: 1, time: t.log.time1, action: t.log.action1 },
        { id: 2, time: t.log.time2, action: t.log.action2 },
        { id: 3, time: t.log.time3, action: t.log.action3 },
        { id: 4, time: t.log.time4, action: t.log.action4 },
    ],
});

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value);
};

const FunnelVisualizer: React.FC<{ allocation: AutopilotState['funnel'], t: any }> = ({ allocation, t }) => {
    const stageColors: Record<string, string> = {
        [t.funnel.awareness]: 'bg-sky-500',
        [t.funnel.engagement]: 'bg-indigo-500',
        [t.funnel.conversion]: 'bg-emerald-500',
    };

    const stageIcons: Record<string, React.ReactNode> = {
        [t.funnel.awareness]: <MegaphoneIcon className="w-5 h-5" />,
        [t.funnel.engagement]: <UserGroupIcon className="w-5 h-5" />,
        [t.funnel.conversion]: <CurrencyDollarIcon className="w-5 h-5" />,
    };

    return (
        <div>
            <h4 className="font-semibold text-slate-300 mb-3">{t.funnel_title}</h4>
            <div className="space-y-3">
                {allocation.map(item => (
                    <div key={item.stage}>
                        <div className="flex justify-between items-center mb-1 text-sm">
                            <div className="flex items-center gap-2 text-slate-200">
                                {stageIcons[item.stage]}
                                <span>{item.stage}</span>
                            </div>
                            <span className="font-bold">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                            <div
                                className={`${stageColors[item.stage]} h-3 rounded-full transition-all duration-500`}
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Autopilot: React.FC<AutopilotProps> = ({ language }) => {
    const t = translations[language].pageContent.autopilot;
    const [autopilotState, setAutopilotState] = useState(getMockAutopilotState(t));

    const toggleAutopilot = () => {
        setAutopilotState(prev => ({
            ...prev,
            status: prev.status === 'active' ? 'inactive' : 'active'
        }));
    };
    
    const valueMultiplier = language === 'tr' ? 1 : 0.03;
    const currentValue = autopilotState.currentValue * valueMultiplier;
    const goalValue = autopilotState.goal * valueMultiplier;
    const budgetValue = autopilotState.budget * valueMultiplier;
    const progressPercentage = (currentValue / goalValue) * 100;

    return (
        <div>
            <div className="text-center mb-10">
                <BrainIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
                    {t.description}
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-800/70 rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-6 border-b border-slate-700">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{t.control_panel_title}</h3>
                        <p className="text-slate-400">{t.control_panel_desc}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span className={`font-bold text-lg ${autopilotState.status === 'active' ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {autopilotState.status === 'active' ? t.active.toUpperCase() : t.inactive.toUpperCase()}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={autopilotState.status === 'active'} onChange={toggleAutopilot} className="sr-only peer" />
                          <div className="w-14 h-8 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>
                </div>

                {autopilotState.status === 'active' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in">
                        {/* Left Column: Progress and Funnel */}
                        <div className="lg:col-span-3 space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-slate-200 mb-2">{t.monthly_revenue_goal}</h4>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-3xl font-bold text-sky-400">{formatCurrency(currentValue, language)}</span>
                                    <span className="text-slate-400 font-medium">{formatCurrency(goalValue, language)}</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-4">
                                    <div 
                                        className="bg-sky-500 h-4 rounded-full transition-all duration-500" 
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <FunnelVisualizer allocation={autopilotState.funnel} t={t} />
                        </div>

                        {/* Right Column: Activity Log */}
                        <div className="lg:col-span-2">
                             <h4 className="font-semibold text-slate-300 mb-3">{t.activity_log}</h4>
                             <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {autopilotState.activityLog.map(log => (
                                    <div key={log.id} className="text-sm">
                                        <p className="text-slate-200">{log.action}</p>
                                        <p className="text-xs text-slate-500">{log.time}</p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in text-center">
                        <h3 className="text-xl font-bold text-white mb-2">{t.start_autopilot}</h3>
                        <p className="text-slate-400 mb-6">{t.start_description}</p>
                         <div className="space-y-4 max-w-md mx-auto">
                            <div>
                                <label htmlFor="goal" className="block text-sm font-medium text-slate-400 mb-1 text-left">{t.monthly_revenue_goal_label} ({language.toUpperCase()})</label>
                                <input type="number" id="goal" defaultValue={goalValue} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                            </div>
                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-slate-400 mb-1 text-left">{t.monthly_budget_label} ({language.toUpperCase()})</label>
                                <input type="number" id="budget" defaultValue={budgetValue} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                            </div>
                             <button onClick={toggleAutopilot} className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-500 transition-colors">
                                {t.activate_button}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Autopilot;
