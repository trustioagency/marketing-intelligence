import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { Task, TaskStatus, TaskPriority, Team } from '../types';
import { BriefcaseIcon, PlusIcon, XMarkIcon, CalendarDaysIcon, UserGroupIcon } from '../components/icons';
import { translations } from '../translations';

interface TasksProps {
    language: 'tr' | 'en';
}

const initialTasks: Task[] = [
    { id: '1', title: 'Q3 Pazarlama Raporunu Hazırla', description: 'Tüm kanallardan gelen verileri birleştirerek çeyrek sonu raporunu oluşturun.', status: 'Yapılıyor', priority: 'Yüksek', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignee: 'Pazarlama' },
    { id: '2', title: 'Yeni "İndirim" Landing Page Tasarımı', description: 'Yaklaşan bayram kampanyası için yeni bir açılış sayfası tasarlanmalı.', status: 'Yapılacak', priority: 'Yüksek', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignee: 'Tasarım' },
    { id: '3', title: 'Website Hız Optimizasyonu', description: 'Ana sayfa yüklenme süresini 2 saniyenin altına indirmek için gerekli optimizasyonları yapın.', status: 'Yapılıyor', priority: 'Orta', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignee: 'IT' },
    { id: '4', title: 'Müşteri Geri Bildirimlerini Analiz Et', description: 'Son anketten gelen müşteri geri bildirimlerini özetleyin ve aksiyon planı çıkarın.', status: 'Tamamlandı', priority: 'Orta', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignee: 'Ürün' },
    { id: '5', title: 'Yeni Satış Sunumu Hazırlığı', description: 'Kurumsal müşteriler için yeni ürün özelliklerini içeren bir sunum hazırlayın.', status: 'Yapılacak', priority: 'Orta', dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignee: 'Satış' },
    { id: '6', title: 'Sosyal Medya İçerik Takvimini Güncelle', description: 'Gelecek ayın içerik takvimini rakip analizlerine göre revize edin.', status: 'Yapılacak', priority: 'Düşük', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignee: 'Pazarlama' },
];

const teamColors: Record<Team, string> = {
    'Pazarlama': 'bg-sky-500/20 text-sky-300',
    'Satış': 'bg-emerald-500/20 text-emerald-300',
    'IT': 'bg-indigo-500/20 text-indigo-300',
    'Ürün': 'bg-amber-500/20 text-amber-300',
    'Tasarım': 'bg-purple-500/20 text-purple-300',
};

const priorityColors: Record<TaskPriority, string> = {
    'Yüksek': 'bg-rose-500',
    'Orta': 'bg-amber-500',
    'Düşük': 'bg-emerald-500',
};

const TaskModal: React.FC<{ isOpen: boolean; onClose: () => void; onAddTask: (task: Omit<Task, 'id' | 'status'>) => void; t: any; }> = ({ isOpen, onClose, onAddTask, t }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState<Team>('Pazarlama');
    const [priority, setPriority] = useState<TaskPriority>('Orta');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !dueDate) return;
        onAddTask({ title, description, assignee, priority, dueDate });
        onClose();
        setTitle('');
        setDescription('');
        setAssignee('Pazarlama');
        setPriority('Orta');
        setDueDate('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-700 flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 sm:p-6 border-b border-slate-700 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{t.modal.title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><XMarkIcon className="w-7 h-7" /></button>
                </header>
                <form onSubmit={handleSubmit}>
                    <main className="p-4 sm:p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-1">{t.modal.task_title}</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">{t.modal.description}</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="assignee" className="block text-sm font-medium text-slate-400 mb-1">{t.modal.assignee}</label>
                                <select id="assignee" value={assignee} onChange={e => setAssignee(e.target.value as Team)} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                                    {Object.keys(teamColors).map(team => <option key={team} value={team}>{team}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-slate-400 mb-1">{t.modal.priority}</label>
                                <select id="priority" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                                    <option>{t.priorities.low}</option>
                                    <option>{t.priorities.medium}</option>
                                    <option>{t.priorities.high}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-slate-400 mb-1">{t.modal.due_date}</label>
                                <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                            </div>
                        </div>
                    </main>
                    <footer className="p-4 sm:p-6 border-t border-slate-700 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-slate-700 text-slate-200 font-bold py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors">{t.modal.cancel}</button>
                        <button type="submit" className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors">{t.modal.add}</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

const TaskCard: React.FC<{ task: Task; onDragStart: (e: React.DragEvent, taskId: string) => void, t: any }> = ({ task, onDragStart, t }) => {
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Tamamlandı';
    
    const priorityKey = Object.keys(t.priorities).find(key => t.priorities[key] === task.priority) || 'Düşük';
    const priorityMap: Record<string, TaskPriority> = { 'high': 'Yüksek', 'medium': 'Orta', 'low': 'Düşük' };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700 cursor-grab active:cursor-grabbing hover:border-sky-500 transition-colors"
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-100">{task.title}</h4>
                <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${priorityColors[task.priority]}`} title={`${t.priority}: ${task.priority}`}></div>
            </div>
            <p className="text-sm text-slate-400 mb-4">{task.description}</p>
            <div className="flex justify-between items-center text-xs">
                <div className={`px-2 py-1 rounded-full font-medium ${teamColors[task.assignee]}`}>{task.assignee}</div>
                <div className={`flex items-center gap-1.5 ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

const Tasks: React.FC<TasksProps> = ({ language }) => {
    const t = translations[language].pageContent.tasks;
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);

    const columns: TaskStatus[] = ['Yapılacak', 'Yapılıyor', 'Tamamlandı'];

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
        setDragOverStatus(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleAddTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
        const newTask: Task = {
            id: Date.now().toString(),
            status: 'Yapılacak',
            ...newTaskData,
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const tasksByStatus = useMemo(() => {
        return {
            'Yapılacak': tasks.filter(t => t.status === 'Yapılacak'),
            'Yapılıyor': tasks.filter(t => t.status === 'Yapılıyor'),
            'Tamamlandı': tasks.filter(t => t.status === 'Tamamlandı'),
        };
    }, [tasks]);

    const getColumnTitle = (status: TaskStatus) => {
        if(status === 'Yapılacak') return t.columns.todo;
        if(status === 'Yapılıyor') return t.columns.in_progress;
        if(status === 'Tamamlandı') return t.columns.done;
        return status;
    }


    return (
        <>
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} t={t}/>
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <BriefcaseIcon className="w-10 h-10 text-sky-400"/>
                        <div>
                            <h2 className="text-3xl font-bold text-white">{t.title}</h2>
                            <p className="text-slate-400">{t.description}</p>
                        </div>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                        <PlusIcon className="w-5 h-5" />
                        {t.add_button}
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {columns.map(status => (
                        <div
                            key={status}
                            onDrop={(e) => handleDrop(e, status)}
                            onDragOver={handleDragOver}
                            onDragEnter={() => setDragOverStatus(status)}
                            onDragLeave={() => setDragOverStatus(null)}
                            className={`transition-colors rounded-xl ${dragOverStatus === status ? 'bg-slate-700/50' : ''}`}
                        >
                            <Card title={`${getColumnTitle(status)} (${tasksByStatus[status].length})`} className="h-full">
                                <div className="space-y-4">
                                    {tasksByStatus[status].map(task => (
                                        <TaskCard key={task.id} task={task} onDragStart={handleDragStart} t={t} />
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tasks;
