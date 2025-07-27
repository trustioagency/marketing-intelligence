import React from 'react';
import { Person, Team } from '../types';
import { BriefcaseIcon, EnvelopeIcon, PlusIcon } from '../components/icons';
import { translations } from '../translations';

interface EkipProps {
    language: 'tr' | 'en';
}

const teamColors: Record<Team, string> = {
    'Pazarlama': 'bg-sky-500/20 text-sky-300',
    'Satış': 'bg-emerald-500/20 text-emerald-300',
    'IT': 'bg-indigo-500/20 text-indigo-300',
    'Ürün': 'bg-amber-500/20 text-amber-300',
    'Tasarım': 'bg-purple-500/20 text-purple-300',
};

const mockPeople: Person[] = [
    { id: 1, name: 'Selin Demir', role: 'Pazarlama Direktörü', email: 'selin.demir@example.com', avatar: `https://i.pravatar.cc/150?u=10`, team: 'Pazarlama' },
    { id: 2, name: 'Burak Yılmaz', role: 'Satış Uzmanı', email: 'burak.yilmaz@example.com', avatar: `https://i.pravatar.cc/150?u=11`, team: 'Satış' },
    { id: 3, name: 'Ceren Arslan', role: 'Frontend Geliştirici', email: 'ceren.arslan@example.com', avatar: `https://i.pravatar.cc/150?u=12`, team: 'IT' },
    { id: 4, name: 'Emre Çelik', role: 'Ürün Yöneticisi', email: 'emre.celik@example.com', avatar: `https://i.pravatar.cc/150?u=13`, team: 'Ürün' },
    { id: 5, name: 'Deniz Kaya', role: 'UI/UX Tasarımcısı', email: 'deniz.kaya@example.com', avatar: `https://i.pravatar.cc/150?u=14`, team: 'Tasarım' },
    { id: 6, name: 'Gizem Öztürk', role: 'İçerik Uzmanı', email: 'gizem.ozturk@example.com', avatar: `https://i.pravatar.cc/150?u=15`, team: 'Pazarlama' },
    { id: 7, name: 'Ahmet Kurt', role: 'Backend Geliştirici', email: 'ahmet.kurt@example.com', avatar: `https://i.pravatar.cc/150?u=16`, team: 'IT' },
    { id: 8, name: 'Elif Aydın', role: 'Satış Direktörü', email: 'elif.aydin@example.com', avatar: `https://i.pravatar.cc/150?u=17`, team: 'Satış' },
];

const PersonCard: React.FC<{ person: Person, t: any }> = ({ person, t }) => {
    return (
        <div className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700 flex flex-col items-center text-center transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10">
            <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-slate-600"/>
            <h3 className="text-xl font-bold text-slate-100">{person.name}</h3>
            <p className="text-md text-slate-400">{person.role}</p>
            <div className={`mt-4 px-3 py-1 text-sm font-medium rounded-full ${teamColors[person.team]}`}>{person.team}</div>
            <div className="mt-6 border-t border-slate-700 w-full pt-4">
                 <a href={`mailto:${person.email}`} className="flex items-center justify-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
                    <EnvelopeIcon className="w-5 h-5"/>
                    <span>{t.send_email}</span>
                </a>
            </div>
        </div>
    );
}

const Ekip: React.FC<EkipProps> = ({ language }) => {
  const t = translations[language].pageContent.ekip;
  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
                <BriefcaseIcon className="w-10 h-10 text-sky-400"/>
                <div>
                    <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                    <p className="text-slate-400">{t.description}</p>
                </div>
            </div>
            <button className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                <PlusIcon className="w-5 h-5" />
                {t.add_button}
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPeople.map(person => (
                <PersonCard key={person.id} person={person} t={t}/>
            ))}
        </div>
    </div>
  );
};

export default Ekip;
