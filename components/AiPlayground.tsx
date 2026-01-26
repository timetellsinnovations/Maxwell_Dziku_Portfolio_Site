import React, { useState, useMemo, useRef } from 'react';
import Section from './ui/Section';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ArrowRight, BookOpen, Target, BrainCircuit, Loader2, Languages, Repeat, CheckCircle2, Calculator, TrendingUp, DollarSign, Users, Clock, MessageSquare, AlertTriangle, Lightbulb, Split, Layers, Search, Scale, Eye, Upload, MousePointerClick, XCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'jargon' | 'roi' | 'feedback' | 'chunker' | 'complexity' | 'a11y' | 'walkme'>('objectives');
  
  // Objectives State
  const [topic, setTopic] = useState('');
  const [objResult, setObjResult] = useState<string[]>([]);
  const [isObjLoading, setIsObjLoading] = useState(false);
  const [objError, setObjError] = useState('');

  // Jargon (Clarity Engine) State
  const [jargonInput, setJargonInput] = useState('');
  const [jargonResult, setJargonResult] = useState('');
  const [isJargonLoading, setIsJargonLoading] = useState(false);
  const [jargonError, setJargonError] = useState('');

  // Complexity Analyzer State
  const [complexityInput, setComplexityInput] = useState('');
  const [complexityResult, setComplexityResult] = useState<any>(null);
  const [isComplexityLoading, setIsComplexityLoading] = useState(false);
  const [complexityError, setComplexityError] = useState('');

  // ROI Calculator State
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    hourlyWage: 45,
    hoursSaved: 5,
    devCost: 5000
  });

  // Feedback Analysis State
  const [feedbackInput, setFeedbackInput] = useState('');
  const [feedbackResult, setFeedbackResult] = useState<any>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');

  // Content Chunker State
  const [chunkerInput, setChunkerInput] = useState('');
  const [chunkerResult, setChunkerResult] = useState<any[]>([]);
  const [isChunkerLoading, setIsChunkerLoading] = useState(false);
  const [chunkerError, setChunkerError] = useState('');

  // Accessibility Checker State
  const [a11yMode, setA11yMode] = useState<'text' | 'image'>('text');
  const [a11yTextInput, setA11yTextInput] = useState('');
  const [a11yImage, setA11yImage] = useState<string | null>(null);
  const [a11yResult, setA11yResult] = useState<any>(null);
  const [isA11yLoading, setIsA11yLoading] = useState(false);
  const [a11yError, setA11yError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // WalkMe Simulator State
  const [walkMeStep, setWalkMeStep] = useState(0);

  // ROI Derived State
  const roiMetrics = useMemo(() => {
    const totalSavings = roiInputs.employees * roiInputs.hourlyWage * roiInputs.hoursSaved;
    const netBenefit = totalSavings - roiInputs.devCost;
    const roiPercent = roiInputs.devCost > 0 ? (netBenefit / roiInputs.devCost) * 100 : 0;
    return { totalSavings, netBenefit, roiPercent };
  }, [roiInputs]);

  // --- Helpers ---
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          let encoded = reader.result as string;
          // Remove data:image/...;base64, prefix
          encoded = encoded.split(',')[1]; 
          resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        setA11yImage(base64);
        setA11yResult(null); // Clear previous results
      } catch (err) {
        setA11yError("Failed to process image.");
      }
    }
  };

  // --- Generators ---

  const generateA11yAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (a11yMode === 'text' && !a11yTextInput.trim()) return;
    if (a11yMode === 'image' && !a11yImage) return;

    setIsA11yLoading(true);
    setA11yError('');
    setA11yResult(null);

    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("System Error: API Key missing.");

        const ai = new GoogleGenAI({ apiKey });
        
        const systemPrompt = `Act as a WCAG 2.1 AA Accessibility Expert. Analyze the provided ${a11yMode === 'image' ? 'screenshot' : 'HTML snippet'}.
        Identify issues related to: Color Contrast, Alt Text, Semantic Structure, and Focus States.
        
        Return ONLY a raw JSON object:
        {
          "score": 85, // 0-100
          "status": "Pass" | "Needs Remediation" | "Critical Fail",
          "issues": [
            { "severity": "High" | "Medium" | "Low", "description": "Issue description", "fix": "How to fix it" }
          ],
          "summary": "Brief summary of findings."
        }`;

        let response;
        if (a11yMode === 'image' && a11yImage) {
             response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: {
                    parts: [
                        { inlineData: { mimeType: 'image/png', data: a11yImage } },
                        { text: systemPrompt }
                    ]
                }
            });
        } else {
             response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `${systemPrompt}\n\nInput HTML:\n${a11yTextInput}`
            });
        }

        const text = response.text || "{}";
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const parsed = JSON.parse(cleanJson);
            setA11yResult(parsed);
        } catch (e) {
            setA11yError("Could not parse audit results.");
        }

    } catch (err: any) {
        console.error(err);
        setA11yError("Analysis failed. Please try again.");
    } finally {
        setIsA11yLoading(false);
    }
  };

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
        setObjError("Something went wrong.");
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
        setJargonError("Something went wrong.");
    } finally {
        setIsJargonLoading(false);
    }
  };

  const generateComplexityAnalysis = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!complexityInput.trim()) return;

      setIsComplexityLoading(true);
      setComplexityError('');
      setComplexityResult(null);

      try {
          const apiKey = process.env.API_KEY;
          if (!apiKey) throw new Error("System Error: API Key missing.");

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `Act as a Literacy Specialist and Editor. Analyze the following text.
          
          Input: "${complexityInput}"
          
          Return ONLY a raw JSON object with this structure: 
          { 
            "gradeLevel": "e.g. 12th Grade (Complex)", 
            "score": 45, // 0-100 scale where 100 is easiest
            "wordCount": 150,
            "suggestions": ["suggestion 1", "suggestion 2"],
            "simplifiedVersion": "A completely rewritten, simpler version of the input."
          }
          No markdown.`;

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt
          });

          const text = response.text || "{}";
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

          try {
              const parsed = JSON.parse(cleanJson);
              setComplexityResult(parsed);
          } catch (e) {
              setComplexityError("Could not analyze text structure.");
          }

      } catch (err: any) {
          setComplexityError("Something went wrong.");
      } finally {
          setIsComplexityLoading(false);
      }
  };

  const generateFeedbackAnalysis = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!feedbackInput.trim()) return;

      setIsFeedbackLoading(true);
      setFeedbackError('');
      setFeedbackResult(null);

      try {
          const apiKey = process.env.API_KEY;
          if (!apiKey) throw new Error("System Error: API Key missing.");

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `Act as a Lead L&D Data Analyst. Analyze the following learner feedback.
          
          Input: "${feedbackInput}"
          
          Return ONLY a raw JSON object with this structure: 
          { 
            "sentiment": "Positive" | "Neutral" | "Negative", 
            "keyIssues": ["issue 1", "issue 2"], 
            "suggestedActions": ["action 1", "action 2"] 
          }
          No markdown.`;

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt
          });

          const text = response.text || "{}";
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

          try {
              const parsed = JSON.parse(cleanJson);
              setFeedbackResult(parsed);
          } catch (e) {
              setFeedbackError("Could not analyze feedback format.");
          }

      } catch (err: any) {
          setFeedbackError("Something went wrong.");
      } finally {
          setIsFeedbackLoading(false);
      }
  };

  const generateChunker = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!chunkerInput.trim()) return;

      setIsChunkerLoading(true);
      setChunkerError('');
      setChunkerResult([]);

      try {
          const apiKey = process.env.API_KEY;
          if (!apiKey) throw new Error("System Error: API Key missing.");

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `Act as an Expert Instructional Designer specializing in Microlearning.
          
          Task: Break the following raw source text into 3-4 distinct microlearning modules.
          Input Text: "${chunkerInput}"
          
          Return ONLY a raw JSON array of objects. No markdown.
          Structure:
          [
            {
                "title": "Module Title",
                "duration": "2 min",
                "interactionIdea": "Drag and Drop sorting activity",
                "keyTakeaway": "One sentence summary"
            }
          ]`;

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt
          });

          const text = response.text || "[]";
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

          try {
              const parsed = JSON.parse(cleanJson);
              setChunkerResult(parsed);
          } catch (e) {
              setChunkerError("Could not parse chunking structure.");
          }

      } catch (err: any) {
          setChunkerError("Something went wrong.");
      } finally {
          setIsChunkerLoading(false);
      }
  };

  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoiInputs(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
    }));
  };

  const tabs = [
      { id: 'objectives', icon: Target, label: 'ID Generator' },
      { id: 'complexity', icon: Scale, label: 'Complexity Analyzer' },
      { id: 'jargon', icon: Languages, label: 'Clarity Engine' },
      { id: 'a11y', icon: Eye, label: 'Accessibility Audit' },
      { id: 'walkme', icon: MousePointerClick, label: 'WalkMe Simulator' },
      { id: 'chunker', icon: Split, label: 'Smart Chunker' },
      { id: 'roi', icon: Calculator, label: 'ROI Calc' },
      { id: 'feedback', icon: MessageSquare, label: 'Feedback AI' },
  ];

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
                I build tools that leverage <strong>Generative AI</strong> and <strong>Code</strong> to automate the heavy lifting in L&D. Switch between the demos below to see how I bridge the gap between Instructional Design, Full-Stack Dev, and Business Strategy.
            </p>
        </div>

        {/* Tabs - Accessible Role */}
        <div 
            role="tablist" 
            aria-label="Interactive Demo Selection"
            className="flex gap-6 border-b border-neutral-800 mb-8 overflow-x-auto no-scrollbar pb-1"
        >
            {tabs.map((tab) => (
                <button 
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-t ${activeTab === tab.id ? 'text-lime-400' : 'text-neutral-500 hover:text-white'}`}
                >
                    <tab.icon size={16} /> {tab.label}
                    {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />}
                </button>
            ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start min-h-[450px]">
            {/* Input Side - Accessible Panels */}
            <div className="relative">
            <AnimatePresence mode="wait">
                {activeTab === 'objectives' && (
                    <motion.div 
                        role="tabpanel"
                        id="objectives-panel"
                        aria-labelledby="objectives-tab"
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
                            <label htmlFor="topic-input" className="sr-only">Topic</label>
                            <input 
                                id="topic-input"
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

                {/* New: Accessibility Audit */}
                {activeTab === 'a11y' && (
                    <motion.div 
                        role="tabpanel"
                        id="a11y-panel"
                        aria-labelledby="a11y-tab"
                        key="a11y-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Accessibility Audit Tool</h3>
                             <p className="text-neutral-400 text-sm">Upload a screenshot or paste HTML to audit for WCAG compliance. Demonstrates <strong>Inclusive Design</strong> and <strong>Multimodal AI</strong>.</p>
                        </div>
                        
                        <div className="flex gap-4 mb-4">
                            <button 
                                onClick={() => { setA11yMode('text'); setA11yImage(null); }}
                                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-widest border transition-colors ${a11yMode === 'text' ? 'bg-lime-400 text-black border-lime-400' : 'text-neutral-400 border-neutral-700 hover:border-neutral-500'}`}
                            >
                                Paste Code
                            </button>
                            <button 
                                onClick={() => { setA11yMode('image'); setA11yTextInput(''); }}
                                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-widest border transition-colors ${a11yMode === 'image' ? 'bg-lime-400 text-black border-lime-400' : 'text-neutral-400 border-neutral-700 hover:border-neutral-500'}`}
                            >
                                Upload UI
                            </button>
                        </div>

                         <form onSubmit={generateA11yAudit} className="flex flex-col gap-4">
                            {a11yMode === 'text' ? (
                                <textarea 
                                    value={a11yTextInput}
                                    onChange={(e) => setA11yTextInput(e.target.value)}
                                    placeholder="<button>Click me</button> (Paste HTML snippet here...)"
                                    className="w-full h-40 bg-neutral-950 border border-neutral-700 text-white rounded-lg p-4 focus:border-lime-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-600 font-mono text-xs"
                                    aria-label="HTML Input"
                                />
                            ) : (
                                <div 
                                    className="w-full h-40 bg-neutral-950 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-lime-400 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden" 
                                        aria-label="Upload Screenshot"
                                    />
                                    {a11yImage ? (
                                        <div className="relative w-full h-full p-2">
                                            <img src={`data:image/png;base64,${a11yImage}`} alt="Preview" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs font-bold">Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="text-neutral-500 mb-2" />
                                            <p className="text-neutral-500 text-xs font-bold uppercase">Click to Upload Screenshot</p>
                                        </>
                                    )}
                                </div>
                            )}
                            <button 
                                type="submit" 
                                disabled={isA11yLoading || (a11yMode === 'text' ? !a11yTextInput : !a11yImage)}
                                className="self-start bg-lime-400 text-black px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isA11yLoading ? <Loader2 size={16} className="animate-spin" /> : <>Run Audit <Eye size={16} /></>}
                            </button>
                        </form>
                        {a11yError && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {a11yError}</p>}
                    </motion.div>
                )}

                {/* New: WalkMe Simulator */}
                {activeTab === 'walkme' && (
                    <motion.div 
                        role="tabpanel"
                        id="walkme-panel"
                        aria-labelledby="walkme-tab"
                        key="walkme-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                         <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">WalkMe Simulator</h3>
                             <p className="text-neutral-400 text-sm">A fully interactive "Smart Walkthrough" built in React. Demonstrates my ability to create <strong>Digital Adoption</strong> guidance overlays manually or via tools like WalkMe/Pendo.</p>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-700 p-6 rounded-lg text-center">
                            <MousePointerClick size={48} className="mx-auto mb-4 text-lime-400" />
                            <p className="text-white font-bold mb-2">Interactive Demo Ready</p>
                            <p className="text-neutral-400 text-xs mb-6">Click the button below to launch the simulation in the preview window.</p>
                            <button 
                                onClick={() => setWalkMeStep(1)}
                                className="bg-lime-400 text-black px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 transition-colors"
                            >
                                {walkMeStep === 0 ? "Start Walkthrough" : "Restart Demo"}
                            </button>
                        </div>
                    </motion.div>
                )}

                 {activeTab === 'complexity' && (
                    <motion.div 
                        role="tabpanel"
                        id="complexity-panel"
                        aria-labelledby="complexity-tab"
                        key="complexity-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Content Complexity Analyzer</h3>
                             <p className="text-neutral-400 text-sm">Paste a paragraph, and I'll analyze its grade level and simplify it. Demonstrates <strong>Accessibility</strong> and <strong>Translation of Complex Topics</strong>.</p>
                        </div>
                         <form onSubmit={generateComplexityAnalysis} className="flex flex-col gap-4">
                            <textarea 
                                value={complexityInput}
                                onChange={(e) => setComplexityInput(e.target.value)}
                                placeholder="Paste dense text here..."
                                className="w-full h-40 bg-neutral-950 border border-neutral-700 text-white rounded-lg p-4 focus:border-lime-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-600"
                                aria-label="Dense Text"
                            />
                            <button 
                                type="submit" 
                                disabled={isComplexityLoading || !complexityInput.trim()}
                                className="self-start bg-lime-400 text-black px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isComplexityLoading ? <Loader2 size={16} className="animate-spin" /> : <>Analyze <Scale size={16} /></>}
                            </button>
                        </form>
                        {complexityError && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {complexityError}</p>}
                    </motion.div>
                )}

                {activeTab === 'chunker' && (
                    <motion.div 
                        role="tabpanel"
                        id="chunker-panel"
                        aria-labelledby="chunker-tab"
                        key="chunker-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Smart Content Chunker</h3>
                             <p className="text-neutral-400 text-sm">Paste long-form content, and I'll segment it into microlearning modules with interaction ideas. Demonstrates <strong>Content Strategy</strong> and <strong>Automated Design</strong>.</p>
                        </div>
                         <form onSubmit={generateChunker} className="flex flex-col gap-4">
                            <textarea 
                                value={chunkerInput}
                                onChange={(e) => setChunkerInput(e.target.value)}
                                placeholder="Paste a long SOP, product manual, or policy document here..."
                                className="w-full h-40 bg-neutral-950 border border-neutral-700 text-white rounded-lg p-4 focus:border-lime-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-600"
                                aria-label="Long Form Content"
                            />
                            <button 
                                type="submit" 
                                disabled={isChunkerLoading || !chunkerInput.trim()}
                                className="self-start bg-lime-400 text-black px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isChunkerLoading ? <Loader2 size={16} className="animate-spin" /> : <>Chunk Content <Split size={16} /></>}
                            </button>
                        </form>
                        {chunkerError && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {chunkerError}</p>}
                    </motion.div>
                )}

                {activeTab === 'jargon' && (
                    <motion.div 
                        role="tabpanel"
                        id="jargon-panel"
                        aria-labelledby="jargon-tab"
                        key="jargon-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.3 }}
                    >
                         <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Clarity Engine (Jargon Buster)</h3>
                             <p className="text-neutral-400 text-sm">Translating L&D-speak into plain language—because clarity is a skill. Demonstrates <strong>NLP</strong> and <strong>Communication Skills</strong>.</p>
                        </div>
                        <form onSubmit={generateJargonBuster} className="flex flex-col gap-4">
                            <textarea 
                                value={jargonInput}
                                onChange={(e) => setJargonInput(e.target.value)}
                                placeholder="Paste text like: 'We need to refactor the monolithic architecture to microservices to reduce technical debt...'"
                                className="w-full h-40 bg-neutral-950 border border-neutral-700 text-white rounded-lg p-4 focus:border-lime-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-600"
                                aria-label="Complex Text"
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
                        role="tabpanel"
                        id="roi-panel"
                        aria-labelledby="roi-tab"
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

                 {activeTab === 'feedback' && (
                    <motion.div 
                        role="tabpanel"
                        id="feedback-panel"
                        aria-labelledby="feedback-tab"
                        key="feedback-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.3 }}
                    >
                         <div className="mb-6">
                             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Feedback Analyzer</h3>
                             <p className="text-neutral-400 text-sm">Paste learner feedback, and I'll extract sentiment and action items. Demonstrates <strong>Automation</strong> and <strong>Data Analysis</strong>.</p>
                        </div>
                        <form onSubmit={generateFeedbackAnalysis} className="flex flex-col gap-4">
                            <textarea 
                                value={feedbackInput}
                                onChange={(e) => setFeedbackInput(e.target.value)}
                                placeholder="e.g. 'The simulation was great, but the quiz questions were confusing and I couldn't find the resource link...'"
                                className="w-full h-40 bg-neutral-950 border border-neutral-700 text-white rounded-lg p-4 focus:border-lime-400 focus:outline-none transition-colors resize-none placeholder:text-neutral-600"
                                aria-label="Learner Feedback"
                            />
                            <button 
                                type="submit" 
                                disabled={isFeedbackLoading || !feedbackInput.trim()}
                                className="self-start bg-lime-400 text-black px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isFeedbackLoading ? <Loader2 size={16} className="animate-spin" /> : <>Analyze <ArrowRight size={16} /></>}
                            </button>
                        </form>
                         {feedbackError && <p className="text-red-400 text-sm mt-3 flex items-center gap-2"><BrainCircuit size={14}/> {feedbackError}</p>}
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

                 {/* New: A11y Results */}
                 {activeTab === 'a11y' && (
                    <>
                         {!isA11yLoading && !a11yResult && !a11yError && (
                            <div className="text-center text-neutral-600">
                                <Eye size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="uppercase tracking-widest text-sm">Waiting for code or screenshot...</p>
                            </div>
                        )}
                        {isA11yLoading && (
                             <div className="space-y-4">
                                <div className="h-8 bg-neutral-800 rounded w-1/3 animate-pulse"></div>
                                <div className="h-20 bg-neutral-800 rounded w-full animate-pulse"></div>
                                <div className="h-40 bg-neutral-800 rounded w-full animate-pulse"></div>
                            </div>
                        )}
                        {a11yResult && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                             >
                                <div className="flex justify-between items-center bg-neutral-900 p-4 rounded border border-neutral-800">
                                    <div className={`px-4 py-2 rounded font-bold uppercase tracking-widest text-sm ${
                                        a11yResult.score >= 90 ? 'bg-lime-400 text-black' : 
                                        a11yResult.score >= 70 ? 'bg-yellow-500 text-black' : 
                                        'bg-red-500 text-white'
                                    }`}>
                                        {a11yResult.status}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-neutral-500 uppercase font-bold">WCAG Score</p>
                                        <p className="text-3xl font-mono font-bold text-white">
                                            {a11yResult.score}/100
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-neutral-400 text-sm leading-relaxed border-l-2 border-neutral-700 pl-4">
                                    {a11yResult.summary}
                                </p>

                                <div>
                                     <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                                        <AlertTriangle size={14} className="text-neutral-500"/> Detected Issues
                                     </h4>
                                     <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                         {a11yResult.issues.map((issue: any, i: number) => (
                                             <div key={i} className="bg-neutral-900 p-3 rounded border border-neutral-800">
                                                 <div className="flex justify-between items-start mb-1">
                                                     <span className="text-neutral-200 text-sm font-bold">{issue.description}</span>
                                                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                                         issue.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-500'
                                                     }`}>
                                                         {issue.severity}
                                                     </span>
                                                 </div>
                                                 <p className="text-neutral-500 text-xs mt-2"><strong className="text-lime-400">Fix:</strong> {issue.fix}</p>
                                             </div>
                                         ))}
                                     </div>
                                </div>
                             </motion.div>
                        )}
                    </>
                 )}

                 {/* New: WalkMe Simulator Results */}
                 {activeTab === 'walkme' && (
                     <div className="relative h-full min-h-[400px] bg-white rounded-lg overflow-hidden flex flex-col">
                         {walkMeStep === 0 ? (
                             <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 p-8">
                                 <MousePointerClick size={48} className="mb-4 opacity-20" />
                                 <p className="uppercase tracking-widest text-sm text-center text-neutral-500">Preview Area</p>
                             </div>
                         ) : (
                             // Mock Dashboard
                             <div className="flex-1 bg-neutral-100 p-4 relative text-neutral-800 font-sans">
                                 {/* Mock Nav */}
                                 <div className="flex justify-between items-center mb-6 bg-white p-3 rounded shadow-sm">
                                     <div className="font-bold text-lg text-blue-600">LMS Admin</div>
                                     <div className="flex gap-4 text-xs text-neutral-500">
                                         <span>Dashboard</span>
                                         <span>Users</span>
                                         <span className="font-bold text-neutral-900">Reports</span>
                                     </div>
                                 </div>

                                 {/* Mock Grid */}
                                 <div className="grid grid-cols-2 gap-4">
                                     {/* Widget 1 */}
                                     <div id="wm-widget-1" className="bg-white p-4 rounded shadow-sm h-32 relative">
                                         <div className="text-xs font-bold text-neutral-400 uppercase mb-2">Active Learners</div>
                                         <div className="text-3xl font-bold text-neutral-800">1,240</div>
                                         
                                         {/* Tooltip Step 1 */}
                                         {walkMeStep === 1 && (
                                             <motion.div 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute -right-2 top-8 z-50 w-64 bg-blue-600 text-white p-4 rounded-lg shadow-xl"
                                             >
                                                 <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-600 rotate-45"></div>
                                                 <h5 className="font-bold mb-1 text-sm">Track Engagement</h5>
                                                 <p className="text-xs mb-3 opacity-90">View real-time active users here.</p>
                                                 <button onClick={() => setWalkMeStep(2)} className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-bold">Next</button>
                                             </motion.div>
                                         )}
                                     </div>

                                     {/* Widget 2 */}
                                     <div className="bg-white p-4 rounded shadow-sm h-32">
                                         <div className="text-xs font-bold text-neutral-400 uppercase mb-2">Completions</div>
                                         <div className="text-3xl font-bold text-neutral-800">85%</div>
                                     </div>
                                 </div>

                                 {/* Bottom Action Area */}
                                 <div className="mt-4 flex justify-end">
                                     <button id="wm-button-export" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold relative">
                                         Export Data
                                         
                                         {/* Tooltip Step 2 */}
                                         {walkMeStep === 2 && (
                                             <motion.div 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute bottom-full right-0 mb-3 z-50 w-64 bg-blue-600 text-white p-4 rounded-lg shadow-xl text-left"
                                             >
                                                 <div className="absolute bottom-[-6px] right-6 w-4 h-4 bg-blue-600 rotate-45"></div>
                                                 <h5 className="font-bold mb-1 text-sm">Download Reports</h5>
                                                 <p className="text-xs mb-3 opacity-90">Click here to export your quarterly analytics.</p>
                                                 <button onClick={() => setWalkMeStep(3)} className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-bold">Finish</button>
                                             </motion.div>
                                         )}
                                     </button>
                                 </div>

                                 {/* Success Overlay */}
                                 {walkMeStep === 3 && (
                                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
                                         <motion.div 
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="bg-white p-8 rounded-lg text-center"
                                         >
                                             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                 <Check size={32} />
                                             </div>
                                             <h4 className="font-bold text-xl mb-2">Flow Completed!</h4>
                                             <p className="text-sm text-neutral-600 mb-6">You've successfully built a guide.</p>
                                             <button onClick={() => setWalkMeStep(0)} className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase">Restart</button>
                                         </motion.div>
                                     </div>
                                 )}
                             </div>
                         )}
                     </div>
                 )}

                  {/* Complexity Results */}
                 {activeTab === 'complexity' && (
                    <>
                        {!isComplexityLoading && !complexityResult && !complexityError && (
                            <div className="text-center text-neutral-600">
                                <Scale size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="uppercase tracking-widest text-sm">Waiting for analysis...</p>
                            </div>
                        )}
                        {isComplexityLoading && (
                             <div className="space-y-4">
                                <div className="h-8 bg-neutral-800 rounded w-1/2 animate-pulse"></div>
                                <div className="h-24 bg-neutral-800 rounded w-full animate-pulse"></div>
                            </div>
                        )}
                        {complexityResult && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                             >
                                <div className="flex justify-between items-center bg-neutral-900 p-4 rounded border border-neutral-800">
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase font-bold">Grade Level</p>
                                        <p className="text-xl font-bold text-white">{complexityResult.gradeLevel}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-neutral-500 uppercase font-bold">Readability Score</p>
                                        <p className={`text-2xl font-mono font-bold ${complexityResult.score > 60 ? 'text-lime-400' : 'text-yellow-500'}`}>
                                            {complexityResult.score}/100
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-lime-400"/> Simplified Version
                                    </h4>
                                    <div className="bg-neutral-900 p-4 rounded border-l-2 border-lime-400">
                                        <p className="text-neutral-200 text-sm leading-relaxed">{complexityResult.simplifiedVersion}</p>
                                    </div>
                                </div>
                                
                                <div>
                                     <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-2">Suggestions</h4>
                                     <ul className="list-disc list-inside text-neutral-400 text-xs space-y-1">
                                         {complexityResult.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                     </ul>
                                </div>
                             </motion.div>
                        )}
                     </>
                 )}

                 {/* Chunker Results */}
                 {activeTab === 'chunker' && (
                    <>
                        {!isChunkerLoading && chunkerResult.length === 0 && !chunkerError && (
                            <div className="text-center text-neutral-600">
                                <Layers size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="uppercase tracking-widest text-sm">Waiting for content...</p>
                            </div>
                        )}
                        {isChunkerLoading && (
                             <div className="space-y-4">
                                <div className="h-24 bg-neutral-800 rounded w-full animate-pulse"></div>
                                <div className="h-24 bg-neutral-800 rounded w-full animate-pulse"></div>
                            </div>
                        )}
                        {chunkerResult.length > 0 && (
                             <div className="space-y-6">
                                <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
                                    <Split size={14} className="text-lime-400"/> Microlearning Structure
                                </h4>
                                {chunkerResult.map((module, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-neutral-900 p-4 rounded border-l-2 border-lime-400"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-bold text-white text-sm">{module.title}</h5>
                                            <span className="text-xs bg-lime-400/10 text-lime-400 px-2 py-1 rounded font-mono">{module.duration}</span>
                                        </div>
                                        <p className="text-neutral-400 text-xs mb-2"><strong>Goal:</strong> {module.keyTakeaway}</p>
                                        <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-950 p-2 rounded">
                                            <Sparkles size={12} className="text-yellow-500" />
                                            <span>{module.interactionIdea}</span>
                                        </div>
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

                 {/* Feedback Results */}
                 {activeTab === 'feedback' && (
                     <>
                        {!isFeedbackLoading && !feedbackResult && !feedbackError && (
                            <div className="text-center text-neutral-600">
                                <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="uppercase tracking-widest text-sm">Waiting for feedback...</p>
                            </div>
                        )}
                        {isFeedbackLoading && (
                             <div className="space-y-4">
                                <div className="h-4 bg-neutral-800 rounded w-1/3 animate-pulse"></div>
                                <div className="h-20 bg-neutral-800 rounded w-full animate-pulse"></div>
                                <div className="h-20 bg-neutral-800 rounded w-full animate-pulse"></div>
                            </div>
                        )}
                        {feedbackResult && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                             >
                                <div className="flex items-center gap-4">
                                    <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                                        feedbackResult.sentiment === 'Positive' ? 'bg-lime-400 text-black' : 
                                        feedbackResult.sentiment === 'Negative' ? 'bg-red-500 text-white' : 
                                        'bg-neutral-600 text-white'
                                    }`}>
                                        {feedbackResult.sentiment}
                                    </div>
                                    <span className="text-neutral-500 text-xs font-mono">Sentiment Detected</span>
                                </div>

                                <div>
                                    <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                                        <AlertTriangle size={14} className="text-yellow-500"/> Key Issues
                                    </h4>
                                    <ul className="space-y-2">
                                        {feedbackResult.keyIssues.map((issue: string, i: number) => (
                                            <li key={i} className="text-neutral-300 text-sm bg-neutral-900 p-2 rounded border-l-2 border-yellow-500">{issue}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                                        <Lightbulb size={14} className="text-lime-400"/> Suggested Actions
                                    </h4>
                                     <ul className="space-y-2">
                                        {feedbackResult.suggestedActions.map((action: string, i: number) => (
                                            <li key={i} className="text-neutral-300 text-sm bg-neutral-900 p-2 rounded border-l-2 border-lime-400">{action}</li>
                                        ))}
                                    </ul>
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