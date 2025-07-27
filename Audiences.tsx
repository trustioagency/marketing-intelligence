import React from 'react';
import Card from '../components/Card';
import { UserGroupIcon } from '../components/icons';
import { translations } from '../translations';

interface AudiencesProps {
    language: 'tr' | 'en';
}

const getMockAudiences = (t: any) => [
  { name: t.audience1_name, description: t.audience1_desc, size: '1.2M', status: t.status_active },
  { name: t.audience2_name, description: t.audience2_desc, size: '850K', status: t.status_active },
  { name: t.audience3_name, description: t.audience3_desc, size: '2.5M', status: t.status_testing },
  { name: t.audience4_name, description: t.audience4_desc, size: '600K', status: t.status_inactive },
  { name: t.audience5_name, description: t.audience5_desc, size: '450K', status: t.status_active },
];

const StatusBadge: React.FC<{ status: string, t: any }> = ({ status, t }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    let statusClasses = 'bg-slate-600/30 text-slate-400';

    if (status === t.status_active) {
        statusClasses = 'bg-emerald-500/20 text-emerald-300';
    } else if (status === t.status_testing) {
        statusClasses = 'bg-amber-500/20 text-amber-300';
    } else if (status === t.status_inactive) {
        statusClasses = 'bg-slate-600/30 text-slate-400';
    }
    
    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>
}

const Audiences: React.FC<AudiencesProps> = ({ language }) => {
  const t = translations[language].pageContent.audiences;
  const mockAudiences = getMockAudiences(t.mock);
  return (
    <Card title={t.title} icon={<UserGroupIcon className="w-6 h-6"/>}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-slate-400 text-sm">{t.description}</p>
            <button className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors w-full sm:w-auto">
                {t.create_button}
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-slate-700">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-slate-300">{t.header_name}</th>
                        <th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell">{t.header_desc}</th>
                        <th className="p-4 text-sm font-semibold text-slate-300 text-center">{t.header_size}</th>
                        <th className="p-4 text-sm font-semibold text-slate-300 text-center">{t.header_status}</th>
                    </tr>
                </thead>
                <tbody>
                    {mockAudiences.map((audience, index) => (
                        <tr key={index} className="border-b border-slate-800 hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 font-medium text-slate-100">{audience.name}</td>
                            <td className="p-4 text-slate-400 text-sm hidden md:table-cell">{audience.description}</td>
                            <td className="p-4 text-slate-300 font-mono text-center">{audience.size}</td>
                            <td className="p-4 text-center">
                                <StatusBadge status={audience.status} t={t.mock} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
  );
};

export default Audiences;
