
import React, { useState, Fragment } from 'react';
import Card from '../components/Card';
import { UsersIcon, XMarkIcon, GlobeAltIcon, ShoppingCartIcon, EnvelopeOpenIcon, LifebuoyIcon, MegaphoneIcon, ShareIcon, CreditCardIcon, TrophyIcon } from '../components/icons';
import { Customer, TimelineEvent, TimelineEventType, LtvSuggestion } from '../types';
import { translations } from '../translations';

interface CustomersProps {
    language: 'tr' | 'en';
}

const formatCurrency = (value: number, lang: 'tr' | 'en') => {
    const currency = lang === 'tr' ? 'TRY' : 'USD';
    const rate = lang === 'tr' ? 1 : 0.03;
    return new Intl.NumberFormat(lang, { style: 'currency', currency, minimumFractionDigits: 0 }).format(value * rate);
};

const mockCustomers: Customer[] = [
  { 
    id: 1, name: 'Ayşe Yılmaz', email: 'ayse.yilmaz@example.com', company: 'Innovatech', status: 'Aktif', lastContact: '2 gün önce', avatar: `https://i.pravatar.cc/150?u=1`, predictedLtv: 4500,
    timeline: [
        { id: 1, type: 'Satın Alım', source: 'Google Organik', title: 'İlk Alışverişini Yaptı', description: 'İndirimsiz "Yaz Koleksiyonu" ürününü aldı. Tutar: ₺600', date: '2 gün önce', discountUsed: false },
        { id: 2, type: 'Website', source: 'Google Organik', title: 'Ana Sayfaya Ulaştı', description: 'Google üzerinden organik arama ile siteye geldi.', date: '2 gün önce' },
    ]
  },
  { 
    id: 2, name: 'Mehmet Öztürk', email: 'mehmet.ozturk@example.com', company: 'Datawise', status: 'Potansiyel', lastContact: '5 gün önce', avatar: `https://i.pravatar.cc/150?u=2`, predictedLtv: 850,
    timeline: [
        { id: 1, type: 'E-Ticaret', source: 'Website', title: 'Sepeti Terk Etti', description: 'Sepetinde ₺250 değerinde ürün bıraktı.', date: '5 gün önce' },
        { id: 2, type: 'E-Ticaret', source: 'Website', title: 'Ürünü Sepete Ekledi', description: '"Temel Paket" ürününü sepete ekledi.', date: '5 gün önce' },
        { id: 3, type: 'Website', source: 'Instagram Organik', title: 'Ürün Sayfasını Ziyaret Etti', description: 'Instagram hikayesindeki linkten ürün sayfasına geldi.', date: '6 gün önce' },
        { id: 4, type: 'Sosyal Medya', source: 'Instagram', title: 'Instagram Gönderisi ile Etkileşime Geçti', description: 'Ürün tanıtım gönderisini beğendi ve kaydetti.', date: '1 hafta önce' },
    ]
  },
  { 
    id: 3, name: 'Fatma Kaya', email: 'fatma.kaya@example.com', company: 'CloudNet', status: 'Riskli', lastContact: '1 ay önce', avatar: `https://i.pravatar.cc/150?u=3`, predictedLtv: 1200,
    timeline: [
        { id: 1, type: 'Destek', source: 'Website Formu', title: 'Destek Talebi Açtı', description: 'Konu: "Fatura Sorunu". Talep kapatıldı.', date: '1 ay önce' },
        { id: 2, type: 'E-posta', source: 'Haftalık Bülten', title: 'Haftalık Bülteni Açmadı', description: 'Son 4 haftadır bültenleri açmıyor.', date: '2 hafta önce' },
        { id: 3, type: 'Satın Alım', source: 'Otomatik Yenileme', title: 'Aboneliğini Yeniledi', description: 'Aylık Temel plan aboneliğini yeniledi.', date: '2 ay önce', discountUsed: false },
    ]
  },
  { 
    id: 4, name: 'Ali Vural', email: 'ali.vural@example.com', company: 'QuantumLeap', status: 'Aktif', lastContact: 'dün', avatar: `https://i.pravatar.cc/150?u=4`, predictedLtv: 8800,
    timeline: [
        { id: 1, type: 'Website', source: 'Doğrudan Trafik', title: 'Yeni Özellikler Sayfasını Ziyaret Etti', description: 'Sayfada 3 dakika geçirdi.', date: 'dün' },
        { id: 2, type: 'E-posta', source: 'Ürün Güncellemesi', title: 'Yeni Özellik Duyurusunu Tıkladı', description: 'E-postadaki linke tıklayarak web sitesine geldi.', date: 'dün' },
        { id: 3, type: 'Website', source: 'Doğrudan Trafik', title: 'Giriş Yaptı', description: 'Kullanıcı paneline giriş yaptı.', date: '3 gün önce' },
    ]
  },
  { 
    id: 5, name: 'Zeynep Şahin', email: 'zeynep.sahin@example.com', company: 'Artisan Co.', status: 'Kaybedildi', lastContact: '3 ay önce', avatar: `https://i.pravatar.cc/150?u=5`, predictedLtv: 300,
    timeline: [
        { id: 1, type: 'Destek', source: 'E-posta', title: 'Abonelik İptal Talebi', description: 'Kullanıcı aboneliğini iptal etti. Sebep: "Fiyatlandırma".', date: '3 ay önce' },
        { id: 2, type: 'Website', source: 'Doğrudan Trafik', title: 'Hesap Ayarları Sayfasını Ziyaret Etti', description: 'Abonelik yönetimi bölümüne girdi.', date: '3 ay önce' },
    ]
  },
];

