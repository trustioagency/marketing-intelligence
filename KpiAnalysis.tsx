
import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/Card';
import { translations } from '../translations';
import { KpiAnalysisData, KpiDefinition, KpiKey } from '../types';
import { LightBulbIcon } from '../components/icons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface KpiAnalysisProps {
    language: 'tr' | 'en';
}

const kpiDefinitions: KpiDefinition[] = [
    { key: 'roas', name: 'ROAS (Reklam Harcaması Getirisi)', format: 'ratio' },
    { key: 'cpc', name: 'TBM (Tıklama Başına Maliyet)', format: 'currency' },
    { key: 'conversion_rate', name: 'Dönüşüm Oranı', format: 'percentage' },
    { key: 'ctr', name: 'TO (Tıklama Oranı)', format: 'percentage' },
    { key: 'cpa', name: 'EBM (Edinme Başına Maliyet)', format: 'currency' },
    { key: 'aov', name: 'OSD (Ortalama Sepet Değeri)', format: 'currency' },
];

const generateMockData = (kpi: KpiKey, t: any, lang: 'tr' | 'en'): KpiAnalysisData => {
    const valueMultiplier = lang === 'en' ? 0.03 : 1;
    let baseValue: number, change: number;

    switch (kpi) {
        case 'roas': baseValue = 4.8; change = 0.15; break;
        case 'cpc': baseValue = 2.5 * valueMultiplier; change = -0.08; break;
        case 'conversion_rate': baseValue = 3.2; change = 0.05; break;
        case 'ctr': baseValue = 2.5; change = 0.12; break;
        case 'cpa': baseValue = 25 * valueMultiplier; change = 0.10; break;
        case 'aov': baseValue = 150 * valueMultiplier; change = 0.20; break;
        default: baseValue = 100; change = 0.1; break;
    }

    const trend = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1}`,
        value: baseValue * (1 + (Math.random() - 0.5) * 0.2 + (change / 30) * i),
    }));

    const byChannel = [
        { channel: t.channels.google, value: baseValue * (1 + (Math.random() - 0.5) * 0.3) },
        { channel: t.channels.meta, value: baseValue * (1 + (Math.random() - 0.5) * 0.3) },
        { channel: t.channels.tiktok, value: baseValue * (1 + (Math.random() - 0.5) * 0.3) },
        { channel: t.channels.organic, value: baseValue * (1 + (Math.random() - 0.5) * 0.3) },
    ];

    return {
        value: baseValue * (1 + change),
        change: change * 100,
        trend,
        byChannel,
        insight: t.insights[kpi] || 'No insight available.',
    };
};


const KpiAnalysis: React.FC<KpiAnalysisProps> = ({ language }) => {
    const t = translations[language].pageContent.kpiAnalysis;
    const [selectedKpi, setSelectedKpi] = useState<KpiKey>('roas');
    const [analysisData, setAnalysisData] = useState<KpiAnalysisData | null>(null);

    useEffect(() => {
        setAnalysisData(generateMockData(selectedKpi, t, language));
    }, [selectedKpi, language, t]);

    const formatValue = (value: number, format: KpiDefinition['format']) => {
        switch (format) {
            case 'currency':
                return new Intl.NumberFormat(language, { style: 'currency', currency: language === 'tr' ? 'TRY' : 'USD', maximumFractionDigits: 2 }).format(value);
            case 'percentage':
                return `${value.toFixed(2)}%`;
            case 'ratio':
                return `${value.toFixed(2)}x`;
            case 'decimal':
                return value.toFixed(2);
            default:
                return value.toLocaleString(language);
        }
    };
    
    const selectedKpiDef = kpiDefinitions.find(k => k.key === selectedKpi);

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                    <p className="text-slate-400 mt-1">{t.description}</p>
                </div>
                <div className="w-full sm:w-auto">
                    <label htmlFor="kpi-select" className="sr-only">{t.select_kpi}</label>
                    <select
                        id="kpi-select"
                        value={selectedKpi}
                        onChange={(e) => setSelectedKpi(e.target.value as KpiKey)}
                        className="w-full sm:w-72 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                    >
                        {kpiDefinitions.map(kpi => (
                            <option key={kpi.key} value={kpi.key}>{t.kpis[kpi.key] || kpi.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            {analysisData && selectedKpiDef && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card title={t.overall_performance} className="md:col-span-1">
                            <p className="text-5xl font-bold text-sky-400">{formatValue(analysisData.value, selectedKpiDef.format)}</p>
                            <div className={`mt-2 text-lg font-semibold ${analysisData.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {analysisData.change >= 0 ? '↑' : '↓'} {analysisData.change.toFixed(1)}%
                            </div>
                            <p className="text-sm text-slate-500">{t.vs_last_30_days}</p>
                        </Card>
                         <Card title={t.ai_insight} icon={<LightBulbIcon className="w-6 h-6 text-amber-400"/>} className="md:col-span-2">
                             <p className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: analysisData.insight }} />
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card title={t.channel_performance}>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={analysisData.byChannel} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis type="number" stroke="#94a3b8" tickFormatter={(v) => formatValue(v, selectedKpiDef.format)} />
                                        <YAxis type="category" dataKey="channel" stroke="#94a3b8" width={80} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                                            formatter={(v: number) => [formatValue(v, selectedKpiDef.format), "Değer"]}
                                        />
                                        <Bar dataKey="value" fill="#38bdf8" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                         <Card title={t.trend_30_days}>
                             <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart data={analysisData.trend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="date" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" tickFormatter={(v) => formatValue(v, selectedKpiDef.format)} domain={['dataMin', 'dataMax']} />
                                        <Tooltip 
                                             contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                                             formatter={(v: number) => [formatValue(v, selectedKpiDef.format), t.kpis[selectedKpi]]}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                 </div>
            )}

        </div>
    );
};

export default KpiAnalysis;
