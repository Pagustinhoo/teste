export interface Property {
  id: number;
  tipo: string;
  valor: number;
  categoria: string;
  endereco: string;
  area: number;
  banheiros: number;
  quartos: number;
  agent: number;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  creci: string;      // antes "rating"
  endereco: string;   // antes "experience"
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
    tipo: "casa",
    valor: 1500,
    categoria: "aluguel",
    endereco: "av. brasil, 321 - cascavel - paraná",
    area: 120,
    banheiros: 2,
    quartos: 3,
    agent: 1
  },
  {
    id: 2,
    tipo: "apartamento",
    valor: 270000,
    categoria: "venda",
    endereco: "rua xv de novembro, 1000 - curitiba - paraná",
    area: 80,
    banheiros: 1,
    quartos: 2,
    agent: 2
  },
  {
    id: 3,
    tipo: "apartamento",
    valor: 950000,
    categoria: "venda",
    endereco: "av. higienópolis, 888 - londrina - paraná",
    area: 160,
    banheiros: 3,
    quartos: 3,
    agent: 3
  },
  {
    id: 4,
    tipo: "sobrado",
    valor: 1800,
    categoria: "aluguel",
    endereco: "rua das palmeiras, 456 - florianópolis - santa catarina",
    area: 140,
    banheiros: 2,
    quartos: 3,
    agent: 1
  },
  {
    id: 5,
    tipo: "casa",
    valor: 220000,
    categoria: "venda",
    endereco: "av. beira-mar, 222 - joinville - santa catarina",
    area: 95,
    banheiros: 2,
    quartos: 2,
    agent: 2
  },
  {
    id: 6,
    tipo: "sobrado",
    valor: 750000,
    categoria: "venda",
    endereco: "R. João Pessoa, 62 - blumenau - santa catarina",
    area: 210,
    banheiros: 2,
    quartos: 3,
    agent: 3
  },
  {
    id: 7,
    tipo: "Apartamento",
    valor: 3300,
    categoria: "aluguel",
    endereco: "rua independência, 77 - porto alegre - rio grande do sul",
    area: 110,
    banheiros: 1,
    quartos: 2,
    agent: 1
  },
  {
    id: 8,
    tipo: "apartamento",
    valor: 400000,
    categoria: "venda",
    endereco: "av. julio de castilhos, 500 - caxias do sul - rio grande do sul",
    area: 100,
    banheiros: 2,
    quartos: 3,
    agent: 2
  },
  {
    id: 9,
    tipo: "sobrado",
    valor: 850000,
    categoria: "venda",
    endereco: "rua Danton Corrêa da Silva, 204 - canela - rio grande do sul",
    area: 250,
    banheiros: 4,
    quartos: 4,
    agent: 3
  },
  {
    id: 10,
    tipo: "sobrado",
    valor: 750000,
    categoria: "aluguel",
    endereco: "rua Chicago, 428 - maringá - paraná",
    area: 60,
    banheiros: 2,
    quartos: 4,
    agent: 1
  },
  {
    id: 11,
    tipo: "chácara",
    valor: 2500000,
    categoria: "venda",
    endereco: "Rua Jatoba, 1249 - Foz do Iguaçu - paraná",
    area: 19282,
    banheiros: 6,
    quartos: 4,
    agent: 2
  },
  {
    id: 12,
    tipo: "apartamento",
    valor: 500000,
    categoria: "venda",
    endereco: "rua erechim, 395 - cascavel - paraná",
    area: 115,
    banheiros: 2,
    quartos: 3,
    agent: 3
  },
  {
    id: 13,
    tipo: "Casa",
    valor: 1200,
    categoria: "aluguel",
    endereco: "rua Francisco Ferreira Filho, 46 - itajai - santa catarina",
    area: 70,
    banheiros: 1,
    quartos: 2,
    agent: 1
  },
  {
    id: 14,
    tipo: "casa",
    valor: 220000,
    categoria: "venda",
    endereco: "rua José Venâncio dos Santos, 67 - balneário camboriú - santa catarina",
    area: 130,
    banheiros: 2,
    quartos: 3,
    agent: 2
  },
  {
    id: 15,
    tipo: "apartamento",
    valor: 680000,
    categoria: "venda",
    endereco: "rua sete de setembro, 202 - chapecó - santa catarina",
    area: 140,
    banheiros: 3,
    quartos: 3,
    agent: 3
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