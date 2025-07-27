

import React, { useState, useMemo } from 'react';
import { BoltIcon, QuestionMarkCircleIcon, LightBulbIcon } from '../components/icons';
import { Action, TaskPriority } from '../types';
import { translations } from '../translations';

interface ActionsProps {
    language: 'tr' | 'en';
}

const getMockActions = (t: any): Action[] => [
  { category: t.categories.seo, title: t.mock.action1_title, description: t.mock.action1_desc, priority: 'Yüksek', effort: 'Orta', rationale: t.mock.action1_rationale },
  { category: t.categories.cro, title: t.mock.action9_title, description: t.mock.action9_desc, priority: 'Yüksek', effort: 'Düşük', rationale: t.mock.action9_rationale },
  { category: t.categories.social, title: t.mock.action2_title, description: t.mock.action2_desc, priority: 'Orta', effort: 'Düşük', rationale: t.mock.action2_rationale },
  { category: t.categories.cro, title: t.mock.action10_title, description: t.mock.action10_desc, priority: 'Yüksek', effort: 'Orta', rationale: t.mock.action10_rationale },
  { category: t.categories.content, title: t.mock.action4_title, description: t.mock.action4_desc, priority: 'Orta', effort: 'Orta', rationale: t.mock.action4_rationale },
  { category: t.categories.email, title: t.mock.action5_title, description: t.mock.action5_desc, priority: 'Yüksek', effort: 'Yüksek', rationale: t.mock.action5_rationale },
  { category: t.categories.social, title: t.mock.action6_title, description: t.mock.action6_desc, priority: 'Düşük', effort: 'Yüksek', rationale: t.mock.action6_rationale },
  { category: t.categories.content, title: t.mock.action7_title, description: t.mock.action7_desc, priority: 'Orta', effort: 'Orta', rationale: t.mock.action7_rationale },
  { category: t.categories.email, title: t.mock.action8_title, description: t.mock.action8_desc, priority: 'Orta', effort: 'Yüksek', rationale: t.mock.action8_rationale },
];


const priorityColors: { [key in TaskPriority]: string } = {
    'Yüksek': 'border-rose-500/80 text-rose-400',
    'Orta': 'border-amber-500/80 text-amber-400',
    'Düşük': 'border-sky-500/80 text-sky-400',
};

const ActionCard: React.FC<{ action: Action, t: any }> = ({ action, t }) => {
    const [isRationaleVisible, setIsRationaleVisible] = useState(false);
    
    const priorityKey = Object.keys(t.priorities).find(key => t.priorities[key].toLowerCase() === action.priority.toLowerCase()) || 'düşük';

    return (
        <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 transition-all duration-300 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${priorityColors[action.priority]}`}>
                         {t.priorities[priorityKey]}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100">{action.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{action.description}</p>
                </div>
                <div className="flex-shrink-0 text-center">
                    <p className="font-bold text-slate-100 text-lg">{action.effort}</p>
                    <p className="text-xs text-slate-500">{t.effort}</p>
                </div>
            </div>
            <div className="mt-4 border-t border-slate-700/50 pt-4 flex justify-between items-center">
                <button
                    onClick={() => setIsRationaleVisible(!isRationaleVisible)}
                    className="flex items-center gap-2 text-sm text-sky-300 font-semibold py-1 px-2 rounded-lg hover:bg-sky-500/20 transition-colors"
                    aria-expanded={isRationaleVisible}
                >
                    <QuestionMarkCircleIcon className="w-5 h-5"/>
                    {t.why_button}
                </button>
                <button className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors">
                    {t.add_to_tasks_button}
                </button>
            </div>
            {isRationaleVisible && (
                <div className="mt-4 p-3 bg-slate-900/70 border-l-4 border-sky-400 rounded-r-lg animate-fade-in">
                    <div className="flex items-start gap-3">
                        <LightBulbIcon className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5"/>
                        <p className="text-sm text-slate-300">{action.rationale}</p>
                    </div>
                </div>
            )}
        </div>
    );
};


const Actions: React.FC<ActionsProps> = ({ language }) => {
    const t = translations[language].pageContent.actions;
    const allActions = useMemo(() => getMockActions(t), [t]);
    const [activeCategory, setActiveCategory] = useState<string>(t.categories.all);

    const categories = [
        t.categories.all,
        t.categories.cro,
        t.categories.seo,
        t.categories.social,
        t.categories.content,
        t.categories.email,
    ];

    const filteredActions = useMemo(() => {
        if (activeCategory === t.categories.all) {
            return allActions;
        }
        return allActions.filter(action => action.category === activeCategory);
    }, [activeCategory, allActions, t.categories.all]);

    return (
        <div>
            <div className="text-center mb-10">
                <BoltIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{t.description}</p>
            </div>
            <div className="flex justify-center flex-wrap gap-2 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                            activeCategory === category
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="space-y-6">
                {filteredActions.map((action, index) => (
                    <ActionCard key={index} action={action} t={t} />
                ))}
            </div>
        </div>
    );
};

export default Actions;
