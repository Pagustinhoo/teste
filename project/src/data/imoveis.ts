export interface Property {
  id: number;
  tipo: string;
  valor: number;
  categoria: string;
  endereco: string;
  area: number;
  banheiros: number;
  quartos: number;
  corretor: number; // id do corretor responsável
  image?: string;
  images?: string[];
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  creci: string;
  endereco: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    name: 'André',
    email: 'andre@heyhouse.com',
    phone: '(45) 998765432',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '12345-PR',
    endereco: 'Cascavel/PR'
  },
  {
    id: 2,
    name: 'Tatiane',
    email: 'tatiane@heyhouse.com',
    phone: '(44) 997112233',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '23456-PR',
    endereco: 'Maringá/PR'
  },
  {
    id: 3,
    name: 'Renato',
    email: 'renato@heyhouse.com',
    phone: '(48) 991234567',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '34567-SC',
    endereco: 'Florianópolis/SC'
  },
  {
    id: 4,
    name: 'Paula',
    email: 'paula@heyhouse.com',
    phone: '(51) 996543210',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '45678-RS',
    endereco: 'Porto Alegre/RS'
  },
  {
    id: 5,
    name: 'Gustavo',
    email: 'gustavo@heyhouse.com',
    phone: '(54) 994455667',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '56789-RS',
    endereco: 'Caxias do Sul/RS'
  }
];

export const properties: Property[] = [
  {
    id: 1,
    tipo: "Casa 3 quartos centro",
    valor: 1500,
    categoria: "aluguel",
    endereco: "Av. brasil, 321 - Cascavel - Paraná",
    area: 120,
    banheiros: 2,
    quartos: 3,
    corretor: 1,
    image: "/imoveis/Casa av brasil 1.png"
  },
  {
    id: 2,
    tipo: "Apartamento 2 quartos centro",
    valor: 270000,
    categoria: "venda",
    endereco: "Rua xv de novembro, 1000 - Curitiba - Paraná",
    area: 80,
    banheiros: 1,
    quartos: 2,
    corretor: 2,
    image: "/imoveis/AP Curitiba 2.png"
  },
  {
    id: 3,
    tipo: "Apartamento 3 quartos centro",
    valor: 950000,
    categoria: "venda",
    endereco: "Av. higienópolis, 888 - Londrina - Paraná",
    area: 160,
    banheiros: 3,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/AP Londrina 3.png"
  },
  {
    id: 4,
    tipo: "Sobrado 3 quartos Lagoa da Conceição",
    valor: 1800,
    categoria: "aluguel",
    endereco: "Rua das palmeiras, 456 - Florianópolis - Santa Catarina",
    area: 140,
    banheiros: 2,
    quartos: 3,
    corretor: 1,
    image: "/imoveis/Sobrado florianopolis 4.png"
  },
  {
    id: 5,
    tipo: "Casa 2 quartos Paranaguamirim",
    valor: 220000,
    categoria: "venda",
    endereco: "Av. beira-mar, 222 - Joinville - Santa Catarina",
    area: 95,
    banheiros: 2,
    quartos: 2,
    corretor: 2,
    image: "/imoveis/Casa Joinville 5.png"
  },
  {
    id: 6,
    tipo: "Sobrado 3 quartos Velha",
    valor: 750000,
    categoria: "venda",
    endereco: "R. João Pessoa, 62 - Blumenau - Santa Catarina",
    area: 210,
    banheiros: 2,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/Sobrado Blumenau 6.png"
  },
  {
    id: 7,
    tipo: "Apartamento 2 quartos Independência",
    valor: 3300,
    categoria: "aluguel",
    endereco: "Rua independência, 77 - Porto alegre - Rio Grande do Sul",
    area: 110,
    banheiros: 1,
    quartos: 2,
    corretor: 1,
    image: "/imoveis/AP Porto Alegre 7.png"
  },
  {
    id: 8,
    tipo: "Apartamento 3 quartos Nossa Sra. de Lourdes",
    valor: 400000,
    categoria: "venda",
    endereco: "Av. julio de castilhos, 500 - Caxias do Sul - Rio Grande do Sul",
    area: 100,
    banheiros: 2,
    quartos: 3,
    corretor: 2,
    image: "/imoveis/AP Caxias do Sul 8.png"
  },
  {
    id: 9,
    tipo: "Sobrado 4 quartos Q.ta da Serra",
    valor: 850000,
    categoria: "venda",
    endereco: "Rua Danton Corrêa da Silva, 204 - Canela - Rio Grande do Sul",
    area: 250,
    banheiros: 4,
    quartos: 4,
    corretor: 3,
    image: "/imoveis/Sobrado Canela 9.png"
  },
  {
    id: 10,
    tipo: "Sobrado 4 quartos Los Angeles",
    valor: 750000,
    categoria: "aluguel",
    endereco: "Rua Chicago, 428 - Maringá - Paraná",
    area: 60,
    banheiros: 2,
    quartos: 4,
    corretor: 1,
    image: "/imoveis/Sobrado Maringá 10.png"
  },
  {
    id: 11,
    tipo: "Chácara 4 quartos Jardim Colonia",
    valor: 2500000,
    categoria: "venda",
    endereco: "Rua Jatoba, 1249 - Foz do Iguaçu - Paraná",
    area: 19282,
    banheiros: 6,
    quartos: 4,
    corretor: 2,
    image: "/imoveis/Chacará foz 11.png"
  },
  {
    id: 12,
    tipo: "Apartamento 3 quartos Centro",
    valor: 500000,
    categoria: "venda",
    endereco: "Rua erechim, 395 - Cascavel - Paraná",
    area: 115,
    banheiros: 2,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/AP Cascavel 12.png"
  },
  {
    id: 13,
    tipo: "Casa 2 quartos São Judas",
    valor: 1200,
    categoria: "aluguel",
    endereco: "Rua Francisco Ferreira Filho, 46 - Itajaí - Santa Catarina",
    area: 70,
    banheiros: 1,
    quartos: 2,
    corretor: 1,
    image: "/imoveis/Casa Itajai 13.png"
  },
  {
    id: 14,
    tipo: "Casa 3 quartos Pioneiros",
    valor: 220000,
    categoria: "venda",
    endereco: "Rua José Venâncio dos Santos, 67 - Balneário Camboriú - Santa Catarina",
    area: 130,
    banheiros: 2,
    quartos: 3,
    corretor: 2,
    image: "/imoveis/Casa balneario 14.png"
  },
  {
    id: 15,
    tipo: "Apartamento 3 quartos Paraíso",
    valor: 680000,
    categoria: "venda",
    endereco: "Rua Sete de Setembro, 202 - Chapecó - Santa Catarina",
    area: 140,
    banheiros: 3,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/AP Chapecó 15.png"
  }
];

