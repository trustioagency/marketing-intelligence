import React from 'react';
import Card from '../components/Card';
import { translations } from '../translations';

interface SettingsProps {
    language: 'tr' | 'en';
}

const Settings: React.FC<SettingsProps> = ({ language }) => {
  const t = translations[language].pageContent.settings;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card title={t.profileSettings}>
        <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">{t.name}</label>
                <input type="text" id="name" defaultValue={t.namePlaceholder} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">{t.email}</label>
                <input type="email" id="email" defaultValue={t.emailPlaceholder} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            </div>
             <button className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors">
                {t.saveChanges}
            </button>
        </div>
      </Card>
      
      <Card title={t.notificationSettings}>
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-slate-300">{t.weeklyReports}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-slate-300">{t.instantAlerts}</span>
                 <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer"/>
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;