
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translations } from '../../translations';
import { DateRangeKey, PlatformKey } from '../../types';
import WidgetWrapper from './WidgetWrapper';

interface WidgetProps {
    language: 'tr' | 'en';
    dateRange: DateRangeKey;
    platform: PlatformKey;
    isCustomizing: boolean;
    onRemove: () => void;
    dragHandleProps: any;
}

const ConversionChartWidget: React.FC<WidgetProps> = (props) => {
    const { language, dateRange, ...wrapperProps } = props;
    const t = translations[language].pageContent.dashboard;
    
    const generateData = () => {
        const days = dateRange === '7d' ? 7 : dateRange === '90d' ? 12 : 30; // 12 weeks for 90d
        const labels = dateRange === '90d' ? Array.from({ length: days }, (_, i) => `W${i+1}`) : Array.from({ length: days }, (_, i) => `${i+1}`);
        return labels.map(label => ({
            name: label,
            [t.rate]: 2.5 + Math.random() * 3,
        }));
    };

    const conversionData = generateData();

    return (
        <WidgetWrapper {...wrapperProps} title={t.widget_titles.conversionChart} className="lg:col-span-2">
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} cursor={{ fill: '#334155' }} />
                        <Legend />
                        <Bar dataKey={t.rate} fill="#38bdf8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </WidgetWrapper>
    );
};

export default ConversionChartWidget;
