
import React from 'react';

interface AgentCardProps {
  name: string;
  icon: string;
  status: 'idle' | 'processing' | 'done';
  description: string;
  content?: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({ name, icon, status, description, content }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'processing': return 'border-amber-500 text-amber-500';
      case 'done': return 'border-emerald-500 text-emerald-500';
      default: return 'border-slate-800 text-slate-500';
    }
  };

  return (
    <div className={`p-4 rounded-xl border-2 bg-slate-900/40 transition-all duration-500 ${getStatusColor()} ${status === 'processing' ? 'animate-pulse' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-tight">{name}</h4>
          <p className="text-[10px] text-slate-400">{description}</p>
        </div>
        {status === 'done' && (
          <div className="ml-auto bg-emerald-500 text-slate-900 rounded-full p-0.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {content && (
        <div className="mt-3 p-2 bg-black/40 rounded border border-slate-800/50 font-mono text-[10px] whitespace-pre-wrap max-h-24 overflow-y-auto">
          {content}
        </div>
      )}
    </div>
  );
};