const mockLtvSuggestions: LtvSuggestion[] = [
    {
        customerId: 1,
        customerName: 'Ayşe Yılmaz',
        customerEmail: 'ayse.yilmaz@example.com',
        firstPurchaseSummary: 'Google\'dan geldi ve indirimsiz ₺600 harcadı.',
        predictedLtv: 4500,
        actionText: 'Özel Teşekkür Gönder'
    }
];

const LtvSuggestionCard: React.FC<{ suggestion: LtvSuggestion, t: any, language: 'tr' | 'en' }> = ({ suggestion, t, language }) => {
  return (
    <div className="bg-slate-800/70 p-6 rounded-xl border border-amber-500/30 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0">
        <TrophyIcon className="w-12 h-12 text-amber-400" />
      </div>
      <div className="flex-grow text-center md:text-left">
        <h4 className="text-lg font-bold text-white">{t.suggestion_title} {suggestion.customerName}</h4>
        <p className="text-slate-300 mt-1">{suggestion.firstPurchaseSummary}</p>
        <div className="mt-2">
            <span className="text-slate-400 text-sm">{t.predicted_ltv_label} </span>
            <span className="font-bold text-xl text-amber-300">{formatCurrency(suggestion.predictedLtv, language)}</span>
        </div>
      </div>
      <button className="flex-shrink-0 bg-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors w-full md:w-auto">
        {suggestion.actionText}
      </button>
    </div>
  );
};


const StatusBadge: React.FC<{ status: string, t: any }> = ({ status, t }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block capitalize";
    let statusClasses = 'bg-slate-600/30 text-slate-400';

    if (status === t.status_active) statusClasses = 'bg-emerald-500/20 text-emerald-300';
    else if (status === t.status_potential) statusClasses = 'bg-sky-500/20 text-sky-300';
    else if (status === t.status_at_risk) statusClasses = 'bg-amber-500/20 text-amber-300';
    else if (status === t.status_lost) statusClasses = 'bg-rose-500/20 text-rose-300';

    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>
}

const TimelineIcon: React.FC<{type: TimelineEventType}> = ({ type }) => {
    const iconProps = "w-5 h-5";
    const icons: Record<TimelineEventType, React.ReactNode> = {
        'Website': <GlobeAltIcon className={`${iconProps} text-indigo-300`} />,
        'Reklam': <MegaphoneIcon className={`${iconProps} text-purple-300`} />,
        'Sosyal Medya': <ShareIcon className={`${iconProps} text-sky-300`} />,
        'E-Ticaret': <ShoppingCartIcon className={`${iconProps} text-amber-300`} />,
        'Satın Alım': <CreditCardIcon className={`${iconProps} text-emerald-300`} />,
        'E-posta': <EnvelopeOpenIcon className={`${iconProps} text-orange-300`} />,
        'Destek': <LifebuoyIcon className={`${iconProps} text-rose-300`} />,
    };
    return (
        <div className="w-10 h-10 bg-slate-700/80 rounded-full flex items-center justify-center ring-4 ring-slate-800">
           {icons[type] || null}
        </div>
    );
}

