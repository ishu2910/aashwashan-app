import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Custom Aasha logo component - warm heart-based wellness icon
const AashaIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="url(#aashaGradient)" />
    {/* Heart shape */}
    <path d="M20 28C20 28 12 22 12 16C12 13 14.5 11 17 11C18.5 11 19.5 12 20 13C20.5 12 21.5 11 23 11C25.5 11 28 13 28 16C28 22 20 28 20 28Z" fill="white"/>
    {/* Gentle smile below heart */}
    <path d="M15 30C16.5 31.5 18.5 32 20 32C21.5 32 23.5 31.5 25 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    <defs>
      <linearGradient id="aashaGradient" x1="2" y1="2" x2="38" y2="38">
        <stop stopColor="#f97316"/>
        <stop offset="0.5" stopColor="#fb923c"/>
        <stop offset="1" stopColor="#14b8a6"/>
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
      text: "Hey, I'm Aasha. I'm here for you, whenever you need to talk. No judgment, just support. How are you feeling right now?",
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

  const handleSend = async (messageText = inputValue) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chatbot/chat`, {
        message: messageText,
        session_id: sessionId
      });
      
      // Parse and structure the response
      const botResponse = response.data.response;
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: botResponse,
        // Add quick actions for common follow-ups
        quickActions: botResponse.toLowerCase().includes('professional') || botResponse.toLowerCase().includes('therapist') 
          ? [{ label: "Book a session", action: "How can I book a therapy session?" }]
          : null
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, type: 'bot', text: "I'm sorry, I'm having trouble connecting. Please try again." };
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

  const handleQuickAction = (action) => {
    handleSend(action);
  };

  const resetChat = () => {
    setSessionId(null);
    setMessages([{
      id: 1,
      type: 'bot',
      text: "Hey, I'm Aasha. I'm here for you, whenever you need to talk. No judgment, just support. How are you feeling right now?",
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
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-orange-400 group"
        data-testid="chatbot-toggle"
        title="Chat with Aasha"
      >
        <AashaIcon className="w-10 h-10" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 ${
        isMinimized ? 'w-72 h-14' : 'w-80 sm:w-96 h-[480px]'
      }`}
      data-testid="chatbot-window"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
            <AashaIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Aasha</h3>
            <p className="text-[10px] text-teal-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online • Wellness Companion
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
              <div key={message.id} className={`mb-3 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex flex-col max-w-[85%]">
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <AashaIcon className="w-5 h-5" />
                      <span className="text-xs text-gray-500 font-medium">Aasha</span>
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
                          className="text-xs px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors"
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
              <div className="flex justify-start mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <AashaIcon className="w-5 h-5" />
                    <span className="text-xs text-gray-500 font-medium">Aasha is typing...</span>
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
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm bg-gray-50"
                disabled={isLoading}
                data-testid="chatbot-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Aasha is here to support, not replace professional help
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
