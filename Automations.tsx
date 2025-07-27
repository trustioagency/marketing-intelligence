
import React, { useState } from 'react';
import { RocketLaunchIcon, DocumentTextIcon, ShareIcon, PresentationChartLineIcon, EnvelopeIcon, UserGroupIcon, UsersIcon, ArrowRightIcon, BellIcon, UserPlusIcon, ServerStackIcon } from '../components/icons';
import { translations } from '../translations';

interface AutomationsProps {
    language: 'tr' | 'en';
}

const getMockAutomations = (t: any) => [
  {
    title: t.automation1_title,
    description: t.automation1_desc,
    icons: [<DocumentTextIcon className="w-6 h-6 text-sky-400" />, <ShareIcon className="w-6 h-6 text-emerald-400" />],
    enabled: true,
  },
  {
    title: t.automation2_title,
    description: t.automation2_desc,
    icons: [<PresentationChartLineIcon className="w-6 h-6 text-sky-400" />, <EnvelopeIcon className="w-6 h-6 text-emerald-400" />],
    enabled: true,
  },
  {
    title: t.automation3_title,
    description: t.automation3_desc,
    icons: [<UserGroupIcon className="w-6 h-6 text-sky-400" />, <EnvelopeIcon className="w-6 h-6 text-emerald-400" />],
    enabled: false,
  },
  {
    title: t.automation4_title,
    description: t.automation4_desc,
    icons: [<span className="font-bold text-lg text-sky-400">₺</span>, <span className="font-bold text-lg text-rose-400">X</span>],
    enabled: true,
  },
  {
    title: t.automation5_title,
    description: t.automation5_desc,
    icons: [<UsersIcon className="w-6 h-6 text-sky-400" />, <BellIcon className="w-6 h-6 text-emerald-400" />],
    enabled: false,
  },
   {
    title: t.automation6_title,
    description: t.automation6_desc,
    icons: [<UserPlusIcon className="w-6 h-6 text-sky-400" />, <ServerStackIcon className="w-6 h-6 text-emerald-400" />],
    enabled: false,
  },
];

const AutomationCard: React.FC<ReturnType<typeof getMockAutomations>[0] & { onToggle: () => void, t: any }> = ({ title, description, icons, enabled, onToggle, t }) => {
  return (
    <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col justify-between transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10">
      <div>
        <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-slate-700/50 rounded-full">{icons[0]}</div>
            <ArrowRightIcon className="w-6 h-6 text-slate-500"/>
            <div className="p-3 bg-slate-700/50 rounded-full">{icons[1]}</div>
        </div>
        <h3 className="text-lg font-semibold text-slate-100 text-center">{title}</h3>
        <p className="text-sm text-slate-400 mt-2 text-center h-16">{description}</p>
      </div>
      <div className="mt-6 flex justify-center items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={enabled} onChange={onToggle} className="sr-only peer" />
          <div className="w-14 h-8 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-600"></div>
           <span className="ml-3 text-sm font-medium text-slate-300">{enabled ? t.active : t.inactive}</span>
        </label>
      </div>
    </div>
  );
};

const Automations: React.FC<AutomationsProps> = ({ language }) => {
    const t = translations[language].pageContent.automations;
    const [automations, setAutomations] = useState(getMockAutomations(t.mock));

    const handleToggle = (indexToToggle: number) => {
        const newAutomations = automations.map((automation, index) => {
            if (index === indexToToggle) {
                return { ...automation, enabled: !automation.enabled };
            }
            return automation;
        });
        setAutomations(newAutomations);
    };

  return (
    <div>
        <div className="text-center mb-10">
          <RocketLaunchIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automations.map((automation, index) => (
                <AutomationCard key={index} {...automation} onToggle={() => handleToggle(index)} t={t} />
            ))}
        </div>
    </div>
  );
};

export default Automations;