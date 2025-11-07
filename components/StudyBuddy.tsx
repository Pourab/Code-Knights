
import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { askStudyBuddy } from '../services/geminiService';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const StudyBuddy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);
    setError(null);

    try {
      const modelResponse = await askStudyBuddy(prompt, messages);
      const modelMessage: ChatMessage = { role: 'model', content: modelResponse };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't get a response. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    return (
      <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white"><Icon name="robot" className="h-6 w-6" /></div>}
        <div className={`p-3 rounded-2xl max-w-sm md:max-w-md ${isUser ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        {isUser && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-white"><Icon name="user" className="h-6 w-6" /></div>}
      </div>
    );
  };


  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white rounded-full p-4 shadow-xl hover:bg-sky-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        aria-label="Open Study Buddy"
      >
        <Icon name="robot" className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right transform scale-100">
          <header className="flex items-center justify-between p-4 bg-sky-700 text-white rounded-t-2xl">
            <div className="flex items-center">
              <Icon name="robot" className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">AI Study Buddy</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-sky-600">
                <Icon name="close" className="h-6 w-6" />
            </button>
          </header>
          
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
             {messages.length === 0 && !isLoading && (
                 <div className="text-center text-slate-500 mt-8">
                    <p>Ask me anything about your studies!</p>
                    <p className="text-xs mt-2">e.g., "Explain photosynthesis" or "Help me with this calculus problem."</p>
                 </div>
             )}
            {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
            {isLoading && (
              <div className="flex items-start gap-3 my-4">
                 <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white"><Icon name="robot" className="h-6 w-6" /></div>
                 <div className="p-3 rounded-2xl bg-slate-200">
                   <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                       <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                       <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                   </div>
                 </div>
              </div>
            )}
             {error && <div className="text-center text-red-500 text-sm p-2 bg-red-100 rounded-md">{error}</div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
            <div className="flex items-center bg-slate-100 rounded-full">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 w-full p-3 bg-transparent border-none rounded-full focus:ring-0"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="p-3 text-white bg-sky-600 rounded-full m-1 hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading || !prompt.trim()}
              >
                <Icon name="send" className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default StudyBuddy;
