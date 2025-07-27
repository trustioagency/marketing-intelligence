import React from 'react';
import Card from '../components/Card';
import { GoogleIcon, MetaIcon, TikTokIcon, SquaresPlusIcon } from '../components/icons';
import { translations } from '../translations';

interface ConnectionsProps {
    language: 'tr' | 'en';
}

const Connections: React.FC<ConnectionsProps> = ({ language }) => {
  const t = translations[language].pageContent.connections;
  const connectionPlatforms = [
    { 
      name: 'Google Analytics', 
      description: t.ga,
      icon: <GoogleIcon className="w-12 h-12" />, 
      connected: true 
    },
    { 
      name: 'Meta (Facebook & Instagram)', 
      description: t.meta,
      icon: <MetaIcon className="w-12 h-12" />, 
      connected: false 
    },
    { 
      name: 'Google Ads',
      description: t.gAds,
      icon: <GoogleIcon className="w-12 h-12" />, 
      connected: false
    },
     { 
      name: 'TikTok Ads',
      description: t.tiktok,
      icon: <TikTokIcon className="w-12 h-12 p-1 rounded-full bg-white" />, 
      connected: false
    },
  ];

  const ConnectionCard: React.FC<{platform: typeof connectionPlatforms[0]}> = ({ platform }) => {
    return (
      <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10">
        <div className="mb-4">{platform.icon}</div>
        <h3 className="text-lg font-semibold text-slate-100">{platform.name}</h3>
        <p className="text-sm text-slate-400 mt-2 flex-grow">{platform.description}</p>
        <div className="mt-6 w-full">
          {platform.connected ? (
            <button className="w-full bg-emerald-600/20 text-emerald-300 font-bold py-2 px-4 rounded-lg border-2 border-emerald-500/30">
              {t.connected}
            </button>
          ) : (
            <button className="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors">
              {t.connect}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className="text-center mb-10">
          <SquaresPlusIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            {t.description}
          </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectionPlatforms.map((platform, index) => (
          <ConnectionCard key={index} platform={platform} />
        ))}
      </div>
    </div>
  );
};

export default Connections;