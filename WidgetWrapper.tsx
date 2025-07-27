
import React from 'react';
import { XMarkIcon, Bars3Icon } from '../icons';

interface WidgetWrapperProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    isCustomizing: boolean;
    onRemove: () => void;
    dragHandleProps: any;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ title, children, className = '', isCustomizing, onRemove, dragHandleProps }) => {
    return (
        <div className={`bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700 flex flex-col ${isCustomizing ? 'ring-2 ring-sky-500/50 ring-offset-2 ring-offset-slate-900' : ''} ${className}`}>
            <div 
                {...dragHandleProps}
                className={`flex items-center justify-between p-4 border-b border-slate-700/50 ${isCustomizing ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
                <div className="flex items-center gap-2">
                    {isCustomizing && <Bars3Icon className="w-5 h-5 text-slate-500" />}
                    <h3 className="text-base font-semibold text-slate-200">{title}</h3>
                </div>
                {isCustomizing && (
                    <button onClick={onRemove} className="text-slate-500 hover:text-rose-400 transition-colors p-1 rounded-full bg-slate-700/50 hover:bg-slate-700">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
            <div className="p-4 sm:p-6 flex-grow">{children}</div>
        </div>
    );
};

export default WidgetWrapper;
