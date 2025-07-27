
import React from 'react';
import { translations } from '../../translations';
import { Page, DateRangeKey, PlatformKey } from '../../types';
import WidgetWrapper from './WidgetWrapper';
import { UsersIcon, TrendUpIcon } from '../icons';

const StatCard: React.FC<{title: string, value: string, change: string, changeType: 'increase' | 'decrease', icon: React.ReactNode, subtext: string}> = ({ title, value, change, changeType, icon, subtext }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
             <h4 className="text-sm font-semibold text-slate-400">{title}</h4>
            {icon}
        </div>
        <p className="text-3xl font-bold text-slate-100 mt-2">{value}</p>
        <div className="flex items-center mt-1">
            <span className={`text-xs font-semibold ${changeType === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
            <span className="text-slate-500 text-xs ml-2">{subtext}</span>
        </div>
    </div>
);


interface WidgetProps {
    language: 'tr' | 'en';
    dateRange: DateRangeKey;
    platform: PlatformKey;
    isCustomizing: boolean;
    onRemove: () => void;
    dragHandleProps: any;
}

const StatCardsWidget: React.FC<WidgetProps> = (props) => {
    const { language, dateRange, platform, ...wrapperProps } = props;
    const t = translations[language].pageContent.dashboard;

    // Mock data simulation based on filters
    const multiplier = dateRange === '7d' ? 0.2 : dateRange === '90d' ? 2.5 : 1;
    const platformMultiplier = platform === 'all' ? 1 : 0.4;
    
    const visitors = (45231 * multiplier * platformMultiplier).toFixed(0);
    const revenue = (language === 'tr' ? 89742 : 8974) * multiplier * platformMultiplier;

    return (
        <WidgetWrapper {...wrapperProps} title={t.widget_titles.statCards} className="lg:col-span-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title={platform === 'all' ? t.totalVisitors : `${t.platform_filters[platform]} ${t.visitors}`} value={Number(visitors).toLocaleString(language)} change="+12.5%" changeType="increase" icon={<UsersIcon className="w-6 h-6 text-slate-400"/>} subtext={t.sinceLastPeriod}/>
                <StatCard title={t.conversionRate} value="3.45%" change="+0.8%" changeType="increase" icon={<TrendUpIcon className="w-6 h-6 text-slate-400"/>} subtext={t.sinceLastPeriod}/>
                <StatCard title={t.newCustomers} value={(1204 * multiplier * platformMultiplier).toFixed(0)} change="-2.1%" changeType="decrease" icon={<UsersIcon className="w-6 h-6 text-slate-400"/>} subtext={t.sinceLastPeriod}/>
                <StatCard title={t.revenue} value={language === 'tr' ? `₺${revenue.toLocaleString(undefined, {maximumFractionDigits: 0})}` : `$${revenue.toLocaleString(undefined, {maximumFractionDigits: 0})}`} change="+21.2%" changeType="increase" icon={<TrendUpIcon className="w-6 h-6 text-slate-400"/>} subtext={t.sinceLastPeriod}/>
            </div>
        </WidgetWrapper>
    );
};

export default StatCardsWidget;
