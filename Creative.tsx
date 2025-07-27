import React from 'react';
import Card from '../components/Card';
import { SparklesIcon } from '../components/icons';
import { translations } from '../translations';

interface CreativeProps {
    language: 'tr' | 'en';
}

const mockCreatives = [
  { id: 1, title: 'Yaz Koleksiyonu Lansmanı', type: 'Görsel', ctr: '3.1%', conversions: 124, url: 'https://picsum.photos/seed/creative1/400/300' },
  { id: 2, title: 'Mobil Uygulama Tanıtım Videosu', type: 'Video', ctr: '1.8%', conversions: 88, url: 'https://picsum.photos/seed/creative2/400/300' },
  { id: 3, title: 'Black Friday İndirimleri', type: 'Görsel', ctr: '5.2%', conversions: 341, url: 'https://picsum.photos/seed/creative3/400/300' },
  { id: 4, title: 'Sadakat Programı Duyurusu', type: 'Görsel', ctr: '2.5%', conversions: 97, url: 'https://picsum.photos/seed/creative4/400/300' },
  { id: 5, title: 'Webinar Daveti', type: 'Görsel', ctr: '4.1%', conversions: 210, url: 'https://picsum.photos/seed/creative5/400/300' },
  { id: 6, title: 'Yeni Özellik Tanıtımı', type: 'Video', ctr: '2.2%', conversions: 156, url: 'https://picsum.photos/seed/creative6/400/300' },
];

const CreativeCard: React.FC<typeof mockCreatives[0] & {t: any}> = ({ title, type, ctr, conversions, url, t }) => {
    return (
        <div className="bg-slate-800/70 rounded-xl border border-slate-700 overflow-hidden group transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10">
            <div className="relative">
                 <img src={url} alt={title} className="w-full h-48 object-cover"/>
                 <div className="absolute top-2 right-2 bg-slate-900/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">{type}</div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-slate-100 truncate">{title}</h3>
                <div className="flex justify-between items-center mt-4 text-sm">
                    <div className="text-center">
                        <p className="text-slate-400">{t.ctr}</p>
                        <p className="font-bold text-sky-400 text-lg">{ctr}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-400">{t.conversions}</p>
                        <p className="font-bold text-emerald-400 text-lg">{conversions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Creative: React.FC<CreativeProps> = ({ language }) => {
  const t = translations[language].pageContent.creative;
  return (
    <div>
        <div className="text-center mb-10">
          <SparklesIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCreatives.map(creative => <CreativeCard key={creative.id} {...creative} t={t} />)}
        </div>
    </div>
  );
};

export default Creative;
