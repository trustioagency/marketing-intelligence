
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

const TrafficChartWidget: React.FC<WidgetProps> = (props) => {
    const { language, dateRange, ...wrapperProps } = props;
    const t = translations[language].pageContent.dashboard;

    const generateData = () => {
        const days = dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30;
        return Array.from({ length: days }, (_, i) => ({
            name: `${i + 1}`,
            [t.visitor]: 3000 + Math.sin(i / 3) * 1000 + Math.random() * 500,
        }));
    };
    
    const trafficData = generateData();

    return (
        <WidgetWrapper {...wrapperProps} title={t.widget_titles.trafficChart} className="lg:col-span-2">
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                        <Legend />
                        <Line type="monotone" dataKey={t.visitor} stroke="#38bdf8" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </WidgetWrapper>
    );
};

export default TrafficChartWidget;
