
import React from 'react';
import Card from '../components/Card';
import { translations } from '../translations';
import { ProfitabilityData, ChannelProfitability, ProductProfitability } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CurrencyDollarIcon, LightBulbIcon, GoogleIcon, MetaIcon, TikTokIcon } from '../components/icons';

interface ProfitabilityProps {
    language: 'tr' | 'en';
}

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    const rate = lang === 'tr' ? 1 : 0.03;
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value * rate);
};

const mockData: ProfitabilityData = {
    revenue: 450000,
    cogs: 180000,
    adSpend: 75000,
    shippingCosts: 22500,
    transactionFees: 13500,
    platformFee: 1500,
    grossProfit: 270000,
    netProfit: 157500,
};

const mockChannelData: ChannelProfitability[] = [
    { channel: 'Google Ads', profit: 85000, margin: 47.2 },
    { channel: 'Meta Ads', profit: 65000, margin: 34.1 },
    { channel: 'TikTok Ads', profit: 12500, margin: 25.0 },
    { channel: 'Organik', profit: 45000, margin: 90.0 },
];

const mockProductData: ProductProfitability[] = [
    { id: 1, name: 'Siyah Bikini', profit: 35000, revenue: 85000, margin: 41.2 },
    { id: 2, name: 'Akıllı Saat Gen 5', profit: 31500, revenue: 70000, margin: 45.0 },
    { id: 3, name: 'Plaj Çantası', profit: 21000, revenue: 35000, margin: 60.0 },
    { id: 4, name: 'Kablosuz Kulaklık Pro', profit: 18000, revenue: 40000, margin: 45.0 },
];

const PnlItem: React.FC<{ label: string, value: string, isNegative?: boolean, isBold?: boolean }> = ({ label, value, isNegative, isBold }) => (
    <div className="flex justify-between items-center py-2">
        <p className={`text-sm ${isBold ? 'font-semibold text-slate-200' : 'text-slate-400'}`}>{label}</p>
        <p className={`text-lg font-mono ${isBold ? 'font-bold text-white' : (isNegative ? 'text-rose-400' : 'text-slate-200')}`}>{isNegative ? `-${value}` : value}</p>
    </div>
);

const Profitability: React.FC<ProfitabilityProps> = ({ language }) => {
    const t = translations[language].pageContent.profitability;

    const COLORS = ['#38bdf8', '#818cf8', '#a78bfa', '#f472b6'];

    return (
        <div className="space-y-8">
            <div className="text-center">
                <CurrencyDollarIcon className="w-12 h-12 mx-auto text-emerald-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{t.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card title={t.pnlTitle} className="lg:col-span-1">
                    <PnlItem label={t.revenue} value={formatCurrency(mockData.revenue, language)} />
                    <div className="border-b border-slate-700 my-1"></div>
                    <PnlItem label={t.cogs} value={formatCurrency(mockData.cogs, language)} isNegative />
                    <PnlItem label={t.grossProfit} value={formatCurrency(mockData.grossProfit, language)} isBold />
                     <div className="border-b border-slate-700 my-1"></div>
                    <PnlItem label={t.adSpend} value={formatCurrency(mockData.adSpend, language)} isNegative />
                    <PnlItem label={t.shipping} value={formatCurrency(mockData.shippingCosts, language)} isNegative />
                    <PnlItem label={t.fees} value={formatCurrency(mockData.transactionFees, language)} isNegative />
                    <PnlItem label={t.platformFee} value={formatCurrency(mockData.platformFee, language)} isNegative />
                     <div className="my-2 py-2 border-y-2 border-slate-600 bg-emerald-500/10 rounded">
                        <PnlItem label={t.netProfit} value={formatCurrency(mockData.netProfit, language)} isBold />
                    </div>
                </Card>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-amber-500/50 flex items-start gap-6 shadow-lg">
                        <div className="flex-shrink-0 pt-1"><LightBulbIcon className="w-10 h-10 text-amber-400"/></div>
                        <div className="flex-grow">
                            <h4 className="text-xl font-bold text-amber-300">{t.insightTitle}</h4>
                            <p className="text-slate-200 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.insightDescription }}></p>
                        </div>
                    </div>
                     <Card title={t.channelProfitTitle}>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <BarChart data={mockChannelData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis type="number" stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value, language)} />
                                    <YAxis type="category" dataKey="channel" stroke="#94a3b8" width={80} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                                        formatter={(value: any, name: any) => [name === 'profit' ? formatCurrency(value, language) : `${value}%`, name === 'profit' ? t.profit : t.margin]}
                                    />
                                    <Bar dataKey="profit" name="profit" fill="#34d399" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            <Card title={t.productProfitTitle}>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-300">{t.product}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right">{t.revenue}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right">{t.profit}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right">{t.margin}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockProductData.map((product) => (
                                <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-700/50">
                                    <td className="p-4 font-medium text-slate-100">{product.name}</td>
                                    <td className="p-4 font-mono text-slate-300 text-right">{formatCurrency(product.revenue, language)}</td>
                                    <td className="p-4 font-mono text-emerald-300 font-semibold text-right">{formatCurrency(product.profit, language)}</td>
                                    <td className="p-4 font-mono text-slate-300 text-right">{product.margin.toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
};

export default Profitability;
