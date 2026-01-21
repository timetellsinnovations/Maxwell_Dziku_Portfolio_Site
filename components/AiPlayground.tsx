import React, { useState, useMemo } from 'react';
import Section from './ui/Section';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ArrowRight, BookOpen, Target, BrainCircuit, Loader2, Languages, Repeat, CheckCircle2, Calculator, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'jargon' | 'roi'>('objectives');
  
  // Objectives State
  const [topic, setTopic] = useState('');
  const [objResult, setObjResult] = useState<string[]>([]);
  const [isObjLoading, setIsObjLoading] = useState(false);
  const [objError, setObjError] = useState('');

  // Jargon State
  const [jargonInput, setJargonInput] = useState('');
  const [jargonResult, setJargonResult] = useState('');
  const [isJargonLoading, setIsJargonLoading] = useState(false);
  const [jargonError, setJargonError] = useState('');

  // ROI Calculator State
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    hourlyWage: 45,
    hoursSaved: 5,
    devCost: 5000
  });

  // ROI Derived State
  const roiMetrics = useMemo(() => {
    const totalSavings = roiInputs.employees * roiInputs.hourlyWage * roiInputs.hoursSaved;
    const netBenefit = totalSavings - roiInputs.devCost;
    const roiPercent = roiInputs.devCost > 0 ? (netBenefit / roiInputs.devCost) * 100 : 0;
    return { totalSavings, netBenefit, roiPercent };
  }, [roiInputs]);

  const generateObjectives = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsObjLoading(true);
    setObjError('');
    setObjResult([]);

    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("System Error: API Key missing.");

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `Act as a Senior Instructional Designer. 
        Create 3 measurable learning objectives based on Bloom's Taxonomy for a training module about: "${topic}".
        
        Return ONLY a raw JSON array of strings. No markdown, no "json" tags. 
        Example format: ["By the end of this module, learners will be able to define...", "Learners will demonstrate..."]`;

        const response = await ai.models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: prompt 
        });
        
        const text = response.text || "[]";
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        try {
            const parsed = JSON.parse(cleanJson);
            if (Array.isArray(parsed)) {
                setObjResult(parsed);
            } else {
                setObjResult(["Could not parse objectives. Please try again."]);
            }
        } catch (e) {
             setObjResult([text]); 
        }

    } catch (err: any) {
        console.error(err);
        if (err.message?.includes("429")) {
            setObjError("Quota exceeded. Please wait 30s.");
        } else {
            setObjError("Something went wrong.");
        }
    } finally {
        setIsObjLoading(false);
    }
  };

  const generateJargonBuster = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jargonInput.trim()) return;

    setIsJargonLoading(true);
    setJargonError('');
    setJargonResult('');

    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("System Error: API Key missing.");

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `Act as a Technical Communication Expert.
        Rewrite the following complex technical text for a non-technical audience (e.g., Project Managers, Stakeholders, or Junior Designers).
        
        Rules:
        1. Use simple analogies where possible.
        2. Remove acronyms or explain them.
        3. Keep it professional but accessible.
        4. Focus on the "Business Value" or "User Benefit".

        Input Text: "${jargonInput}"`;

        const response = await ai.models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: prompt 
        });
        
        setJargonResult(response.text || "Could not generate a response.");

    } catch (err: any) {
        console.error(err);
        if (err.message?.includes("429")) {
            setJargonError("Quota exceeded. Please wait 30s.");
        } else {
            setJargonError("Something went wrong.");
        }
    } finally {
        setIsJargonLoading(false);
    }
  };

  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoiInputs(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
    }));
  };

  return (
    <Section id="ai-playground" className="bg-neutral-900 border-t border-neutral-800">
        <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono uppercase tracking-wider mb-6">
                <Sparkles size={14} /> Interactive Demos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white font-syne mb-6">
                The <span className="text-lime-400">Hybrid</span> <br/> Advantage
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
                I build tools that automate the heavy lifting in L&D and Tech. Switch between the demos below to see how I bridge the gap between Instructional Design, Code, and Business Strategy.
            </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-800 mb-8 overflow-x-auto no-scrollbar">
            <button 
                onClick={() => setActiveTab('objectives')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'objectives' ? 'text-lime-400' : 'text-neutral-500 hover:text-white'}`}
            >
                <Target size={16} /> ID Generator
                {activeTab === 'objectives' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
            <button 
                onClick={() => setActiveTab('jargon')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'jargon' ? 'text-lime-400' : 'text-neutral-500 hover:text-white'}`}
            >
                <Languages size={16} /> Jargon Buster
                {activeTab === 'jargon' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
            <button 
                onClick={() => setActiveTab('roi')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'roi' ? 'text-lime-400' : 'text-neutral-500 hover:text-white'}`}
            >
                <Calculator size={16} /> ROI Calc
                {activeTab === 'roi' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start min-h-[450px]">
            {/* Input Side */}
            <div className="relative">
            <AnimatePresence mode="wait">
                {activeTab === 'objectives' && (
                    <motion.div 
                        key="obj-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Learning Objective Generator</h3>
                             <p className="text-neutral-400 text-sm">Enter a topic, and I'll generate measurable objectives using Bloom's Taxonomy. Demonstrates <strong>Prompt Engineering</strong> and <strong>ID Theory</strong>.</p>
                        </div>
                        <form onSubmit={generateObjectives} className="relative">
                            <input 
                                type="text" 
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. Fire Safety, React Hooks, Conflict Resolution"
                                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-lg py-4 pl-4 pr-32 focus:border-lime-400 focus:outline-none transition-colors"
                            />
                            <button 
                                type="submit" 
                                disabled={isObjLoading || !topic.trim()}
                                className="absolute right-2 top-2 bottom-2 bg-lime-400 text-black px-4 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isObjLoading ? <Loader2 size={16} className="animate-spin" /> : <>Generate <ArrowRight size={16} /></>}
                            </button>
                        </form>
                        {objError && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {objError}</p>}
                    </motion.div>
                )}

                {activeTab === 'jargon' && (
                    <motion.div 
                        key="jargon-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.3 }}
                    >
                         <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Technical Jargon Buster</h3>
                             <p className="text-neutral-400 text-sm">Paste complex technical text, and I'll translate it for non-technical stakeholders. Demonstrates <strong>NLP</strong> and <strong>Communication Skills</strong>.</p>
                        </div>
                        <form onSubmit={generateJargonBuster} className="flex flex-col gap-4">
                            <textarea 
                                value={jargonInput}
                                onChange={(e) => setJargonInput(e.target.value)}
                                placeholder="Paste text like: 'We need to refactor the monolithic architecture to microservices to reduce technical debt and improve CI/CD pipelines...'"
                                className="w-full h-40 bg-neutral-950 border border-neutral-700 text-white rounded-lg p-4 focus:border-lime-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-600"
                            />
                            <button 
                                type="submit" 
                                disabled={isJargonLoading || !jargonInput.trim()}
                                className="self-start bg-lime-400 text-black px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isJargonLoading ? <Loader2 size={16} className="animate-spin" /> : <>Translate <Repeat size={16} /></>}
                            </button>
                        </form>
                         {jargonError && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {jargonError}</p>}
                    </motion.div>
                )}

                {activeTab === 'roi' && (
                    <motion.div 
                        key="roi-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.3 }}
                    >
                         <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">L&D Value Calculator</h3>
                             <p className="text-neutral-400 text-sm">Calculate the potential ROI of a training initiative. Demonstrates <strong>Business Acumen</strong> and <strong>React State Logic</strong>.</p>
                        </div>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-neutral-500 flex items-center gap-2"><Users size={12}/> Learners</label>
                                <input 
                                    type="number" 
                                    name="employees"
                                    value={roiInputs.employees}
                                    onChange={handleRoiChange}
                                    className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-3 focus:border-lime-400 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-neutral-500 flex items-center gap-2"><DollarSign size={12}/> Hourly Wage ($)</label>
                                <input 
                                    type="number" 
                                    name="hourlyWage"
                                    value={roiInputs.hourlyWage}
                                    onChange={handleRoiChange}
                                    className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-3 focus:border-lime-400 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-neutral-500 flex items-center gap-2"><Clock size={12}/> Hours Saved/Year</label>
                                <input 
                                    type="number" 
                                    name="hoursSaved"
                                    value={roiInputs.hoursSaved}
                                    onChange={handleRoiChange}
                                    className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-3 focus:border-lime-400 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-neutral-500 flex items-center gap-2"><BrainCircuit size={12}/> Dev Cost ($)</label>
                                <input 
                                    type="number" 
                                    name="devCost"
                                    value={roiInputs.devCost}
                                    onChange={handleRoiChange}
                                    className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-3 focus:border-lime-400 focus:outline-none"
                                />
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>

            {/* Results Side */}
            <div className="bg-neutral-950 rounded-xl p-8 border border-neutral-800 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
                 
                 {/* Objective Results */}
                 {activeTab === 'objectives' && (
                    <>
                        {!isObjLoading && objResult.length === 0 && !objError && (
                            <div className="text-center text-neutral-600">
                                <Target size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="uppercase tracking-widest text-sm">Waiting for input...</p>
                            </div>
                        )}
                        {isObjLoading && (
                             <div className="space-y-4">
                                <div className="h-4 bg-neutral-800 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-neutral-800 rounded w-1/2 animate-pulse"></div>
                                <div className="h-4 bg-neutral-800 rounded w-5/6 animate-pulse"></div>
                            </div>
                        )}
                        {objResult.length > 0 && (
                             <div className="space-y-4">
                                <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
                                    <BookOpen size={14} className="text-lime-400"/> Generated Objectives
                                </h4>
                                {objResult.map((obj, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-neutral-900 p-4 rounded border-l-2 border-lime-400"
                                    >
                                        <p className="text-neutral-300 text-sm leading-relaxed">{obj}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                 )}

                 {/* Jargon Results */}
                 {activeTab === 'jargon' && (
                     <>
                        {!isJargonLoading && !jargonResult && !jargonError && (
                            <div className="text-center text-neutral-600">
                                <Languages size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="uppercase tracking-widest text-sm">Waiting for complex text...</p>
                            </div>
                        )}
                        {isJargonLoading && (
                             <div className="space-y-4">
                                <div className="h-4 bg-neutral-800 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-neutral-800 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-neutral-800 rounded w-2/3 animate-pulse"></div>
                            </div>
                        )}
                        {jargonResult && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                             >
                                <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-lime-400"/> Simplified Version
                                </h4>
                                <div className="bg-neutral-900 p-6 rounded border-l-2 border-lime-400">
                                    <p className="text-neutral-200 leading-relaxed whitespace-pre-wrap">{jargonResult}</p>
                                </div>
                             </motion.div>
                        )}
                     </>
                 )}

                 {/* ROI Results */}
                 {activeTab === 'roi' && (
                    <motion.div
                        key="roi-result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col h-full"
                    >
                         <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6 border-b border-neutral-800 pb-2 flex items-center gap-2">
                            <TrendingUp size={14} className="text-lime-400"/> Projected Impact
                        </h4>
                        
                        <div className="space-y-6 flex-grow">
                             <div>
                                <p className="text-neutral-500 text-xs uppercase font-bold mb-1">Total Savings (Yr 1)</p>
                                <p className="text-4xl font-bold text-white font-syne">${roiMetrics.totalSavings.toLocaleString()}</p>
                             </div>
                             
                             <div className="h-4 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((roiInputs.devCost / roiMetrics.totalSavings) * 100, 100)}%` }}
                                    className="h-full bg-red-500"
                                    title="Cost"
                                />
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100 - (roiInputs.devCost / roiMetrics.totalSavings) * 100, 100)}%` }}
                                    className="h-full bg-lime-400"
                                    title="Profit"
                                />
                             </div>
                             <div className="flex justify-between text-xs font-mono text-neutral-500">
                                <span>Cost: ${roiInputs.devCost.toLocaleString()}</span>
                                <span className="text-lime-400">Net: ${roiMetrics.netBenefit.toLocaleString()}</span>
                             </div>

                             <div className="bg-neutral-900 p-4 rounded border border-neutral-800 flex items-center justify-between">
                                 <span className="text-sm text-neutral-400">Return on Investment</span>
                                 <span className={`text-2xl font-bold font-mono ${roiMetrics.roiPercent > 0 ? 'text-lime-400' : 'text-red-400'}`}>
                                    {roiMetrics.roiPercent.toFixed(0)}%
                                 </span>
                             </div>
                        </div>
                    </motion.div>
                 )}
            </div>
        </div>
    </Section>
  );
};

export default AiPlayground;