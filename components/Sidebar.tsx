
import React from 'react';
import { Industry } from '../types';
import { INDUSTRIES } from '../constants';

interface SidebarProps {
  selectedIndustry: Industry;
  onSelect: (industry: Industry) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedIndustry, onSelect }) => {
  return (
    <div className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-emerald-500 tracking-wider">VERIPURA</h1>
        <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Platform Workflow</p>
      </div>

      <nav className="flex flex-col gap-2">
        <p className="text-[10px] text-slate-500 font-bold uppercase mb-2 tracking-widest">Industry Modules</p>
        {(Object.keys(INDUSTRIES) as Industry[]).map((ind) => (
          <button
            key={ind}
            onClick={() => onSelect(ind)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium ${
              selectedIndustry === ind
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="text-lg">{INDUSTRIES[ind].icon}</span>
            {ind}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <p className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Total Market size</p>
          <p className="text-xl font-bold text-slate-200">$700B+</p>
        </div>
      </div>
    </div>
  );
};