export const getPropertyById = (id: number): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getAgentById = (id: number): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};

export const getPropertiesByCity = (city: string): Property[] => {
  return properties.filter(property => {
    const propertyCity = property.endereco.split('-')[1].trim();
    return propertyCity.toLowerCase() === city.toLowerCase();
  });
};

export const getPropertiesByState = (state: string): Property[] => {
  return properties.filter(property => {
    const enderecoParts = property.endereco.split('-');
    const propertyState = enderecoParts[enderecoParts.length - 1].trim();
    return propertyState.toLowerCase() === state.toLowerCase();
  });
};

export const getPropertiesByType = (type: 'venda' | 'aluguel'): Property[] => {
  return properties.filter(property => property.categoria === type);
};

export const getPropertiesByPriceRange = (minPrice: number, maxPrice: number): Property[] => {
  return properties.filter(property => property.valor >= minPrice && property.valor <= maxPrice);
};

// Para permitir que corretores (agents) sejam alterados pelos próprios corretores via tela de imóveis (Properties),
// basta garantir que o campo `agent` de cada Property seja editável na interface Properties.tsx.
// Exemplo de função utilitária para alterar o corretor de um imóvel:

export const setCorretorForProperty = (propertyId: number, corretorId: number) => {
  const property = properties.find(p => p.id === propertyId);
  if (property) {
    property.corretor = corretorId;
  }
};