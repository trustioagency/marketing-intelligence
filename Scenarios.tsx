import React, { useState, useMemo } from 'react';
import { ScenarioPrediction } from '../types';
import { MapPinIcon, CurrencyDollarIcon, UserPlusIcon, TrendUpIcon, LightBulbIcon } from '../components/icons';
import { translations } from '../translations';

interface ScenariosProps {
    language: 'tr' | 'en';
}

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value);
};

const formatNumber = (value: number, lang: 'tr' | 'en') => {
    return new Intl.NumberFormat(lang).format(value);
};

const PredictionCard: React.FC<{ icon: React.ReactNode, title: string, value: string, change: string, changeType: 'increase' | 'decrease' | 'neutral' }> = ({ icon, title, value, change, changeType }) => {
    const changeColor = {
        'increase': 'text-emerald-400',
        'decrease': 'text-rose-400',
        'neutral': 'text-slate-400'
    }[changeType];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
                <div className="text-sky-400">{icon}</div>
                <h4 className="font-semibold text-slate-300">{title}</h4>
            </div>
            <p className="text-4xl font-bold text-white">{value}</p>
            <p className={`text-sm font-semibold mt-1 ${changeColor}`}>{change}</p>
        </div>
    );
};

const Scenarios: React.FC<ScenariosProps> = ({ language }) => {
    const t = translations[language].pageContent.scenarios;
    
    const baseBudget = language === 'tr' ? 50000 : 1500;
    const basePrediction: ScenarioPrediction = {
        revenue: language === 'tr' ? 600000 : 18000,
        newCustomers: 1200,
        visitors: 45000,
    };
    
    const [budget, setBudget] = useState(baseBudget);

    const prediction = useMemo((): ScenarioPrediction => {
        const ratio = budget / baseBudget;
        // Using non-linear factors to make it more realistic
        return {
            revenue: basePrediction.revenue * Math.pow(ratio, 1.2),
            newCustomers: basePrediction.newCustomers * Math.pow(ratio, 1.1),
            visitors: basePrediction.visitors * ratio,
        };
    }, [budget, baseBudget, basePrediction]);

    const getChange = (current: number, base: number) => {
        if (base === 0) return { percentage: 'N/A', type: 'neutral' as const };
        const change = ((current - base) / base) * 100;
        const type: "increase" | "decrease" | "neutral" = change > 0.1 ? 'increase' : change < -0.1 ? 'decrease' : 'neutral';
        const sign = change > 0.1 ? '+' : '';
        return {
            percentage: `${sign}${change.toFixed(1)}%`,
            type: type,
        };
    };

    const revenueChange = getChange(prediction.revenue, basePrediction.revenue);
    const customersChange = getChange(prediction.newCustomers, basePrediction.newCustomers);
    const visitorsChange = getChange(prediction.visitors, basePrediction.visitors);
    
    const aiSummary = useMemo(() => {
        const ratio = budget / baseBudget;
        if (ratio > 1.2) {
            return t.summary_high_budget(((ratio - 1) * 100).toFixed(0));
        } else if (ratio < 0.8) {
            return t.summary_low_budget(((1 - ratio) * 100).toFixed(0));
        } else {
            return t.summary_normal_budget;
        }
    }, [budget, baseBudget, t]);

    const sliderMin = language === 'tr' ? 10000 : 300;
    const sliderMax = language === 'tr' ? 200000 : 6000;
    const sliderStep = language === 'tr' ? 1000 : 100;

    return (
        <div>
            <div className="text-center mb-10">
                <MapPinIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
                   {t.description}
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Simulator Controls */}
                <div className="bg-slate-800/70 p-8 rounded-2xl border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">{t.simulator_title}</h3>
                    <div className="mb-6">
                        <label htmlFor="budget-slider" className="block text-lg font-semibold text-slate-300 mb-2">
                           {t.budget_label}
                        </label>
                         <p className="text-5xl font-bold text-sky-400 mb-4">{formatCurrency(budget, language)}</p>
                    </div>
                    <input
                        id="budget-slider"
                        type="range"
                        min={sliderMin}
                        max={sliderMax}
                        step={sliderStep}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                     <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>{formatCurrency(sliderMin, language)}</span>
                        <span>{formatCurrency(sliderMax, language)}</span>
                    </div>
                </div>

                {/* Predictions */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">{t.predictions_title}</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <PredictionCard 
                            icon={<CurrencyDollarIcon className="w-8 h-8"/>}
                            title={t.predicted_revenue}
                            value={formatCurrency(prediction.revenue, language)}
                            change={revenueChange.percentage}
                            changeType={revenueChange.type}
                        />
                         <PredictionCard 
                            icon={<UserPlusIcon className="w-8 h-8"/>}
                            title={t.predicted_customers}
                            value={formatNumber(Math.round(prediction.newCustomers), language)}
                            change={customersChange.percentage}
                            changeType={customersChange.type}
                        />
                     </div>
                     <PredictionCard 
                        icon={<TrendUpIcon className="w-8 h-8"/>}
                        title={t.predicted_visitors}
                        value={formatNumber(Math.round(prediction.visitors), language)}
                        change={visitorsChange.percentage}
                        changeType={visitorsChange.type}
                    />
                    <div className="bg-slate-900/50 p-4 rounded-xl flex items-start gap-4 border border-slate-700/50">
                        <LightBulbIcon className="w-6 h-6 text-amber-300 flex-shrink-0 mt-1"/>
                        <div>
                            <h4 className="font-semibold text-amber-300">{t.strategic_suggestion}</h4>
                            <p className="text-sm text-slate-300">{aiSummary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scenarios;
