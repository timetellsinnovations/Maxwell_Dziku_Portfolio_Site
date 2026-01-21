import React, { useState } from 'react';
import Section from './ui/Section';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ArrowRight, BookOpen, Target, BrainCircuit, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AiPlayground: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateObjectives = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError('');
    setResult([]);

    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("System Error: API Key missing.");

        const ai = new GoogleGenAI({ apiKey });
        const model = ai.models.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `Act as a Senior Instructional Designer. 
        Create 3 measurable learning objectives based on Bloom's Taxonomy for a training module about: "${topic}".
        
        Return ONLY a raw JSON array of strings. No markdown, no "json" tags. 
        Example format: ["By the end of this module, learners will be able to define...", "Learners will demonstrate..."]`;

        const response = await ai.models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: prompt 
        });
        
        const text = response.text || "[]";
        // Clean markdown code blocks if present
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        try {
            const parsed = JSON.parse(cleanJson);
            if (Array.isArray(parsed)) {
                setResult(parsed);
            } else {
                setResult(["Could not parse objectives. Please try again."]);
            }
        } catch (e) {
             setResult([text]); // Fallback to raw text if JSON fails
        }

    } catch (err: any) {
        console.error(err);
        if (err.message?.includes("429")) {
            setError("Quota exceeded. The AI is popular right now! Please wait 30s.");
        } else {
            setError("Something went wrong generating the objectives.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Section id="ai-playground" className="bg-neutral-900 border-t border-neutral-800">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono uppercase tracking-wider mb-6">
                    <Sparkles size={14} /> Live Tech Demo
                </div>
                <h2 className="text-4xl md:text-5xl font-bold uppercase text-white font-syne mb-6">
                    The <span className="text-lime-400">Hybrid</span> <br/> Advantage
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    Why hire separate ID and Dev roles? I build tools that automate the Instructional Design process.
                </p>
                <p className="text-neutral-400 mb-8">
                    <strong>Try it out:</strong> Enter a training topic below, and watch the AI (powered by my code) generate measurable learning objectives using <strong>Bloom's Taxonomy</strong>.
                </p>

                <form onSubmit={generateObjectives} className="relative max-w-md">
                    <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Fire Safety, React Hooks, Conflict Resolution"
                        className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-lg py-4 pl-4 pr-32 focus:border-lime-400 focus:outline-none transition-colors"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !topic.trim()}
                        className="absolute right-2 top-2 bottom-2 bg-lime-400 text-black px-4 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Generate <ArrowRight size={16} /></>}
                    </button>
                </form>
                {error && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {error}</p>}
            </div>

            {/* Results Area */}
            <div className="bg-neutral-950 rounded-xl p-8 border border-neutral-800 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
                {!isLoading && result.length === 0 && !error && (
                    <div className="text-center text-neutral-600">
                        <Target size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="uppercase tracking-widest text-sm">Waiting for input...</p>
                    </div>
                )}

                {isLoading && (
                    <div className="space-y-4">
                        <div className="h-4 bg-neutral-800 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-neutral-800 rounded w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-neutral-800 rounded w-5/6 animate-pulse"></div>
                    </div>
                )}

                {result.length > 0 && (
                    <div className="space-y-4">
                        <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
                            <BookOpen size={14} className="text-lime-400"/> Generated Objectives
                        </h4>
                        {result.map((obj, i) => (
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
            </div>
        </div>
    </Section>
  );
};

export default AiPlayground;