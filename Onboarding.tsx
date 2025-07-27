

import React, { useState, useEffect } from 'react';
import { BrandProfile, BusinessModel, Industry, CustomerType, BrandMaturity, CompanySize, MarketingGoal, MonthlyRevenue, MonthlyAdBudget, BrandVoice } from '../types';
import { BuildingStorefrontIcon, ServerStackIcon, WrenchScrewdriverIcon, DevicePhoneMobileIcon, NewspaperIcon, ShoppingCartIcon, BriefcaseIcon, UserGroupIcon, RocketLaunchIcon, TrendUpIcon, CheckBadgeIcon, UsersIcon, BuildingOffice2Icon, MegaphoneIcon, FunnelIcon, CurrencyDollarIcon, HeartIcon, LightBulbIcon, SparklesIcon, GlobeAltIcon, EyeIcon, PencilIcon, ChatBubbleLeftRightIcon } from '../components/icons';
import { translations } from '../translations';

interface OnboardingProps {
    onComplete: () => void;
    language: 'tr' | 'en';
}

const TOTAL_STEPS = 13;

const optionCardClasses = "p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-3 hover:bg-slate-700/50 h-full";
const selectedOptionCardClasses = "border-sky-500 bg-slate-700/50 shadow-lg shadow-sky-500/10";
const unselectedOptionCardClasses = "border-slate-700 bg-slate-800/50";

