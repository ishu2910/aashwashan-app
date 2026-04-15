import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import api from "../api";

const API = "/api";

// Saathi icon - Chat bubble with soft curve design
const SaathiIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft gradient background */}
    <circle cx="20" cy="20" r="18" fill="url(#saathiGradient)" />
    {/* Chat bubble shape with soft curves */}
    <path 
      d="M12 14C12 12.3431 13.3431 11 15 11H25C26.6569 11 28 12.3431 28 14V22C28 23.6569 26.6569 25 25 25H18L14 29V25H15C13.3431 25 12 23.6569 12 22V14Z" 
      fill="white"
    />
    {/* Three dots inside bubble */}
    <circle cx="16" cy="17.5" r="1.5" fill="url(#saathiGradient)" />
    <circle cx="20" cy="17.5" r="1.5" fill="url(#saathiGradient)" />
    <circle cx="24" cy="17.5" r="1.5" fill="url(#saathiGradient)" />
    <defs>
      <linearGradient id="saathiGradient" x1="2" y1="2" x2="38" y2="38">
        <stop stopColor="#14b8a6"/>
        <stop offset="0.5" stopColor="#0891b2"/>
        <stop offset="1" stopColor="#0d9488"/>
      </linearGradient>
    </defs>
  </svg>
);

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey, I'm Saathi - your companion. I'm here for you, whenever you need to talk. No judgment, just support. How are you feeling right now?",
      quickActions: [
        { label: "I'm feeling low", action: "I'm feeling low today and don't know why" },
        { label: "Just need to vent", action: "I just need someone to listen to me" },
        { label: "Feeling anxious", action: "I'm feeling anxious and overwhelmed" },
        { label: "Can't sleep well", action: "I've been having trouble sleeping lately" }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const res = await api.post(`${API}/chatbot/new-session`);
        setSessionId(res.data.session_id);
      } catch (err) {
        console.error('Failed to create session:', err);
        setSessionId(`local-${Date.now()}`);
      }
    };

    if (isOpen && !sessionId) {
      initSession();
    }
    
    // Auto-focus input when chat opens
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Keep focus on input after each message
    if (inputRef.current && isOpen && !isMinimized) {
      inputRef.current.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (messageText = inputValue) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setMessageCount(prev => prev + 1);

    try {
      const response = await api.post(`${API}/chatbot/chat`, {
        message: messageText,
        session_id: sessionId,
        message_count: messageCount + 1
      });
      
      const botResponse = response.data.response;
      
      // Check if bot is recommending therapy
      const suggestsTherapy = botResponse.toLowerCase().includes('therapist') || 
                              botResponse.toLowerCase().includes('professional') ||
                              botResponse.toLowerCase().includes('book a session');
      
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: botResponse,
        quickActions: suggestsTherapy 
          ? [
              { label: "Yes, book a session", action: "I'd like to book a therapy session" },
              { label: "Tell me more", action: "Tell me more about how therapy can help" }
            ]
          : null
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, type: 'bot', text: "I'm sorry, I'm having trouble connecting. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Keep focus on input
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action) => {
    handleSend(action);
  };

  const resetChat = () => {
    setSessionId(null);
    setMessages([{
      id: 1,
      type: 'bot',
      text: "Hey, I'm Saathi - your companion. I'm here for you, whenever you need to talk. No judgment, just support. How are you feeling right now?",
      quickActions: [
        { label: "I'm feeling low", action: "I'm feeling low today and don't know why" },
        { label: "Just need to vent", action: "I just need someone to listen to me" },
        { label: "Feeling anxious", action: "I'm feeling anxious and overwhelmed" },
        { label: "Can't sleep well", action: "I've been having trouble sleeping lately" }
      ]
    }]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-teal-400 group"
        data-testid="chatbot-toggle"
        title="Chat with Saathi"
      >
        <SaathiIcon className="w-10 h-10" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 animate-slide-up ${
        isMinimized ? 'w-72 h-14' : 'w-80 sm:w-96 h-[480px]'
      }`}
      data-testid="chatbot-window"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <SaathiIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Saathi</h3>
            <p className="text-[10px] text-teal-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online • Your Companion
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={resetChat} 
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" 
            title="New conversation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-white" />
          </button>
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
          <div className="flex-1 p-3 overflow-y-auto h-[360px] bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className="flex flex-col max-w-[85%]">
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <SaathiIcon className="w-5 h-5" />
                      <span className="text-xs text-gray-500 font-medium">Saathi</span>
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  {/* Quick action buttons */}
                  {message.type === 'bot' && message.quickActions && message.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(qa.action)}
                          className="text-xs px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors hover:scale-105"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3 animate-fade-in">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <SaathiIcon className="w-5 h-5" />
                    <span className="text-xs text-gray-500 font-medium">Saathi is typing...</span>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm bg-gray-50 transition-all"
                disabled={isLoading}
                autoFocus
                data-testid="chatbot-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                data-testid="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Saathi is here to support, not replace professional help
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
