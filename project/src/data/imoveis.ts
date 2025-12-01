export interface Property {
  id: number;
  tipo: string;
  valor: number;
  categoria: string;
  endereco: string;
  area: number;
  banheiros: number;
  quartos: number;
  corretor: number;
  image?: string;
  images?: string[];
  rating?: number;

  // 🔥 NOVO CAMPO
  descricao?: string;
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
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '12345-PR',
    endereco: 'Cascavel/PR'
  },
  {
    id: 2,
    name: 'Tatiane',
    email: 'tatiane@heyhouse.com',
    phone: '(44) 997112233',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '23456-PR',
    endereco: 'Maringá/PR'
  },
  {
    id: 3,
    name: 'Renato',
    email: 'renato@heyhouse.com',
    phone: '(48) 991234567',
    avatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '34567-SC',
    endereco: 'Florianópolis/SC'
  },
  {
    id: 4,
    name: 'Paula',
    email: 'paula@heyhouse.com',
    phone: '(51) 996543210',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '45678-RS',
    endereco: 'Porto Alegre/RS'
  },
  {
    id: 5,
    name: 'Gustavo',
    email: 'gustavo@heyhouse.com',
    phone: '(54) 994455667',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    creci: '56789-RS',
    endereco: 'Caxias do Sul/RS'
  }
];

