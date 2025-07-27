import React, { useState } from 'react';
import Card from '../components/Card';
import { ShoppingBagIcon, ExclamationTriangleIcon, LightBulbIcon, ArchiveBoxIcon, TagIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from '../components/icons';
import { Product, StockStatus, StockSuggestion, PriceSuggestion } from '../types';
import { translations } from '../translations';

interface ProductsProps {
    language: 'tr' | 'en';
}

const mockProducts: Product[] = [
  { id: 1, name: 'Siyah Bikini', category: 'Giyim', imageUrl: 'https://picsum.photos/seed/product1/200/200', price: 850, cost: 400, visits: 2500, conversionRate: 4.5, potentialScore: 92, stock: 8, stockStatus: 'Düşük' },
  { id: 2, name: 'Kablosuz Kulaklık Pro', category: 'Elektronik', imageUrl: 'https://picsum.photos/seed/product2/200/200', price: 1200, cost: 750, visits: 800, conversionRate: 2.1, potentialScore: 68, stock: 150, stockStatus: 'Normal' },
  { id: 3, name: 'Plaj Çantası', category: 'Aksesuar', imageUrl: 'https://picsum.photos/seed/product3/200/200', price: 350, cost: 120, visits: 1500, conversionRate: 3.2, potentialScore: 75, stock: 250, stockStatus: 'Yüksek' },
  { id: 4, name: 'Yoga Matı', category: 'Spor', imageUrl: 'https://picsum.photos/seed/product4/200/200', price: 250, cost: 110, visits: 300, conversionRate: 1.5, potentialScore: 35, stock: 0, stockStatus: 'Tükendi' },
  { id: 5, name: 'Akıllı Saat Gen 5', category: 'Elektronik', imageUrl: 'https://picsum.photos/seed/product5/200/200', price: 2500, cost: 1600, visits: 1200, conversionRate: 5.1, potentialScore: 95, stock: 45, stockStatus: 'Normal' },
  { id: 6, name: 'Espresso Kahve Seti', category: 'Mutfak', imageUrl: 'https://picsum.photos/seed/product6/200/200', price: 800, cost: 480, visits: 950, conversionRate: 2.8, potentialScore: 61, stock: 25, stockStatus: 'Düşük' },
];

const mockStockSuggestions: StockSuggestion[] = [
    { type: 'uyarı', productName: 'Siyah Bikini', productId: 1, title: 'Düşük Stok Uyarısı', description: 'Stok bitmek üzere olduğu için bu ürünün reklam harcaması otomatik olarak durduruldu.' },
    { type: 'fırsat', productName: 'Plaj Çantası', productId: 3, title: 'Yüksek Stok Fırsatı', description: 'Bu ürüne özel bir indirim kampanyası oluşturarak stoğu nakite çevirin ve sermaye akışı sağlayın.' }
];

const mockPriceSuggestions: PriceSuggestion[] = [
  {
    productId: 1,
    productName: "Siyah Bikini",
    currentPrice: 850,
    suggestedPrice: 799,
    profitImpact: 12000,
    rationale: "Fiyat esnekliği modelimiz, fiyattaki bu düşüşün satış hacmini tahmini %30 artıracağını ve birim başına kâr düşüşüne rağmen toplam aylık kârı önemli ölçüde artıracağını öngörüyor.",
  },
  {
    productId: 3,
    productName: "Plaj Çantası",
    currentPrice: 350,
    suggestedPrice: 400,
    profitImpact: 8500,
    rationale: "Bu ürüne olan talep fiyata karşı düşük esneklik gösteriyor. Fiyatı %14 artırmak, satış adedini çok az etkilerken, birim başına kâr marjını ciddi oranda yükseltecektir.",
  },
];

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    const rate = lang === 'tr' ? 1 : 0.03;
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value * rate);
};


