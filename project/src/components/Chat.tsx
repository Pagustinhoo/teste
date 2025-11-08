import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, Zap, Brain, Star, TrendingUp } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

interface ChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onToggle }) => {
  const { messages, sendMessage, isTyping, quickOptions, userPreferences } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
      setShowQuickOptions(false);
    }
  };

  const handleQuickOption = (option: string) => {
    sendMessage(option);
    setShowQuickOptions(false);
  };

  const formatMessage = (text: string) => {
    // Format bold text
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format bullet points
    formatted = formatted.replace(/^• /gm, '<span class="text-blue-600">•</span> ');
    
    // Format numbered lists
    formatted = formatted.replace(/^(\d+)️⃣ /gm, '<span class="text-blue-600 font-bold">$1️⃣</span> ');
    
    // Format emojis in lines
    formatted = formatted.replace(/^(🏠|🏢|💰|📍|🏦|📅|📊|🤝|🔥|💡|🎯)/gm, '<span class="text-lg">$1</span>');
    
    return formatted;
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 z-50 group"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-xl"></div>
          </>
        )}
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Enhanced Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Brain size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Helias Andrei IA</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-100 text-sm">Consultor Inteligente</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400" />
                    <span className="text-xs text-blue-100">4.9</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-blue-100">
                  <Zap size={16} />
                  <span className="text-xs font-semibold">IA Ativa</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-100">
                  <TrendingUp size={12} />
                  <span className="text-xs">15+ anos exp.</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Preferences Display */}
          {(userPreferences.budget || userPreferences.location || userPreferences.propertyType) && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 border-b border-gray-200">
              <div className="text-xs text-gray-600 mb-1">🎯 Suas preferências:</div>
              <div className="flex flex-wrap gap-2">
                {userPreferences.budget && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    💰 R$ {userPreferences.budget.toLocaleString()}
                  </span>
                )}
                {userPreferences.location && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    📍 {userPreferences.location}
                  </span>
                )}
                {userPreferences.propertyType && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    🏠 {userPreferences.propertyType}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <div 
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                  />
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Enhanced Quick Options */}
            {showQuickOptions && messages.length <= 2 && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                    <Brain size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Escolha uma opção ou digite sua pergunta</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {quickOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickOption(option.text)}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 text-left group shadow-sm hover:shadow-md"
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-700 group-hover:text-blue-700 font-medium">
                          {option.text}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {option.category === 'intention' && 'Definir objetivo'}
                          {option.category === 'budget' && 'Planejamento financeiro'}
                          {option.category === 'location' && 'Análise de localização'}
                          {option.category === 'financing' && 'Consultoria financeira'}
                          {option.category === 'visit' && 'Agendamento'}
                          {option.category === 'market' && 'Análise de mercado'}
                          {option.category === 'contact' && 'Atendimento VIP'}
                        </div>
                      </div>
                      <div className="text-blue-400 group-hover:text-blue-600 transition-colors">
                        →
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Zap size={16} />
                    <span className="text-xs font-semibold">Respostas Inteligentes em Tempo Real</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Powered by IA • Mais de 180 imóveis disponíveis
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-2xl shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Helias está analisando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem ou dúvida..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Send size={20} />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>💡 Dica: Seja específico sobre suas necessidades</span>
              <span>⚡ Resposta em segundos</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;