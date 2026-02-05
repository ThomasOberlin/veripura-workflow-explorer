
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Industry, AgentAction } from './types';
import { INDUSTRIES, STEPS } from './constants';
import { AgentCard } from './components/AgentCard';
import { generateWorkflowSim } from './services/geminiService';

const App: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.FOOD);
  const [productDesc, setProductDesc] = useState('Organic Sun-Dried Mangoes');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const startWorkflow = async () => {
    if (!productDesc) return;
    setIsProcessing(true);
    setResults(null);
    setCurrentStep(1);
    setLogs(['Initializing VeriPura Multi-Agent Orchestrator...', 'Setting regulatory context for ' + selectedIndustry]);

    try {
      // Step-by-step simulation delay for visual effect
      const simData = await generateWorkflowSim(selectedIndustry, productDesc);
      
      // Artificial delay to show steps
      for (let i = 1; i <= 6; i++) {
        setCurrentStep(i);
        await new Promise(r => setTimeout(r, 1200));
        switch(i) {
          case 1: setLogs(prev => [...prev, `[Agent 1] Classified as: ${simData.classification} (HS: ${simData.hsCode})`]); break;
          case 2: setLogs(prev => [...prev, `[Agent 2] Mapped ${simData.requirements.length} required documents.`]); break;
          case 3: setLogs(prev => [...prev, `[Agent 3] Extracted data successfully with high confidence.`]); break;
          case 4: setLogs(prev => [...prev, `[Agent 4] Validating against Global Regulations...`]); break;
          case 5: setLogs(prev => [...prev, simData.anomalyFound ? `[Agent 5] ALERT: Anomaly Detected!` : `[Agent 5] No anomalies found in documentation sequence.`]); break;
          case 6: setLogs(prev => [...prev, `[Blockchain] Transaction notarized on IOTA Tangle. Hash: 0x${Math.random().toString(16).slice(2)}`]); break;
        }
      }
      
      setResults(simData);
    } catch (error) {
      console.error(error);
      setLogs(prev => [...prev, 'ERROR: Orchestration failure. Retrying...']);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen text-slate-200 overflow-hidden">
      <Sidebar selectedIndustry={selectedIndustry} onSelect={setSelectedIndustry} />

      <main className="flex-1 flex flex-col bg-slate-950 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
          
          {/* Header Section */}
          <section className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-white flex items-center gap-3">
                {INDUSTRIES[selectedIndustry].icon} {selectedIndustry}
              </h2>
              <p className="text-slate-400 mt-2 max-w-xl">
                The {selectedIndustry} module handles <span className="text-emerald-400 font-bold">{INDUSTRIES[selectedIndustry].marketSize}</span> in annual trade. 
                {INDUSTRIES[selectedIndustry].problem}
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 w-full md:w-80">
              <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Simulate Transaction</label>
              <input 
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Enter product description..."
                className="w-full bg-black border border-slate-700 rounded-lg p-2 text-sm focus:border-emerald-500 outline-none transition-all mb-3"
              />
              <button 
                onClick={startWorkflow}
                disabled={isProcessing}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-900 font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    Orchestrating Agents...
                  </>
                ) : (
                  'Run Validation Workflow'
                )}
              </button>
            </div>
          </section>

          {/* Workflow Stepper */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 -z-10" />
            <div className="flex justify-between">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    currentStep >= step.id 
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    {step.id}
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] font-bold uppercase ${currentStep >= step.id ? 'text-emerald-400' : 'text-slate-600'}`}>{step.label}</p>
                    <p className="text-[9px] text-slate-500 w-24 leading-tight">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Grid: Agents & Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Agent Status Panel */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
               <AgentCard 
                name="Classification Agent" 
                icon="🤖" 
                description="HS Code & Product ID"
                status={currentStep > 1 ? 'done' : currentStep === 1 ? 'processing' : 'idle'}
                content={results ? `Category: ${results.classification}\nHS Code: ${results.hsCode}` : undefined}
               />
               <AgentCard 
                name="Requirement Mapper" 
                icon="📋" 
                description="Regulatory Checklist"
                status={currentStep > 2 ? 'done' : currentStep === 2 ? 'processing' : 'idle'}
                content={results ? results.requirements.join('\n') : undefined}
               />
               <AgentCard 
                name="Document Extraction" 
                icon="📄" 
                description="OCR Multi-Agent Parsing"
                status={currentStep > 3 ? 'done' : currentStep === 3 ? 'processing' : 'idle'}
                content={results ? results.extractionData : undefined}
               />
               <AgentCard 
                name="Validation Engine" 
                icon="⚖️" 
                description="Rules & MRL Verification"
                status={currentStep > 4 ? 'done' : currentStep === 4 ? 'processing' : 'idle'}
                content={results ? results.validationResult : undefined}
               />
               <AgentCard 
                name="Anomaly Detection" 
                icon="🔍" 
                description="Fraud & Pattern Analysis"
                status={currentStep > 5 ? 'done' : currentStep === 5 ? 'processing' : 'idle'}
                content={results ? (results.anomalyFound ? `ALERT: ${results.anomalyDetail}` : 'No anomalies detected.') : undefined}
               />
               <AgentCard 
                name="Confidence Scorer" 
                icon="📊" 
                description="Final Risk Weighting"
                status={currentStep > 5 ? 'done' : currentStep === 5 ? 'processing' : 'idle'}
                content={results ? `Score: ${results.confidenceScore}%\nAction: ${results.needsHITM ? 'ROUTE TO HITM' : 'AUTO-APPROVE'}` : undefined}
               />
            </div>

            {/* Terminal Panel */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Orchestration Logs</span>
              </div>
              <div className="p-4 flex-1 font-mono text-xs overflow-y-auto bg-black/40">
                {logs.length === 0 && <p className="text-slate-600 italic">Waiting for input...</p>}
                {logs.map((log, i) => (
                  <div key={i} className="mb-2 flex gap-2">
                    <span className="text-emerald-500/50 shrink-0">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                    <span className={log.includes('ALERT') ? 'text-amber-400' : 'text-slate-300'}>{log}</span>
                  </div>
                ))}
                {isProcessing && <div className="text-emerald-400 animate-pulse">_</div>}
              </div>
            </div>

          </div>

          {/* Strategic Advantages Summary */}
          {results && !isProcessing && (
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-emerald-400">Transaction Finalized</h3>
                <div className="flex items-center gap-2">
                   <div className="px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full uppercase tracking-widest">Notarized</div>
                   <div className="px-3 py-1 bg-slate-800 text-slate-200 text-[10px] font-bold rounded-full uppercase tracking-widest">Token Reward: +15 VERI</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">IOTA Trust Framework</p>
                  <p className="text-xs text-slate-300 italic">"Transaction anchored to IOTA Tangle. Decentralized ID {results.needsHITM ? 'awaiting Human validator signature.' : 'fully verified.'}"</p>
                </div>
                <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Efficiency Gain</p>
                  <p className="text-sm font-bold text-emerald-400">Time saved: ~4.2 days</p>
                  <p className="text-xs text-slate-500">Traditional processing: 5 days. VeriPura: 15 mins.</p>
                </div>
                <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Digital Passport</p>
                  <p className="text-xs text-slate-300">New DPP generated for batch. Consumer scan-ready.</p>
                  <button className="mt-2 text-[10px] text-emerald-500 underline hover:text-emerald-400">View Public Passport</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
