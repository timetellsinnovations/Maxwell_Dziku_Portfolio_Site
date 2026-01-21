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
    { role: 'model', text: "Hi! I'm Maxwell's AI Assistant. Ask me how I bridge the gap between Instructional Design and Software Engineering." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasKey = typeof process !== 'undefined' && process.env && process.env.API_KEY;
    console.log("ChatBot mounted. API Key present:", !!hasKey);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const getChatSession = () => {
    if (!chatSessionRef.current) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("API Key missing. Check Vercel settings.");

        const ai = new GoogleGenAI({ apiKey });
        const contextData = { projects: PROJECTS, experience: EXPERIENCE, services: SERVICES, socials: SOCIAL_LINKS };

        const systemInstruction = `You are the AI portfolio assistant for Maxwell Dziku. 
        Maxwell is a hybrid Learning Engineer: part Instructional Designer, part Software Developer.
        Answer visitor questions based on this data: ${JSON.stringify(contextData)}.
        Emphasize that he builds "learning engines," not just slide decks. Keep answers brief (2-3 sentences).`;

        // MANDATORY: Use gemini-3-flash-preview for high quota limits
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
      const text = response.text || "I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMsg = error.message || "Connection failed";
      if (errorMsg.includes("429")) errorMsg = "Quota exceeded. Try again in a minute.";
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${errorMsg}`, isError: true }]);
      chatSessionRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className={`fixed bottom-6 right-6 z-[999] w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center shadow-xl text-black transition-transform hover:scale-110 ${isOpen && !isMinimized ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-[999] w-[90vw] md:w-[400px] h-[500px] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                <h3 className="font-bold text-white uppercase text-xs tracking-widest">MaxAI Assistant</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsMinimized(true)} className="text-neutral-400 hover:text-white"><Minimize2 size={16} /></button>
                <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white"><X size={16} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-neutral-700' : msg.isError ? 'bg-red-500' : 'bg-lime-400 text-black'}`}>
                    {msg.role === 'user' ? <User size={16} /> : msg.isError ? <AlertCircle size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-neutral-800 text-white' : msg.isError ? 'bg-red-900/20 text-red-200' : 'bg-neutral-950 text-neutral-300'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-neutral-500 text-xs italic ml-11">Typing...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-neutral-950 border-t border-neutral-800">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-neutral-900 text-white rounded-full py-3 pl-4 pr-12 text-sm border border-neutral-800 focus:border-lime-400 focus:outline-none"
                />
                <button type="submit" disabled={!inputValue.trim() || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-lime-400 text-black rounded-full disabled:opacity-50">
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