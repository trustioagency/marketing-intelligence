
import React from 'react';
import Card from '../components/Card';
import { translations } from '../translations';
import { HeatmapData } from '../types';
import { CursorArrowRaysIcon, DeviceDesktopIcon, DevicePhoneMobileIcon } from '../components/icons';

interface TouchpointAnalysisProps {
    language: 'tr' | 'en';
}

const getMockHeatmaps = (t: any): HeatmapData[] => [
    { id: 1, pageName: t.heatmap1_page, pageUrl: '/', device: 'Desktop', heatmapUrl: 'https://picsum.photos/seed/heatmap1/800/600', clicks: 1250, scrollDepth: 75, rageClicks: 15 },
    { id: 2, pageName: t.heatmap2_page, pageUrl: '/', device: 'Mobile', heatmapUrl: 'https://picsum.photos/seed/heatmap2/400/800', clicks: 3500, scrollDepth: 60, rageClicks: 5 },
    { id: 3, pageName: t.heatmap3_page, pageUrl: '/products/siyah-bikini', device: 'Mobile', heatmapUrl: 'https://picsum.photos/seed/heatmap3/400/800', clicks: 2800, scrollDepth: 85, rageClicks: 2 },
    { id: 4, pageName: t.heatmap4_page, pageUrl: '/pricing', device: 'Desktop', heatmapUrl: 'https://picsum.photos/seed/heatmap4/800/600', clicks: 800, scrollDepth: 45, rageClicks: 110 },
    { id: 5, pageName: t.heatmap5_page, pageUrl: '/pricing', device: 'Mobile', heatmapUrl: 'https://picsum.photos/seed/heatmap5/400/800', clicks: 1800, scrollDepth: 50, rageClicks: 80 },
    { id: 6, pageName: t.heatmap6_page, pageUrl: '/blog/e-ticarette-basari', device: 'Desktop', heatmapUrl: 'https://picsum.photos/seed/heatmap6/800/600', clicks: 950, scrollDepth: 95, rageClicks: 0 },
];

const HeatmapCard: React.FC<{ heatmap: HeatmapData, t: any }> = ({ heatmap, t }) => {
    const isDesktop = heatmap.device === 'Desktop';
    return (
        <Card title={heatmap.pageName} icon={isDesktop ? <DeviceDesktopIcon className="w-6 h-6" /> : <DevicePhoneMobileIcon className="w-6 h-6" />}>
            <p className="text-sm text-slate-400 mb-4 truncate">{heatmap.pageUrl}</p>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                    <p className="text-slate-400 text-sm">{t.clicks}</p>
                    <p className="text-2xl font-bold text-sky-400">{heatmap.clicks.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-sm">{t.scroll_depth}</p>
                    <p className="text-2xl font-bold text-emerald-400">{heatmap.scrollDepth}%</p>
                </div>
                <div>
                    <p className="text-slate-400 text-sm">{t.rage_clicks}</p>
                    <p className={`text-2xl font-bold ${heatmap.rageClicks > 50 ? 'text-rose-500' : 'text-slate-200'}`}>{heatmap.rageClicks}</p>
                </div>
            </div>
            <button className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-500 transition-colors">
                {t.view_heatmap}
            </button>
        </Card>
    );
};

const TouchpointAnalysis: React.FC<TouchpointAnalysisProps> = ({ language }) => {
    const t = translations[language].pageContent.touchpointAnalysis;
    const mockHeatmaps = getMockHeatmaps(t.mock);
    return (
        <div>
            <div className="text-center mb-10">
                <CursorArrowRaysIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{t.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockHeatmaps.map(heatmap => <HeatmapCard key={heatmap.id} heatmap={heatmap} t={t} />)}
            </div>
        </div>
    );
};

export default TouchpointAnalysis;
