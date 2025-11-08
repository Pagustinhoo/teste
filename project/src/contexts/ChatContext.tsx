import React, { createContext, useContext, useState, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  type?: 'text' | 'options' | 'property_suggestion';
  data?: any;
}

interface QuickOption {
  icon: string;
  text: string;
  category: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
  quickOptions: QuickOption[];
  userPreferences: any;
  conversationContext: any;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    budget: null,
    location: null,
    propertyType: null,
    bedrooms: null,
    visitedProperties: []
  });
  const [conversationContext, setConversationContext] = useState({
    stage: 'greeting', // greeting, qualifying, searching, negotiating
    lastTopic: null,
    userIntent: null
  });

  const quickOptions: QuickOption[] = [
    { icon: '🏠', text: 'Quero comprar um imóvel', category: 'intention' },
    { icon: '🏢', text: 'Busco imóvel para alugar', category: 'intention' },
    { icon: '💰', text: 'Qual meu orçamento ideal?', category: 'budget' },
    { icon: '📍', text: 'Melhores bairros da região', category: 'location' },
    { icon: '🏦', text: 'Como funciona o financiamento?', category: 'financing' },
    { icon: '📅', text: 'Agendar visita presencial', category: 'visit' },
    { icon: '📊', text: 'Análise de mercado', category: 'market' },
    { icon: '🤝', text: 'Falar com especialista', category: 'contact' }
  ];

  // Initialize conversation
  useEffect(() => {
    const initMessage: Message = {
      id: '1',
      text: getGreetingMessage(),
      sender: 'admin',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([initMessage]);

    // Simulate typing for welcome options
    setTimeout(() => {
      const optionsMessage: Message = {
        id: '2',
        text: 'Para começar, me conte qual é seu objetivo:',
        sender: 'admin',
        timestamp: new Date(),
        type: 'options'
      };
      setMessages(prev => [...prev, optionsMessage]);
    }, 2000);
  }, []);

  const getGreetingMessage = () => {
    const greetings = [
      '🏡 Olá! Sou Helias Andrei, seu consultor imobiliário inteligente da HeyHouse! Estou aqui para encontrar o imóvel perfeito para você.',
      '👋 Bem-vindo à HeyHouse! Sou Helias, especialista em imóveis no Paraná, São Paulo e Santa Catarina. Como posso realizar seu sonho da casa própria hoje?',
      '🌟 Oi! Helias Andrei aqui, seu parceiro na busca pelo imóvel ideal! Com mais de 15 anos de experiência, vou te ajudar a encontrar exatamente o que procura.',
      '🏠 Olá! Sou o Helias, consultor especializado da HeyHouse. Tenho mais de 180 imóveis disponíveis e vou usar toda minha experiência para te ajudar!'
    ];
    
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) timeGreeting = 'Bom dia! ☀️';
    else if (hour < 18) timeGreeting = 'Boa tarde! 🌤️';
    else timeGreeting = 'Boa noite! 🌙';
    
    return `${timeGreeting} ${greetings[Math.floor(Math.random() * greetings.length)]}`;
  };

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Analyze user intent and update context
    analyzeUserIntent(text);

    // Simulate intelligent response
    setIsTyping(true);
    
    const responseDelay = 1000 + Math.random() * 2000; // 1-3 seconds
    
    setTimeout(() => {
      const responses = generateIntelligentResponse(text);
      
      responses.forEach((response, index) => {
        setTimeout(() => {
          const adminResponse: Message = {
            id: (Date.now() + index).toString(),
            text: response.text,
            sender: 'admin',
            timestamp: new Date(),
            type: response.type || 'text',
            data: response.data
          };
          
          setMessages(prev => [...prev, adminResponse]);
          
          if (index === responses.length - 1) {
            setIsTyping(false);
          }
        }, index * 800); // Stagger multiple responses
      });
    }, responseDelay);
  };

  const analyzeUserIntent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Update user preferences based on message
    if (lowerMessage.includes('comprar') || lowerMessage.includes('compra')) {
      setUserPreferences(prev => ({ ...prev, intention: 'buy' }));
      setConversationContext(prev => ({ ...prev, stage: 'qualifying', userIntent: 'buy' }));
    }
    
    if (lowerMessage.includes('alugar') || lowerMessage.includes('aluguel')) {
      setUserPreferences(prev => ({ ...prev, intention: 'rent' }));
      setConversationContext(prev => ({ ...prev, stage: 'qualifying', userIntent: 'rent' }));
    }
    
    // Extract budget information
    const budgetMatch = message.match(/(\d+\.?\d*)\s*(mil|milhão|milhões|k|m)/i);
    if (budgetMatch) {
      let budget = parseFloat(budgetMatch[1]);
      const unit = budgetMatch[2].toLowerCase();
      
      if (unit.includes('mil') || unit === 'k') budget *= 1000;
      if (unit.includes('milhão') || unit.includes('milhões') || unit === 'm') budget *= 1000000;
      
      setUserPreferences(prev => ({ ...prev, budget }));
    }
    
    // Extract location preferences
    const cities = ['curitiba', 'londrina', 'maringá', 'são paulo', 'campinas', 'santos', 'florianópolis', 'blumenau', 'joinville'];
    const mentionedCity = cities.find(city => lowerMessage.includes(city));
    if (mentionedCity) {
      setUserPreferences(prev => ({ ...prev, location: mentionedCity }));
    }
    
    // Extract property type
    if (lowerMessage.includes('casa')) {
      setUserPreferences(prev => ({ ...prev, propertyType: 'casa' }));
    } else if (lowerMessage.includes('apartamento')) {
      setUserPreferences(prev => ({ ...prev, propertyType: 'apartamento' }));
    }
    
    // Extract bedroom count
    const bedroomMatch = message.match(/(\d+)\s*(quarto|dormitório)/i);
    if (bedroomMatch) {
      setUserPreferences(prev => ({ ...prev, bedrooms: parseInt(bedroomMatch[1]) }));
    }
  };

  const generateIntelligentResponse = (userMessage: string): any[] => {
    const lowerMessage = userMessage.toLowerCase();
    const responses: any[] = [];
    
    // Contextual responses based on conversation stage
    if (conversationContext.stage === 'greeting') {
      if (lowerMessage.includes('comprar') || lowerMessage.includes('quero comprar')) {
        responses.push({
          text: '🏠 Excelente! Comprar um imóvel é um grande passo! Vou te ajudar a encontrar a opção perfeita.',
          type: 'text'
        });
        
        responses.push({
          text: 'Para personalizar minha busca, me conte:\n\n• Qual sua faixa de orçamento?\n• Em qual cidade você gostaria de morar?\n• Prefere casa ou apartamento?\n• Quantos quartos precisa?',
          type: 'text'
        });
        
        setConversationContext(prev => ({ ...prev, stage: 'qualifying' }));
        return responses;
      }
      
      if (lowerMessage.includes('alugar') || lowerMessage.includes('aluguel')) {
        responses.push({
          text: '🏢 Perfeito! Temos ótimas opções para aluguel! Vou encontrar algo que se encaixe no seu perfil.',
          type: 'text'
        });
        
        responses.push({
          text: 'Me ajude com algumas informações:\n\n• Qual valor máximo de aluguel?\n• Região preferida?\n• Tipo de imóvel (casa/apartamento)?\n• Quantos quartos?',
          type: 'text'
        });
        
        setConversationContext(prev => ({ ...prev, stage: 'qualifying' }));
        return responses;
      }
    }
    
    // Budget-related responses
    if (lowerMessage.includes('orçamento') || lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      responses.push({
        text: '💰 Vou te ajudar a definir um orçamento realista! Nossos imóveis variam de R$ 150.000 a R$ 4.200.000.',
        type: 'text'
      });
      
      responses.push({
        text: '📊 **Faixas de preço populares:**\n\n🏠 **Casas:**\n• Entrada: R$ 250.000 - R$ 450.000\n• Intermediário: R$ 450.000 - R$ 800.000\n• Premium: R$ 800.000+\n\n🏢 **Apartamentos:**\n• Compacto: R$ 180.000 - R$ 350.000\n• Familiar: R$ 350.000 - R$ 650.000\n• Luxo: R$ 650.000+\n\nQual faixa faz mais sentido para você?',
        type: 'text'
      });
      
      return responses;
    }
    
    // Location-based responses
    if (lowerMessage.includes('localização') || lowerMessage.includes('bairro') || lowerMessage.includes('região')) {
      responses.push({
        text: '📍 Excelente pergunta! Localização é fundamental! Trabalho com as melhores regiões de 3 estados.',
        type: 'text'
      });
      
      responses.push({
        text: '🗺️ **Nossas regiões TOP:**\n\n🌲 **Paraná:**\n• Curitiba: Batel, Água Verde, Bigorrilho\n• Londrina: Centro, Gleba Palhano\n• Maringá: Zona 7, Novo Centro\n\n🏙️ **São Paulo:**\n• Capital: Vila Madalena, Pinheiros, Moema\n• Campinas: Cambuí, Taquaral\n• Santos: Gonzaga, Boqueirão\n\n🏖️ **Santa Catarina:**\n• Floripa: Centro, Trindade, Lagoa\n• Blumenau: Centro, Velha\n• Joinville: América, Atiradores\n\nQual região desperta seu interesse?',
        type: 'text'
      });
      
      return responses;
    }
    
    // Financing responses
    if (lowerMessage.includes('financiamento') || lowerMessage.includes('financiar') || lowerMessage.includes('banco')) {
      responses.push({
        text: '🏦 Financiamento é minha especialidade! Tenho parcerias com os melhores bancos e condições exclusivas.',
        type: 'text'
      });
      
      responses.push({
        text: '💳 **Opções de Financiamento:**\n\n🏛️ **Bancos Parceiros:**\n• Caixa Econômica Federal\n• Banco do Brasil\n• Itaú, Bradesco, Santander\n\n📋 **Modalidades:**\n• Sistema SAC (parcelas decrescentes)\n• Sistema PRICE (parcelas fixas)\n• Financiamento direto com construtora\n\n💰 **Vantagens:**\n• Até 80% do valor financiado\n• Prazo de até 35 anos\n• Use seu FGTS como entrada\n• Taxas a partir de 8,5% ao ano\n\nQuer que eu simule um financiamento para você?',
        type: 'text'
      });
      
      return responses;
    }
    
    // Visit scheduling
    if (lowerMessage.includes('visita') || lowerMessage.includes('agendar') || lowerMessage.includes('conhecer')) {
      responses.push({
        text: '📅 Perfeito! Visitas presenciais são essenciais! Vou organizar tudo para você.',
        type: 'text'
      });
      
      responses.push({
        text: '🏠 **Como funciona:**\n\n1️⃣ Você escolhe os imóveis de interesse\n2️⃣ Eu organizo um roteiro otimizado\n3️⃣ Te acompanho pessoalmente\n4️⃣ Explico todos os detalhes\n5️⃣ Ajudo na negociação\n\n📱 **Agendar agora:**\n• WhatsApp: (41) 99999-9999\n• Email: heliasandrei16@gmail.com\n\nOu me diga qual imóvel te interessou e eu agendo!',
        type: 'text'
      });
      
      return responses;
    }
    
    // Market analysis
    if (lowerMessage.includes('mercado') || lowerMessage.includes('valorização') || lowerMessage.includes('investimento')) {
      responses.push({
        text: '📊 Ótima pergunta! Análise de mercado é crucial para um bom investimento.',
        type: 'text'
      });
      
      responses.push({
        text: '📈 **Análise de Mercado 2024:**\n\n🔥 **Regiões em Alta:**\n• Curitiba: +12% valorização/ano\n• Florianópolis: +15% valorização/ano\n• Campinas: +10% valorização/ano\n\n💡 **Tendências:**\n• Apartamentos compactos em alta\n• Casas com home office valorizadas\n• Proximidade ao transporte público\n• Sustentabilidade e tecnologia\n\n🎯 **Melhores Investimentos:**\n• Imóveis para locação: ROI 6-8%\n• Lançamentos: desconto 15-20%\n• Reformas: valorização 20-30%\n\nQuer análise específica de alguma região?',
        type: 'text'
      });
      
      return responses;
    }
    
    // Property suggestions based on preferences
    if (userPreferences.budget || userPreferences.location || userPreferences.propertyType) {
      responses.push({
        text: '🎯 Com base no que você me contou, tenho algumas sugestões perfeitas!',
        type: 'text'
      });
      
      responses.push({
        text: generatePropertySuggestions(),
        type: 'property_suggestion'
      });
      
      return responses;
    }
    
    // Default intelligent responses
    const intelligentResponses = [
      {
        keywords: ['obrigado', 'valeu', 'muito bom', 'excelente'],
        response: '😊 Fico muito feliz em ajudar! Meu objetivo é encontrar o imóvel perfeito para você. Tem mais alguma dúvida ou quer ver algumas opções?'
      },
      {
        keywords: ['não sei', 'dúvida', 'confuso', 'ajuda'],
        response: '🤝 Sem problemas! É normal ter dúvidas. Estou aqui para esclarecer tudo. Que tal começarmos do básico? Você está pensando em comprar ou alugar?'
      },
      {
        keywords: ['urgente', 'rápido', 'pressa'],
        response: '⚡ Entendo a urgência! Vou priorizar sua busca. Me passe seu WhatsApp que te ligo em 5 minutos: (41) 99999-9999'
      },
      {
        keywords: ['documentação', 'documento', 'papelada'],
        response: '📋 Documentação é minha especialidade! Cuido de toda a parte burocrática para você. Precisa de:\n• RG, CPF, comprovante de renda\n• Certidões negativas\n• Para financiamento: documentos específicos\n\nTe oriento em cada passo!'
      }
    ];
    
    const matchedResponse = intelligentResponses.find(resp => 
      resp.keywords.some(keyword => lowerMessage.includes(keyword))
    );
    
    if (matchedResponse) {
      responses.push({
        text: matchedResponse.response,
        type: 'text'
      });
      return responses;
    }
    
    // Fallback with personalized touch
    const fallbackResponses = [
      `🤖 Analisando sua mensagem... Vou buscar as melhores opções para "${userMessage}". Me dê alguns segundos!`,
      `💭 Interessante! Sobre "${userMessage}", posso te ajudar de várias formas. Quer que eu seja mais específico em algum ponto?`,
      `🔍 Entendi! Vou pesquisar informações sobre "${userMessage}" e te dar uma resposta completa. Enquanto isso, quer ver alguns imóveis em destaque?`,
      `📞 Sua pergunta merece uma resposta detalhada! Que tal conversarmos por WhatsApp? (41) 99999-9999 - Ou posso continuar ajudando aqui!`
    ];
    
    responses.push({
      text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      type: 'text'
    });
    
    return responses;
  };

  const generatePropertySuggestions = () => {
    const { budget, location, propertyType, bedrooms } = userPreferences;
    
    let suggestions = '🏠 **Imóveis Selecionados Para Você:**\n\n';
    
    if (budget && budget < 300000) {
      suggestions += '💰 **Dentro do seu orçamento:**\n• Apartamento 2Q em Curitiba - R$ 280.000\n• Casa 3Q em Londrina - R$ 250.000\n• Apartamento 1Q em Florianópolis - R$ 290.000\n\n';
    } else if (budget && budget < 500000) {
      suggestions += '💰 **Opções premium no seu orçamento:**\n• Casa 3Q com piscina - R$ 450.000\n• Apartamento 3Q centro - R$ 480.000\n• Casa 4Q com quintal - R$ 420.000\n\n';
    }
    
    if (location) {
      suggestions += `📍 **Em ${location}:**\n• 5 imóveis disponíveis\n• Preços de R$ 180.000 a R$ 850.000\n• Casas e apartamentos\n\n`;
    }
    
    suggestions += '🎯 **Quer ver detalhes?**\nPosso enviar fotos, agendar visitas e negociar preços!\n\n📱 WhatsApp: (41) 99999-9999';
    
    return suggestions;
  };

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      isTyping,
      quickOptions,
      userPreferences,
      conversationContext
    }}>
      {children}
    </ChatContext.Provider>
  );
};