const CustomerProfileModal: React.FC<{ customer: Customer, onClose: () => void, t: any, language: 'tr' | 'en' }> = ({ customer, onClose, t, language }) => {
    return (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
            <div 
              className="bg-slate-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-700 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-slate-700 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <img src={customer.avatar} alt={customer.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"/>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
                            <p className="text-slate-400">{customer.company}</p>
                            <p className="text-sm text-sky-400">{customer.email}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XMarkIcon className="w-8 h-8"/>
                        <span className="sr-only">{t.close_button}</span>
                    </button>
                </header>
                <main className="p-6 flex-grow overflow-y-auto">
                    <div className="bg-slate-900/50 p-4 rounded-lg mb-6 text-center">
                        <p className="text-sm text-amber-300">{t.predicted_ltv_label}</p>
                        <p className="text-3xl font-bold text-amber-200">{formatCurrency(customer.predictedLtv, language)}</p>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">{t.timeline_title}</h3>
                    <div className="relative pl-6">
                        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-slate-700" aria-hidden="true"></div>
                        {customer.timeline.map(event => (
                            <div key={event.id} className="relative mb-8 pl-8">
                                <div className="absolute left-[-21px] top-0">
                                   <TimelineIcon type={event.type} />
                                </div>
                                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                                    <p className="text-sm text-slate-400">{event.date}</p>
                                    {event.source && (
                                        <span className="text-xs bg-slate-700 text-sky-200 font-medium px-2.5 py-1 rounded-full">{event.source}</span>
                                    )}
                                </div>
                                <h4 className="font-semibold text-slate-100">{event.title}</h4>
                                <p className="text-sm text-slate-400">{event.description}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};


const Customers: React.FC<CustomersProps> = ({ language }) => {
    const t = translations[language].pageContent.customers;
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const getTranslatedStatus = (status: Customer['status']) => {
        const key = `status_${status.toLowerCase()}`;
        return t.statuses[key] || status;
    }
    
    return (
    <Fragment>
        {selectedCustomer && <CustomerProfileModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} t={t} language={language} />}
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                    <TrophyIcon className="w-7 h-7 text-amber-400" />
                    {t.champion_candidates}
                </h3>
                {mockLtvSuggestions.map(s => <LtvSuggestionCard key={s.customerId} suggestion={s} t={t} language={language}/>)}
            </div>

            <Card title={t.title} icon={<UsersIcon className="w-6 h-6"/>}>
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
                                <th className="p-4 text-sm font-semibold text-slate-300">{t.header_customer}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell">{t.header_company}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-center">{t.header_status}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 hidden sm:table-cell">{t.header_last_contact}</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 text-right hidden lg:table-cell">{t.header_ltv}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockCustomers.map((customer) => (
                                <tr 
                                    key={customer.id} 
                                    className="border-b border-slate-800 hover:bg-slate-700/50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedCustomer(customer)}
                                    tabIndex={0}
                                    onKeyPress={(e) => e.key === 'Enter' && setSelectedCustomer(customer)}
                                    role="button"
                                    aria-label={`${customer.name} ${t.view_profile_aria}`}
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover"/>
                                            <div>
                                                <p className="font-medium text-slate-100">{customer.name}</p>
                                                <p className="text-sm text-slate-400">{customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-300 hidden md:table-cell">{customer.company}</td>
                                    <td className="p-4 text-center">
                                        <StatusBadge status={getTranslatedStatus(customer.status)} t={t.statuses}/>
                                    </td>
                                    <td className="p-4 text-slate-400 text-sm hidden sm:table-cell">{customer.lastContact}</td>
                                    <td className="p-4 text-amber-300 font-mono hidden lg:table-cell text-right">
                                        {formatCurrency(customer.predictedLtv, language)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    </Fragment>
    );
};

export default Customers;