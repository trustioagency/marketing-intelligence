
import React from 'react';
import { translations } from '../../translations';
import { Page } from '../../types';
import WidgetWrapper from './WidgetWrapper';
import { TrophyIcon, SkullIcon } from '../icons';

interface WidgetProps {
    language: 'tr' | 'en';
    setActivePage: (page: Page) => void;
    isCustomizing: boolean;
    onRemove: () => void;
    dragHandleProps: any;
}

const AudienceProfitabilityWidget: React.FC<WidgetProps> = (props) => {
    const { language, setActivePage, ...wrapperProps } = props;
    const t = translations[language].pageContent.dashboard;

    return (
        <WidgetWrapper {...wrapperProps} title={t.widget_titles.audienceProfitability} className="lg:col-span-2">
            <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <TrophyIcon className="w-8 h-8 text-amber-400 flex-shrink-0" />
                    <div className="flex-grow">
                        <p className="text-sm text-amber-300 font-semibold">{t.goldenAudience}</p>
                        <p className="text-slate-100 font-medium">{t.goldenAudienceDetails}</p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-400">8.2x <span className="text-sm font-normal text-slate-400">{t.poas}</span></p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <SkullIcon className="w-8 h-8 text-rose-500 flex-shrink-0" />
                    <div className="flex-grow">
                        <p className="text-sm text-rose-400 font-semibold">{t.moneyBurnerAudience}</p>
                        <p className="text-slate-100 font-medium">{t.moneyBurnerAudienceDetails}</p>
                    </div>
                    <p className="text-2xl font-bold text-rose-500">0.6x <span className="text-sm font-normal text-slate-400">{t.poas}</span></p>
                </div>
                <button
                    onClick={() => setActivePage(Page.AudienceProfitability)}
                    className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-500 transition-colors mt-4">
                    {t.detailedAnalysis}
                </button>
            </div>
        </WidgetWrapper>
    );
};

export default AudienceProfitabilityWidget;
