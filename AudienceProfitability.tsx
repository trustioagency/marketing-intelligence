import React from 'react';
import Card from '../components/Card';
import { Page, ProfitableAudience, BudgetReallocationSuggestion } from '../types';
import { TreasureChestIcon, SkullIcon, TrophyIcon, BoltIcon, ExclamationTriangleIcon, GoogleIcon, MetaIcon, TikTokIcon } from '../components/icons';
import { translations } from '../translations';

interface AudienceProfitabilityProps {
    language: 'tr' | 'en';
}

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value);
};

const mockSuggestion: BudgetReallocationSuggestion = {
    sourceAudienceName: "FB - İlgi Alanı (Moda Blogları)",
    targetAudienceName: "IG - Benzer Kitle",
    amountLost: 2500
};

const mockAudiences: ProfitableAudience[] = [
    { id: 1, name: 'IG - Benzer Kitle (Satın Alanlar %1)', platform: 'Meta', poas: 8.2, profit: 41000, spend: 5000, type: 'treasure' },
    { id: 2, name: 'Google - Marka Adı Arayanlar', platform: 'Google', poas: 7.5, profit: 56250, spend: 7500, type: 'treasure' },
    { id: 3, name: 'TikTok - Etkileşimde Bulunanlar', platform: 'TikTok', poas: 4.5, profit: 18000, spend: 4000, type: 'treasure' },
    { id: 4, name: 'Google - Yeniden Pazarlama', platform: 'Google', poas: 6.8, profit: 34000, spend: 5000, type: 'treasure' },
    { id: 5, name: 'FB - İlgi Alanı (Moda Blogları)', platform: 'Meta', poas: 0.6, profit: -2500, spend: 4167, type: 'pirate' },
    { id: 6, name: 'IG - Etkileşim Yapanlar (Son 180 Gün)', platform: 'Meta', poas: 1.1, profit: 800, spend: 8000, type: 'pirate' },
    { id: 7, name: 'Google - Genel Anahtar Kelimeler', platform: 'Google', poas: 1.3, profit: 1500, spend: 5000, type: 'pirate' },
];

const SuggestionCard: React.FC<{ suggestion: BudgetReallocationSuggestion, t: any, language: 'tr' | 'en' }> = ({ suggestion, t, language }) => {
    return (
        <div className="bg-slate-800/70 p-6 rounded-xl border-l-4 border-amber-500/50 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="w-12 h-12 text-amber-400" />
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-white">{t.suggestion_title}</h3>
                <p className="text-slate-300 mt-1" dangerouslySetInnerHTML={{__html: t.suggestion_desc(suggestion.sourceAudienceName, formatCurrency(suggestion.amountLost, language))}}>
                </p>
            </div>
            <button className="flex-shrink-0 bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors w-full md:w-auto">
                {t.suggestion_button}
            </button>
        </div>
    );
};

const AudienceCard: React.FC<{ audience: ProfitableAudience, language: 'tr' | 'en', t: any }> = ({ audience, language, t }) => {
    const poasColor = audience.poas >= 3 ? 'text-emerald-400' : audience.poas >= 1 ? 'text-amber-400' : 'text-rose-400';
    
    const platformIcons = {
        'Google': <GoogleIcon className="w-5 h-5"/>,
        'Meta': <MetaIcon className="w-5 h-5"/>,
        'TikTok': <TikTokIcon className="w-5 h-5 p-0.5 bg-white rounded-sm"/>
    };
    const valueMultiplier = language === 'tr' ? 1 : 0.03;

    return (
        <div className="bg-slate-800/70 p-5 rounded-xl border border-slate-700 transition-all duration-300 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                     {platformIcons[audience.platform]}
                    <h4 className="font-semibold text-slate-100">{audience.name}</h4>
                </div>
                {audience.type === 'treasure' ? <TrophyIcon className="w-6 h-6 text-amber-300"/> : <SkullIcon className="w-6 h-6 text-slate-500"/>}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-slate-400 text-sm">{t.poas}</p>
                    <p className={`text-3xl font-bold ${poasColor}`}>{audience.poas.toFixed(1)}x</p>
                </div>
                 <div>
                    <p className="text-slate-400 text-sm">{t.profit}</p>
                    <p className={`text-2xl font-semibold ${audience.profit > 0 ? 'text-slate-200' : 'text-rose-400'}`}>{formatCurrency(audience.profit * valueMultiplier, language)}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-sm">{t.spend}</p>
                    <p className="text-2xl font-semibold text-slate-200">{formatCurrency(audience.spend * valueMultiplier, language)}</p>
                </div>
            </div>
        </div>
    );
};


const AudienceProfitability: React.FC<AudienceProfitabilityProps> = ({ language }) => {
    const t = translations[language].pageContent.audienceProfitability;
    const treasures = mockAudiences.filter(a => a.type === 'treasure').sort((a,b) => b.poas - a.poas);
    const pirates = mockAudiences.filter(a => a.type === 'pirate').sort((a,b) => a.poas - b.poas);

    return (
        <div>
            <div className="text-center mb-10">
                <TreasureChestIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
                    {t.description}
                </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-10">
                <SuggestionCard suggestion={mockSuggestion} t={t} language={language} />
            </div>

            <div className="space-y-10">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                        <TrophyIcon className="w-8 h-8 text-amber-400"/>
                        {t.treasures_title}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {treasures.map(audience => <AudienceCard key={audience.id} audience={audience} language={language} t={t} />)}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                        <SkullIcon className="w-8 h-8 text-rose-500"/>
                        {t.pirates_title}
                    </h3>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pirates.map(audience => <AudienceCard key={audience.id} audience={audience} language={language} t={t} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudienceProfitability;
