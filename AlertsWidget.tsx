
import React from 'react';
import { translations } from '../../translations';
import { AnomalyAlert } from '../../types';
import WidgetWrapper from './WidgetWrapper';
import { ExclamationTriangleIcon } from '../icons';

const getMockAlerts = (t: typeof translations['tr']['pageContent']['dashboard']['alerts']): AnomalyAlert[] => [
  { id: 1, metric: t.alert1_metric, change: t.alert1_change, currentValue: t.alert1_current, normalRange: t.alert1_normal, severity: 'Yüksek', time: t.alert1_time },
  { id: 2, metric: t.alert2_metric, change: t.alert2_change, currentValue: t.alert2_current, normalRange: t.alert2_normal, severity: 'Yüksek', time: t.alert2_time },
  { id: 3, metric: t.alert3_metric, change: t.alert3_change, currentValue: t.alert3_current, normalRange: t.alert3_normal, severity: 'Orta', time: t.alert3_time },
];

interface WidgetProps {
    language: 'tr' | 'en';
    isCustomizing: boolean;
    onRemove: () => void;
    dragHandleProps: any;
}

const AlertsWidget: React.FC<WidgetProps> = (props) => {
    const { language, ...wrapperProps } = props;
    const t = translations[language].pageContent.dashboard;
    const mockAlerts = getMockAlerts(t.alerts);

    return (
        <WidgetWrapper {...wrapperProps} title={t.widget_titles.alerts} className="lg:col-span-2">
            <div className="space-y-4">
                {mockAlerts.map(alert => (
                    <div key={alert.id} className="flex gap-4 p-3 bg-slate-900/50 rounded-lg border-l-4 border-rose-500/80">
                        <div className="flex-shrink-0 pt-1">
                             <ExclamationTriangleIcon className="w-6 h-6 text-rose-400"/>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-100">{alert.metric} <span className="text-rose-400">{alert.change}</span></p>
                            <p className="text-sm text-slate-400">
                                {t.current}: <span className="font-medium text-slate-200">{alert.currentValue}</span> ({t.normal}: {alert.normalRange})
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </WidgetWrapper>
    );
};

export default AlertsWidget;
