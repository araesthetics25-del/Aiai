
import React, { useState, useRef, useEffect } from 'react';
import { Message, Persona, PersonaType } from '../types';
import { PERSONAS, MOCK_SITE_INFO } from '../constants';
import { geminiService } from '../services/geminiService';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hi there! I'm your Nexus Cloud assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when persona changes or on mount
  useEffect(() => {
    const fullPrompt = `${activePersona.systemPrompt}\n\nCONTEXT ABOUT THIS WEBSITE:\n${MOCK_SITE_INFO}`;
    geminiService.initChat(fullPrompt);
  }, [activePersona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const stream = geminiService.sendMessageStream(input);
      let assistantContent = '';
      
      const assistantMessage: Message = {
        role: 'model',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      for await (const chunk of stream) {
        assistantContent += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantContent;
          return updated;
        });
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const changePersona = (persona: Persona) => {
    setActivePersona(persona);
    setMessages([
      {
        role: 'model',
        content: `Persona changed to: ${persona.name}. How can I assist you now?`,
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:right-8 w-[92vw] sm:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white/20">
            <i className={`fa-solid ${activePersona.icon} text-lg`}></i>
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">{activePersona.name}</h3>
            <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold">Nexus Online</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Persona Switcher */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 overflow-x-auto no-scrollbar">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => changePersona(p)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePersona.id === p.id 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <i className={`fa-solid ${p.icon} mr-1.5`}></i>
            {p.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 chat-height">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
            }`}>
              {m.content || (isTyping && idx === messages.length - 1 ? (
                <div className="flex gap-1 py-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              ) : null)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="w-full bg-slate-100 border-none rounded-full py-3 pl-5 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute right-1.5 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !isTyping ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          Powered by Gemini 3 Flash &middot; Professional AI Context
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
