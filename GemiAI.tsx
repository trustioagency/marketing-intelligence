
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';
import { translations } from '../translations';
import { CubeTransparentIcon, PaperAirplaneIcon, SparklesIcon } from '../components/icons';

interface GemiAIProps {
    language: 'tr' | 'en';
}

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const GemiAI: React.FC<GemiAIProps> = ({ language }) => {
    const t = translations[language].pageContent.gemiAI;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<Chat | null>(null);

    // Initialize chat session on component mount
    useEffect(() => {
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a world-class senior marketing strategist and a helpful AI assistant named Gemi. Your answers should be insightful, strategic, and ready for a professional marketing context. Provide answers in markdown, using **bold** for emphasis. Always respond in the user's language.",
            },
        });
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = async (messageContent: string) => {
        if (!messageContent.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', content: messageContent };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: messageContent });
            
            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    const updatedLastMessage = { ...lastMessage, content: lastMessage.content + chunkText };
                    return [...prev.slice(0, -1), updatedLastMessage];
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: ChatMessage = {
                role: 'model',
                content: "An error occurred. Please try again.",
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
        setInput('');
    };
    
    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
        // We can optionally send the message directly
        // handleSendMessage(prompt);
    };

    const formatContent = (content: string) => {
        // Simple markdown for bold and newlines
        const bolded = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-100">$1</strong>');
        return bolded.replace(/\n/g, '<br />');
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <header className="text-center mb-6">
                <CubeTransparentIcon className="w-12 h-12 mx-auto text-sky-400 mb-4"/>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">{t.title}</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto text-lg">{t.description}</p>
            </header>
            
            <div className="flex-grow bg-slate-800/50 border border-slate-700 rounded-2xl flex flex-col shadow-inner overflow-hidden">
                <main className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-6">
                    {messages.length === 0 && !isLoading && (
                         <div className="text-center p-8 animate-fade-in">
                            <SparklesIcon className="w-10 h-10 mx-auto text-amber-300 mb-4"/>
                            <h3 className="text-lg font-semibold text-slate-200">Start a conversation</h3>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {t.prompt_starters.map((prompt: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePromptClick(prompt)}
                                        className="p-3 bg-slate-700/70 text-sm text-slate-300 rounded-lg text-left hover:bg-slate-700 transition-colors"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 shadow-md"><CubeTransparentIcon className="w-5 h-5 text-white"/></div>}
                            <div className={`max-w-[85%] p-3 rounded-xl shadow-md ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                <p className="text-sm selection:bg-sky-200 selection:text-sky-900" dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}></p>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                         <div className="flex gap-3 justify-start animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0"><CubeTransparentIcon className="w-5 h-5 text-white"/></div>
                            <div className="max-w-[80%] p-3 rounded-xl bg-slate-700 text-slate-200 rounded-bl-none flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.15s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.3s]"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>

                <footer className="p-4 border-t border-slate-700/80 bg-slate-800/80">
                    <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t.placeholder}
                            className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} className="bg-sky-600 text-white p-3 rounded-full hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-transform active:scale-95">
                            <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default GemiAI;
