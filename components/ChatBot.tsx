import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { PROJECTS, EXPERIENCE, SERVICES, SOCIAL_LINKS } from '../constants';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize types for messages
type Message = {
  role: 'user' | 'model';
  text: string;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Maxwell's AI Assistant. I can tell you how he bridges the gap between Instructional Design and Software Engineering. Ask me anything!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a ref to persist the chat session across renders without re-initializing
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const getChatSession = () => {
    if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Construct context from portfolio data
        const contextData = {
            projects: PROJECTS,
            experience: EXPERIENCE,
            services: SERVICES,
            socials: SOCIAL_LINKS
        };

        const systemInstruction = `You are the AI portfolio assistant for Maxwell Dziku, a specialized Learning Engineer & Automation Architect.
        
        Your Core Persona:
        You represent a unique convergence of three disciplines:
        1. Instructional Design (Adult learning theory, ADDIE, Bloom's Taxonomy)
        2. Full-Stack Web Development (React, Node.js, Next.js, TypeScript)
        3. Workflow Automation (Python, Zapier, APIs, AI Agents)

        Your goal is to answer visitor questions using the provided JSON data: ${JSON.stringify(contextData)}.

        Communication Guidelines:
        - **The Hybrid Edge**: When asked about Maxwell's skills, emphasize that he doesn't just design courses—he builds the engines that run them. He moves beyond "click-next" eLearning to create immersive web apps and automated learning ecosystems.
        - **Project Context**: When discussing projects like 'AI Training Coach' or 'Gamified ID Portfolio', highlight them as proof of this hybrid skillset.
        - **Tone**: Professional, innovative, and concise (keep answers under 4 sentences unless asked for depth).
        - **Contact**: If specific availability or rates are requested, guide them to the 'Contact' section.
        - **Unknowns**: If the data doesn't contain the answer, politely suggest contacting Maxwell directly. Do not make up information.
        `;

        chatSessionRef.current = ai.chats.create({
            model: 'gemini-3-pro-preview',
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }
    return chatSessionRef.current;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = getChatSession();
      const response = await chat.sendMessage({
        message: userMessage,
      });

      const text = response.text || "I'm sorry, I couldn't process that request right now.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error connecting to the AI. Please try again later." }]);
      // Reset session on error to clear potential bad state
      chatSessionRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.4)] text-black focus:outline-none focus:ring-4 focus:ring-white/50 ${isOpen && !isMinimized ? 'hidden' : 'flex'}`}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} fill="currentColor" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl flex flex-col overflow-hidden font-inter"
          >
            {/* Header */}
            <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                <h3 className="font-bold text-white font-syne uppercase tracking-wide">MaxAI Assistant</h3>
              </div>
              <div className="flex gap-2 text-neutral-400">
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="hover:text-white transition-colors p-1"
                  aria-label="Minimize"
                >
                    <Minimize2 size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                    <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50 backdrop-blur-sm">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-neutral-700 text-neutral-300' : 'bg-lime-400 text-black'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-neutral-800 text-white rounded-tr-none' 
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <motion.span 
                      className="w-1.5 h-1.5 bg-neutral-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span 
                      className="w-1.5 h-1.5 bg-neutral-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span 
                      className="w-1.5 h-1.5 bg-neutral-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="w-full bg-neutral-900 text-white rounded-full py-3 pl-4 pr-12 text-sm border border-neutral-800 focus:border-lime-400 focus:outline-none transition-colors placeholder:text-neutral-600"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-lime-400 text-black rounded-full hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="text-[10px] text-neutral-600 text-center mt-2 font-mono">
                Powered by Gemini 3 Pro
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;