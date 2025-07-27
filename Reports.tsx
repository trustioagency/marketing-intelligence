import React from 'react';
import { ClipboardDocumentListIcon, PresentationChartLineIcon, CreditCardIcon, UserGroupIcon, TrendUpIcon } from '../components/icons';
import { translations } from '../translations';

interface ReportsProps {
    language: 'tr' | 'en';
}

const getMockReportTemplates = (t: any) => [
  {
    title: t.template1_title,
    description: t.template1_desc,
    icon: <PresentationChartLineIcon className="w-10 h-10 text-sky-400" />,
  },
  {
    title: t.template2_title,
    description: t.template2_desc,
    icon: <CreditCardIcon className="w-10 h-10 text-emerald-400" />,
  },
  {
    title: t.template3_title,
    description: t.template3_desc,
    icon: <UserGroupIcon className="w-10 h-10 text-indigo-400" />,
  },
  {
    title: t.template4_title,
    description: t.template4_desc,
    icon: <TrendUpIcon className="w-10 h-10 text-amber-400" />,
  },
];

const ReportTemplateCard: React.FC<ReturnType<typeof getMockReportTemplates>[0] & { t: any }> = ({ title, description, icon, t }) => {
  return (
    <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col items-start text-left transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10 h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 mt-2 flex-grow">{description}</p>
      <button className="mt-6 w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors">
        {t.create_button}
      </button>
    </div>
  );
};

const Reports: React.FC<ReportsProps> = ({ language }) => {
  const t = translations[language].pageContent.reports;
  const mockReportTemplates = getMockReportTemplates(t);
  return (
    <div>
      <div className="text-center mb-10">
        <ClipboardDocumentListIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
        <h2 className="text-3xl font-bold text-white">{t.title}</h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          {t.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReportTemplates.map((template, index) => (
          <ReportTemplateCard key={index} {...template} t={t} />
        ))}
      </div>
    </div>
  );
};

export default Reports;
