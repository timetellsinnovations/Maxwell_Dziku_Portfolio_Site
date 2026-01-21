import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { PROJECTS, EXPERIENCE, SERVICES, SOCIAL_LINKS } from '../constants';
import { MessageCircle, X, Send, Bot, User, Minimize2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Maxwell's AI Assistant. I'm here to showcase his unique hybrid expertise in **Instructional Design**, **Full-Stack Development**, and **Automation**. Ask me how he builds scalable learning ecosystems or about his specific technical skills!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const getChatSession = () => {
    if (!chatSessionRef.current) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("API Key missing.");

        const ai = new GoogleGenAI({ apiKey });
        const contextData = { projects: PROJECTS, experience: EXPERIENCE, services: SERVICES, socials: SOCIAL_LINKS };

        const systemInstruction = `You are the professional AI representative for Maxwell Dziku.
        
        **Your Goal:** Convince recruiters, hiring managers, and potential clients that Maxwell is a "Unicorn" hire—bridging the gap between a Senior Instructional Designer and a Full-Stack Developer.

        **Core Message & Tone:**
        - **Professional, confident, and concise.** (Max 3 sentences per reply unless asked for details).
        - **Value Proposition:** Maxwell doesn't just design content; he builds scalable "Learning Engines" and automated ecosystems. He solves technical blockers that L&D teams usually outsource.
        - **Keywords for HR:** Use terms like "ROI," "Scalability," "End-to-End Development," "xAPI Data Strategy," "Workflow Automation," and "Cross-functional Leadership."

        **Context Data:**
        ${JSON.stringify(contextData)}

        **Handling Specifics:**
        - If asked about **rates/availability**: "Maxwell is open to discussing select opportunities. Please use the contact form or LinkedIn to connect directly."
        - If asked about **tools**: List both ID tools (Storyline, Camtasia) AND Dev tools (React, Python, Node.js).
        - If asked a technical question: Answer briefly to demonstrate competence.
        `;

        chatSessionRef.current = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: { systemInstruction },
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
      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "I'm having trouble retrieving that information.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMsg = "I'm having trouble connecting to the server.";
      
      // User-friendly Error Handling
      if (error.message?.includes("429")) {
          errorMsg = "I'm currently experiencing high traffic (Quota Exceeded). Please give me about 30 seconds to catch my breath and try again.";
      } else if (error.message?.includes("API Key")) {
          errorMsg = "My configuration seems to be missing an API Key. Please tell Maxwell!";
      }
      
      setMessages(prev => [...prev, { role: 'model', text: errorMsg, isError: true }]);
      chatSessionRef.current = null; // Reset session to force reconnect on next try
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className={`fixed bottom-6 right-6 z-[999] w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center shadow-xl text-black transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-lime-400/50 ${isOpen && !isMinimized ? 'hidden' : 'flex'}`}
        aria-label="Open AI Chat"
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[999] w-[90vw] md:w-[400px] h-[550px] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-lime-400"></div>
                    <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div>
                    <h3 className="font-bold text-white uppercase text-xs tracking-widest">MaxAI Assistant</h3>
                    <p className="text-[10px] text-neutral-500 font-mono">Powered by Gemini 3 Flash</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsMinimized(true)} className="text-neutral-400 hover:text-white p-1"><Minimize2 size={16} /></button>
                <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white p-1"><X size={16} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-neutral-700' : msg.isError ? 'bg-red-500' : 'bg-lime-400 text-black'}`}>
                    {msg.role === 'user' ? <User size={16} /> : msg.isError ? <AlertCircle size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-neutral-800 text-white rounded-tr-none' 
                      : msg.isError 
                        ? 'bg-red-900/20 border border-red-500/30 text-red-200 rounded-tl-none' 
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-tl-none'
                  }`}>
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
                    <div className="bg-neutral-950 border border-neutral-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1 h-[44px]">
                        <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="w-full bg-neutral-900 text-white rounded-full py-3 pl-4 pr-12 text-sm border border-neutral-800 focus:border-lime-400 focus:outline-none transition-colors"
                />
                <button type="submit" disabled={!inputValue.trim() || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-lime-400 text-black rounded-full disabled:opacity-50 hover:bg-lime-300 transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;