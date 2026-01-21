import React, { useState } from 'react';
import Section from './ui/Section';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ArrowRight, BookOpen, Target, BrainCircuit, Loader2, Languages, Repeat, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'jargon'>('objectives');
  
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

  return (
    <Section id="ai-playground" className="bg-neutral-900 border-t border-neutral-800">
        <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono uppercase tracking-wider mb-6">
                <Sparkles size={14} /> Live Tech Demos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white font-syne mb-6">
                The <span className="text-lime-400">Hybrid</span> <br/> Advantage
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
                I build tools that automate the heavy lifting in L&D and Tech. Switch between the demos below to see how I bridge the gap.
            </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-800 mb-8 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('objectives')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${activeTab === 'objectives' ? 'text-lime-400' : 'text-neutral-500 hover:text-white'}`}
            >
                ID Generator
                {activeTab === 'objectives' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
            <button 
                onClick={() => setActiveTab('jargon')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${activeTab === 'jargon' ? 'text-lime-400' : 'text-neutral-500 hover:text-white'}`}
            >
                Jargon Buster
                {activeTab === 'jargon' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start min-h-[400px]">
            {/* Input Side */}
            <AnimatePresence mode="wait">
                {activeTab === 'objectives' ? (
                    <motion.div 
                        key="obj-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Target className="text-lime-400" size={20}/> Learning Objective Generator</h3>
                             <p className="text-neutral-400 text-sm">Enter a topic, and I'll generate measurable objectives using Bloom's Taxonomy.</p>
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
                ) : (
                    <motion.div 
                        key="jargon-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.3 }}
                    >
                         <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Languages className="text-lime-400" size={20}/> Jargon Buster</h3>
                             <p className="text-neutral-400 text-sm">Paste complex technical text, and I'll translate it for non-technical stakeholders.</p>
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
            </AnimatePresence>

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
            </div>
        </div>
    </Section>
  );
};

export default AiPlayground;