const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => (
    <div className="w-full bg-slate-700 rounded-full h-2.5 mb-10">
        <div 
            className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        ></div>
    </div>
);

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, language }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profile, setProfile] = useState<BrandProfile>({});
    const [isActivating, setIsActivating] = useState(true);
    const t = translations[language].pageContent.onboarding;
    const currencySymbol = language === 'tr' ? 'TL' : '$';

    const handleSelect = <K extends keyof BrandProfile>(field: K, value: BrandProfile[K]) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleTextChange = <K extends keyof BrandProfile>(field: K, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    useEffect(() => {
        if (currentStep === TOTAL_STEPS) {
            setIsActivating(true);
            const timer = setTimeout(() => setIsActivating(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    const steps: ({
        title: string;
        field: keyof BrandProfile;
        options: { value: any; label: string; icon: JSX.Element }[];
        inputType?: undefined;
        placeholder?: undefined;
    } | {
        title: string;
        field: keyof BrandProfile;
        inputType: 'text' | 'textarea';
        placeholder: string;
        options?: undefined;
    })[] = [
        // Step 1
        { title: t.step1Title, field: 'businessModel', options: [ { value: 'E-Ticaret', label: t.businessModels.ecommerce, icon: <ShoppingCartIcon className="w-10 h-10 text-sky-400" /> }, { value: 'SaaS', label: t.businessModels.saas, icon: <ServerStackIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Hizmet Sağlayıcı', label: t.businessModels.service, icon: <WrenchScrewdriverIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Mobil Uygulama', label: t.businessModels.mobile, icon: <DevicePhoneMobileIcon className="w-10 h-10 text-sky-400" /> }, { value: 'İçerik Yayıncısı', label: t.businessModels.media, icon: <NewspaperIcon className="w-10 h-10 text-sky-400" /> }] as { value: BusinessModel; label: string; icon: JSX.Element }[] },
        // Step 2
        { title: t.step2Title, field: 'industry', options: [ { value: 'Moda & Giyim', label: t.industries.fashion, icon: <BuildingStorefrontIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Sağlık & Wellness', label: t.industries.health, icon: <HeartIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Teknoloji & Yazılım', label: t.industries.tech, icon: <ServerStackIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Finans & Sigorta', label: t.industries.finance, icon: <CurrencyDollarIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Yiyecek & İçecek', label: t.industries.food, icon: <ShoppingCartIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Eğitim', label: t.industries.education, icon: <NewspaperIcon className="w-10 h-10 text-sky-400" /> }] as { value: Industry; label: string; icon: JSX.Element }[] },
        // Step 3
        { title: t.step3Title, field: 'customerType', options: [ { value: 'B2C', label: t.customerTypes.b2c, icon: <UserGroupIcon className="w-10 h-10 text-sky-400" /> }, { value: 'B2B', label: t.customerTypes.b2b, icon: <BriefcaseIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Her ikisi de', label: t.customerTypes.both, icon: <UsersIcon className="w-10 h-10 text-sky-400" /> }] as { value: CustomerType; label: string; icon: JSX.Element }[] },
        // Step 4
        { title: t.step4Title, field: 'brandMaturity', options: [ { value: 'Fikir', label: t.maturities.idea, icon: <LightBulbIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Yeni Kurulmuş', label: t.maturities.new, icon: <RocketLaunchIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Büyüyen', label: t.maturities.growing, icon: <TrendUpIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Oturmuş', label: t.maturities.established, icon: <CheckBadgeIcon className="w-10 h-10 text-sky-400" /> }] as { value: BrandMaturity; label: string; icon: JSX.Element }[] },
        // Step 5
        { title: t.step5Title, field: 'companySize', options: [ { value: 'Tek Kişilik', label: t.companySizes.solo, icon: <UsersIcon className="w-10 h-10 text-sky-400" /> }, { value: '2-10', label: t.companySizes.s, icon: <UserGroupIcon className="w-10 h-10 text-sky-400" /> }, { value: '11-50', label: t.companySizes.m, icon: <BuildingOffice2Icon className="w-10 h-10 text-sky-400" /> }, { value: '51-200', label: t.companySizes.l, icon: <BuildingOffice2Icon className="w-10 h-10 text-sky-400" /> }, { value: '200+', label: t.companySizes.xl, icon: <BuildingOffice2Icon className="w-10 h-10 text-sky-400" /> }] as { value: CompanySize; label: string; icon: JSX.Element }[] },
        // Step 6 (New)
        { title: t.step6Title, field: 'websiteUrl', inputType: 'text', placeholder: 'https://ornek.com' },
        // Step 7 (New)
        { title: `${t.step7Title} (${currencySymbol})`, field: 'monthlyRevenue', options: [ { value: '0 - 50K', label: '0 - 50K' }, { value: '50K - 250K', label: '50K - 250K' }, { value: '250K - 1M', label: '250K - 1M' }, { value: '1M - 5M', label: '1M - 5M' }, { value: '5M+', label: '5M+' } ].map(o => ({...o, icon: <CurrencyDollarIcon className="w-8 h-8 text-sky-400"/>})) as { value: MonthlyRevenue; label: string; icon: JSX.Element }[] },
        // Step 8 (New)
        { title: `${t.step8Title} (${currencySymbol})`, field: 'monthlyAdBudget', options: [ { value: '0 - 5K', label: '0 - 5K' }, { value: '5K - 25K', label: '5K - 25K' }, { value: '25K - 100K', label: '100K - 100K' }, { value: '100K - 500K', label: '100K - 500K' }, { value: '500K+', label: '500K+' } ].map(o => ({...o, icon: <FunnelIcon className="w-8 h-8 text-sky-400"/>})) as { value: MonthlyAdBudget; label: string; icon: JSX.Element }[] },
        // Step 9 (New)
        { title: t.step9Title, field: 'mainCompetitors', inputType: 'text', placeholder: t.competitorsPlaceholder },
        // Step 10 (New)
        { title: t.step10Title, field: 'targetAudienceDescription', inputType: 'textarea', placeholder: t.audiencePlaceholder },
        // Step 11 (New)
        { title: t.step11Title, field: 'brandVoice', options: [ { value: 'Profesyonel & Kurumsal', label: t.brandVoices.professional, icon: <BriefcaseIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Samimi & Arkadaşça', label: t.brandVoices.friendly, icon: <ChatBubbleLeftRightIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Esprili & Eğlenceli', label: t.brandVoices.fun, icon: <SparklesIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Teknik & Bilgilendirici', label: t.brandVoices.technical, icon: <LightBulbIcon className="w-10 h-10 text-sky-400" /> } ] as { value: BrandVoice; label: string; icon: JSX.Element }[] },
        // Step 12
        { title: t.step12Title, field: 'marketingGoal', options: [ { value: 'Marka Bilinirliği', label: t.marketingGoals.awareness, icon: <MegaphoneIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Potensiyel Müşteri', label: t.marketingGoals.leadGen, icon: <FunnelIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Satışları Artırma', label: t.marketingGoals.sales, icon: <CurrencyDollarIcon className="w-10 h-10 text-sky-400" /> }, { value: 'Müşteri Sadakati', label: t.marketingGoals.loyalty, icon: <HeartIcon className="w-10 h-10 text-sky-400" /> }] as { value: MarketingGoal; label: string; icon: JSX.Element }[] },
    ];

    const currentStepData = currentStep <= 12 ? steps[currentStep - 1] : null;
    const isNextDisabled = currentStep <= 12 && currentStepData ? !profile[currentStepData.field] : false;
    const insights = t.collectiveIntelligence.insights[profile.industry || 'default'] || t.collectiveIntelligence.insights.default;

    return (
        <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-3xl mx-auto">
                <div className="text-center mb-4">
                    <BuildingStorefrontIcon className="w-12 h-12 text-sky-400 mx-auto" />
                    <h1 className="text-3xl font-bold text-white mt-2">{t.mainTitle}</h1>
                    <p className="text-slate-400">{t.subTitle}</p>
                </div>
                
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-10 shadow-2xl">
                    <ProgressBar currentStep={currentStep} />
                    
                    {currentStep <= 12 && currentStepData && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-semibold text-center text-white mb-8">{currentStepData.title}</h2>
                            {currentStepData.options ? (
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {currentStepData.options.map(option => (
                                        <div
                                            key={option.value}
                                            onClick={() => handleSelect(currentStepData.field as keyof BrandProfile, option.value)}
                                            className={`${optionCardClasses} ${profile[currentStepData.field as keyof BrandProfile] === option.value ? selectedOptionCardClasses : unselectedOptionCardClasses}`}
                                            role="radio"
                                            aria-checked={profile[currentStepData.field as keyof BrandProfile] === option.value}
                                            tabIndex={0}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSelect(currentStepData.field as keyof BrandProfile, option.value)}
                                        >
                                            {option.icon}
                                            <span className="font-semibold text-slate-200 text-sm sm:text-base">{option.label}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="max-w-lg mx-auto">
                                    {currentStepData.inputType === 'textarea' ? (
                                        <textarea
                                            value={(profile[currentStepData.field] as string) || ''}
                                            onChange={(e) => handleTextChange(currentStepData.field as keyof BrandProfile, e.target.value)}
                                            placeholder={currentStepData.placeholder}
                                            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow h-32"
                                            rows={4}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={(profile[currentStepData.field] as string) || ''}
                                            onChange={(e) => handleTextChange(currentStepData.field as keyof BrandProfile, e.target.value)}
                                            placeholder={currentStepData.placeholder}
                                            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow text-center text-lg"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {currentStep === 13 && (
                        isActivating ? (
                            <div className="text-center animate-fade-in py-10">
                                <div className="relative inline-block">
                                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-sky-400"></div>
                                    <SparklesIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-sky-400"/>
                                </div>
                                <h2 className="text-2xl font-semibold text-white mt-6">{t.collectiveIntelligence.activating}</h2>
                            </div>
                        ) : (
                            <div className="text-center animate-fade-in">
                                <CheckBadgeIcon className="w-20 h-20 text-emerald-400 mx-auto mb-4"/>
                                <h2 className="text-3xl font-bold text-white">{t.collectiveIntelligence.title}</h2>
                                <p className="text-slate-300 mt-2 max-w-xl mx-auto">{t.collectiveIntelligence.description}</p>
                                <div className="mt-8 text-left bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                                    <h3 className="font-semibold text-slate-200 mb-4">{t.collectiveIntelligence.insightsTitle}</h3>
                                    <ul className="space-y-3">
                                        {insights.map((insight: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <LightBulbIcon className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5"/>
                                                <span className="text-slate-300 text-sm">{insight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    )}

                    <div className="flex justify-between items-center mt-12">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="bg-slate-700 text-slate-300 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {t.back}
                        </button>
                        {currentStep < TOTAL_STEPS ? (
                            <button
                                onClick={nextStep}
                                disabled={isNextDisabled}
                                className="bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                            >
                                {t.next}
                            </button>
                        ) : (
                            <button
                                onClick={onComplete}
                                disabled={isActivating}
                                className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                <SparklesIcon className="w-5 h-5"/>
                                {t.collectiveIntelligence.finishButton}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
