import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm Aasha, your wellness companion at Aashwashan. I'm here to listen and support you. How are you feeling today? 💚"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const res = await axios.post(`${API}/chatbot/new-session`);
        setSessionId(res.data.session_id);
      } catch (err) {
        console.error('Failed to create session:', err);
        setSessionId(`local-${Date.now()}`);
      }
    };

    if (isOpen && !sessionId) {
      initSession();
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chatbot/chat`, {
        message: inputValue,
        session_id: sessionId
      });
      const botMessage = { id: Date.now() + 1, type: 'bot', text: response.data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, type: 'bot', text: "I'm sorry, I'm having trouble connecting. Please try again. 💙" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
        data-testid="chatbot-toggle"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
        isMinimized ? 'w-72 h-14' : 'w-80 h-[420px]'
      }`}
      data-testid="chatbot-window"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Aasha</h3>
            <p className="text-[10px] text-teal-100">Wellness Companion</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5 text-white" /> : <Minimize2 className="w-3.5 h-3.5 text-white" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto h-[310px] bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2.5 rounded-xl text-sm ${
                  message.type === 'user'
                    ? 'bg-teal-500 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm'
                }`}>
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-gray-200 p-2.5 rounded-xl rounded-bl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2.5 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type here..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                disabled={isLoading}
                data-testid="chatbot-input"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-all disabled:opacity-50"
                data-testid="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