export const properties: Property[] = [
  {
    id: 1,
    tipo: "Casa 2 quartos pacaembu",
    valor: 900,
    categoria: "aluguel",
    endereco: "Av. brasil, 8748 - Cascavel - Paraná",
    area: 297,
    banheiros: 2,
    quartos: 2,
    corretor: 1,
    image: "/imoveis/Casa av brasil 1.png",
    rating: 4.0,
    descricao: "Casa com excelente localização perto do Terminal Oeste de Cascavel, facilitando o acesso ao transporte público."
  },
  {
    id: 2,
    tipo: "Apartamento 2 quartos centro",
    valor: 1270000,
    categoria: "venda",
    endereco: "Rua xv de novembro, 1000 - Curitiba - Paraná",
    area: 1831,
    banheiros: 1,
    quartos: 2,
    corretor: 1,
    image: "/imoveis/AP Curitiba 2.png",
    rating: 4.7,
    descricao: "Apartamento com localização estratégica ao lado da Universidade Positivo e a poucos passos do Teatro Guaíra."
  },
  {
    id: 3,
    tipo: "Apartamento 2 quartos centro",
    valor: 1150000,
    categoria: "venda",
    endereco: "Rua Alagoas, 1432 - Londrina - Paraná",
    area: 934,
    banheiros: 2,
    quartos: 2,
    corretor: 2,
    image: "/imoveis/AP Londrina 3.png",
    rating: 4.6,
    descricao: "Apartamento com piscina e quadra de futsal na área comum. A região conta com diversos restaurantes."
  },
  {
    id: 4,
    tipo: "Sobrado 3 quartos Lagoa da Conceição",
    valor: 2200,
    categoria: "aluguel",
    endereco: "Rua das palmeiras, 410 - Florianópolis - Santa Catarina",
    area: 332,
    banheiros: 2,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/Sobrado florianopolis 4.png",
    rating: 4.9,
    descricao: "Sobrado localizado a uma curta distância da Lagoa da Conceição."
  },
  {
    id: 5,
    tipo: "Casa 2 quartos Paranaguamirim",
    valor: 520000,
    categoria: "venda",
    endereco: "Av. beira-mar, 291 - Joinville - Santa Catarina",
    area: 161,
    banheiros: 2,
    quartos: 2,
    corretor: 3,
    image: "/imoveis/Casa Joinville 5.png",
    rating: 4.8,
    descricao: "Casa localizada em área afastada da cidade de Joinville, com proximidade ao acesso para a Ilha do Mel."
  },
  {
    id: 6,
    tipo: "Sobrado 3 quartos Velha",
    valor: 950000,
    categoria: "venda",
    endereco: "R. João Pessoa, 63 - Blumenau - Santa Catarina",
    area: 385,
    banheiros: 2,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/Sobrado Blumenau 6.png",
    rating: 4.8,
    descricao: "Sobrado em condomínio fechado, com localização próxima à movimentada Rua Sete de Setembro."
  },
  {
    id: 7,
    tipo: "Apartamento 2 quartos Independência",
    valor: 1920,
    categoria: "aluguel",
    endereco: "Rua independência, 98 - Porto alegre - Rio Grande do Sul",
    area: 1520,
    banheiros: 1,
    quartos: 2,
    corretor: 4,
    image: "/imoveis/AP Porto Alegre 7.png",
    rating: 4.5,
    descricao: "Apartamento localizado ao lado do campus da Universidade Federal do RS (UFRGS) e nas proximidades do Parque Farroupilha."
  },
  {
    id: 8,
    tipo: "Apartamento 3 quartos Nossa Sra. de Lourdes",
    valor: 1700000,
    categoria: "venda",
    endereco: "Av. julio de castilhos, 500 - Caxias do Sul - Rio Grande do Sul",
    area: 2692,
    banheiros: 2,
    quartos: 3,
    corretor: 5,
    image: "/imoveis/AP Caxias do Sul 8.png",
    rating: 4.7,
    descricao: "Apartamento que oferece estacionamento privativo no prédio e conta com uma pizzaria anexa ao edifício."
  },
  {
    id: 9,
    tipo: "Sobrado 4 quartos Q.ta da Serra",
    valor: 850000,
    categoria: "venda",
    endereco: "Rua Danton Corrêa da Silva, 1003 - Canela - Rio Grande do Sul",
    area: 354,
    banheiros: 3,
    quartos: 4,
    corretor: 5,
    image: "/imoveis/Sobrado Canela 9.png",
    rating: 4.4,
    descricao: "Sobrado com localização prática, perto da rodoviária e da movimentada Avenida Osvaldo Aranha."
  },
  {
    id: 10,
    tipo: "Sobrado 3 quartos Los Angeles",
    valor: 1600,
    categoria: "aluguel",
    endereco: "Rua Chicago, 426 - Maringá - Paraná",
    area: 304,
    banheiros: 2,
    quartos: 3,
    corretor: 2,
    image: "/imoveis/Sobrado Maringá 10.png",
    rating: 4.9,
    descricao: "Sobrado situado em um bairro aconchegante, a uma curta distância do centro da cidade."
  },
  {
    id: 11,
    tipo: "Chácara 4 quartos Jardim Colonia",
    valor: 3130000,
    categoria: "venda",
    endereco: "Rua Jatoba, 1249 - Foz do Iguaçu - Paraná",
    area: 125203,
    banheiros: 5,
    quartos: 4,
    corretor: 1,
    image: "/imoveis/Chacará foz 11.png",
    rating: 4.3,
    descricao: "Chácara de 12,52 hectares com localização entre a cidade e o Rio Iguaçu. O terreno possui uma ampla área livre, apta para a construção de um celeiro, silo ou garagem."
  },
  {
    id: 12,
    tipo: "Apartamento 3 quartos Centro",
    valor: 960000,
    categoria: "venda",
    endereco: "Rua erechim, 399 - Cascavel - Paraná",
    area: 456,
    banheiros: 2,
    quartos: 3,
    corretor: 1,
    image: "/imoveis/AP Cascavel 12.png",
    rating: 4.8,
    descricao: "Apartamento com localização próxima ao Shopping Catuaí e ao Zoológico de Cascavel. Os quartos incluem banheiro privativo."
  },
  {
    id: 13,
    tipo: "Casa 2 quartos São Judas",
    valor: 850,
    categoria: "aluguel",
    endereco: "Rua Francisco Ferreira Filho, 46 - Itajaí - Santa Catarina",
    area: 167,
    banheiros: 1,
    quartos: 2,
    corretor: 3,
    image: "/imoveis/Casa Itajai 13.png",
    rating: 3.8,
    descricao: "Casa de formato compacto, localizada nas proximidades da loja Havan."
  },
  {
    id: 14,
    tipo: "Casa 3 quartos Pioneiros",
    valor: 820000,
    categoria: "venda",
    endereco: "Rua José Venâncio dos Santos, 60 - Balneário Camboriú - Santa Catarina",
    area: 269,
    banheiros: 1,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/Casa balneario 14.png",
    rating: 4.8,
    descricao: "Casa localizada em um terreno de esquina, a poucos metros da praia."
  },
  {
    id: 15,
    tipo: "Apartamento 3 quartos Paraíso",
    valor: 1380000,
    categoria: "venda",
    endereco: "Rua Sete de Setembro, 202 - Chapecó - Santa Catarina",
    area: 993,
    banheiros: 3,
    quartos: 3,
    corretor: 3,
    image: "/imoveis/AP Chapecó 15.png",
    rating: 4.7,
    descricao: "Apartamento situado nas proximidades do Parque Alberto Fin"
  }
];

export const getPropertyById = (id: number): Property | undefined =>
  properties.find(p => p.id === id);

export const getAgentById = (id: number): Agent | undefined =>
  agents.find(a => a.id === id);

export const getPropertiesByCity = (city: string): Property[] =>
  properties.filter(property => {
    const propertyCity = property.endereco.split('-')[1].trim();
    return propertyCity.toLowerCase() === city.toLowerCase();
  });

export const getPropertiesByState = (state: string): Property[] =>
  properties.filter(property => {
    const parts = property.endereco.split('-');
    return parts[parts.length - 1].trim().toLowerCase() === state.toLowerCase();
  });

export const getPropertiesByType = (type: "venda" | "aluguel"): Property[] =>
  properties.filter(property => property.categoria === type);

export const getPropertiesByPriceRange = (minPrice: number, maxPrice: number): Property[] =>
  properties.filter(property => property.valor >= minPrice && property.valor <= maxPrice);

export const setCorretorForProperty = (propertyId: number, corretorId: number) => {
  const property = properties.find(p => p.id === propertyId);
  if (property) property.corretor = corretorId;
};