const PriceSuggestionCard: React.FC<{ suggestion: PriceSuggestion, t: any, language: 'tr' | 'en' }> = ({ suggestion, t, language }) => {
    const [isRationaleVisible, setIsRationaleVisible] = useState(false);
    
    return (
        <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col gap-4 transition-all duration-300 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10">
            <div>
                <h4 className="font-bold text-slate-100 text-lg">{suggestion.productName}</h4>
                <p className="text-sm text-slate-400">{t.price_suggestion.title}</p>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-bold text-slate-500 line-through">{formatCurrency(suggestion.currentPrice, language)}</span>
                <span className="text-4xl font-bold text-sky-400">{formatCurrency(suggestion.suggestedPrice, language)}</span>
            </div>
            <div className="flex-grow">
                 <p className={`text-lg font-bold ${suggestion.profitImpact > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {suggestion.profitImpact > 0 ? '+' : ''}{formatCurrency(suggestion.profitImpact, language)}
                 </p>
                <p className="text-sm text-slate-400">{t.price_suggestion.profit_impact}</p>
            </div>
             <div className="mt-2 border-t border-slate-700/50 pt-4">
                 <div className="flex justify-between items-center">
                    <button 
                        onClick={() => setIsRationaleVisible(!isRationaleVisible)}
                        className="flex items-center gap-2 text-sm text-sky-300 font-semibold py-1 px-2 rounded-lg hover:bg-sky-500/20 transition-colors"
                        aria-expanded={isRationaleVisible}
                    >
                        <QuestionMarkCircleIcon className="w-5 h-5"/>
                        {t.why_button}
                    </button>
                    <button className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors">
                        {t.price_suggestion.apply_button}
                    </button>
                </div>
                {isRationaleVisible && (
                     <div className="mt-4 p-3 bg-slate-900/70 border-l-4 border-sky-400 rounded-r-lg animate-fade-in">
                        <div className="flex items-start gap-3">
                            <LightBulbIcon className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5"/>
                            <p className="text-sm text-slate-300">{suggestion.rationale}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const PotentialScoreBar: React.FC<{ score: number }> = ({ score }) => {
    let barColor = 'bg-emerald-500';
    if (score < 40) barColor = 'bg-rose-500';
    else if (score < 75) barColor = 'bg-amber-500';

    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div 
                className={`${barColor} h-2.5 rounded-full`} 
                style={{ width: `${score}%` }}
                title={`Skor: ${score}/100`}
            ></div>
        </div>
    );
};

const StockStatusBadge: React.FC<{ status: StockStatus, stock: number, t: any }> = ({ status, stock, t }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block capitalize flex items-center gap-2";
    const statusMap: Record<StockStatus, string> = {
        'Yüksek': t.high,
        'Normal': t.normal,
        'Düşük': t.low,
        'Tükendi': t.out_of_stock,
    }
    const colorMap: Record<StockStatus, string> = {
        'Yüksek': 'bg-sky-500/20 text-sky-300',
        'Normal': 'bg-emerald-500/20 text-emerald-300',
        'Düşük': 'bg-amber-500/20 text-amber-300',
        'Tükendi': 'bg-rose-500/20 text-rose-300'
    };
    return (
        <span className={`${baseClasses} ${colorMap[status]}`}>
            <span className="font-bold">{stock}</span>
            <span>{statusMap[status]}</span>
        </span>
    );
};

const StockSuggestionCard: React.FC<{ suggestion: StockSuggestion, t: any }> = ({ suggestion, t }) => {
    const isWarning = suggestion.type === 'uyarı';
    const icon = isWarning ? <ExclamationTriangleIcon className="w-8 h-8 text-rose-400"/> : <LightBulbIcon className="w-8 h-8 text-sky-400"/>;
    const borderColor = isWarning ? 'border-rose-500/50' : 'border-sky-500/50';
    const buttonColor = isWarning ? 'bg-rose-600 hover:bg-rose-500' : 'bg-sky-600 hover:bg-sky-500';
    const buttonIcon = isWarning ? <ArchiveBoxIcon className="w-5 h-5 mr-2"/> : <TagIcon className="w-5 h-5 mr-2"/>;
    const buttonText = isWarning ? t.details_button : t.create_campaign_button;
    return (
        <div className={`bg-slate-800/70 p-5 rounded-xl border-l-4 ${borderColor} flex flex-col sm:flex-row items-center gap-4`}>
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-grow text-center sm:text-left">
                <h4 className="font-bold text-slate-100">{suggestion.title} - <span className="text-slate-300">{suggestion.productName}</span></h4>
                <p className="text-sm text-slate-400 mt-1">{suggestion.description}</p>
            </div>
            <button className={`mt-3 sm:mt-0 flex-shrink-0 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center ${buttonColor}`}>
                {buttonIcon}
                {buttonText}
            </button>
        </div>
    );
}

const Products: React.FC<ProductsProps> = ({ language }) => {
  const t = translations[language].pageContent.products;

  return (
    <div className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <CurrencyDollarIcon className="w-7 h-7 text-emerald-400" />
                {t.profit_engine_title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPriceSuggestions.map(s => <PriceSuggestionCard key={s.productId} suggestion={s} t={t} language={language}/>)}
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <LightBulbIcon className="w-7 h-7 text-sky-400" />
                {t.stock_intel_title}
            </h3>
            {mockStockSuggestions.map(s => <StockSuggestionCard key={s.productId} suggestion={s} t={t.stock_suggestion} />)}
        </div>

        <Card title={t.title} icon={<ShoppingBagIcon className="w-6 h-6"/>}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <p className="text-slate-400 text-sm">{t.description}</p>
                <button className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors w-full sm:w-auto">
                    {t.add_button}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-700">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-300">{t.headers.product}</th>
                            <th className="p-4 text-sm font-semibold text-slate-300 hidden lg:table-cell text-right">{t.headers.price}</th>
                            <th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell text-right">{t.headers.profit_margin}</th>
                            <th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell text-center">{t.headers.visits_conversion}</th>
                            <th className="p-4 text-sm font-semibold text-slate-300 text-center">{t.headers.stock_status}</th>
                            <th className="p-4 text-sm font-semibold text-slate-300">{t.headers.potential_score}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.map((product) => {
                             const profitMargin = product.price > 0 ? ((product.price - product.cost) / product.price) * 100 : 0;
                            return (
                                <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-slate-700"/>
                                            <div>
                                                <p className="font-medium text-slate-100">{product.name}</p>
                                                <p className="text-sm text-slate-400">{product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-300 font-mono hidden lg:table-cell text-right">{formatCurrency(product.price, language)}</td>
                                    <td className="p-4 font-mono hidden md:table-cell text-right">
                                        <span className={`font-semibold ${profitMargin > 40 ? 'text-emerald-400' : profitMargin > 20 ? 'text-amber-400' : 'text-rose-400'}`}>
                                            %{profitMargin.toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden md:table-cell text-center">
                                        <p className="text-slate-200 font-semibold">{product.visits.toLocaleString(language)}</p>
                                        <p className="text-xs text-slate-400">{t.headers.visits_label} (%{product.conversionRate})</p>
                                    </td>
                                     <td className="p-4 text-center">
                                        <StockStatusBadge status={product.stockStatus} stock={product.stock} t={t.stock_statuses} />
                                    </td>
                                    <td className="p-4 min-w-[150px]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-full">
                                            <PotentialScoreBar score={product.potentialScore} />
                                        </div>
                                            <span className="text-slate-300 font-semibold text-sm w-8 text-right">{product.potentialScore}</span>
                                    </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
};

export default Products;
