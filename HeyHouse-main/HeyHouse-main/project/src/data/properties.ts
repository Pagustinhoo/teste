export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: 'venda' | 'aluguel';
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  location: string;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
  image: string;
  images: string[];
  features: string[];
  rating: number;
  agentId: number;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
  experience: number;
  specialties: string[];
}

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Helias Andrei',
    email: 'heliasandrei16@gmail.com',
    phone: '(41) 99999-9999',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.9,
    experience: 15,
    specialties: ['Casas de Luxo', 'Apartamentos', 'Investimentos']
  },
  {
    id: 2,
    name: 'Ana Carolina Silva',
    email: 'ana.silva@heyhouse.com',
    phone: '(11) 98888-7777',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.8,
    experience: 12,
    specialties: ['Apartamentos', 'Primeiro Imóvel', 'Financiamento']
  },
  {
    id: 3,
    name: 'Roberto Santos',
    email: 'roberto.santos@heyhouse.com',
    phone: '(48) 97777-6666',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    rating: 4.7,
    experience: 10,
    specialties: ['Casas', 'Terrenos', 'Comercial']
  }
];

export const properties: Property[] = [
  // PARANÁ - Curitiba
  {
    id: 1,
    title: 'Apartamento Moderno no Batel',
    description: 'Apartamento de alto padrão com 3 suítes, varanda gourmet e vista panorâmica da cidade. Localizado no coração do Batel, próximo aos melhores restaurantes e shopping centers. Condomínio com infraestrutura completa incluindo piscina, academia, salão de festas e segurança 24h.',
    price: 850000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 4,
    area: 120,
    parking: 2,
    location: 'Batel, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Batel',
    zipCode: '80420-000',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Varanda Gourmet', 'Suíte Master', 'Piscina', 'Academia', 'Portaria 24h', 'Elevador', 'Ar Condicionado'],
    rating: 4.8,
    agentId: 1
  },
  {
    id: 2,
    title: 'Casa Contemporânea em Condomínio Fechado',
    description: 'Casa moderna com arquitetura contemporânea, 4 suítes, piscina privativa e área gourmet completa. Localizada em condomínio fechado de alto padrão com segurança 24h, área verde preservada e clube completo.',
    price: 1200000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 5,
    area: 280,
    parking: 3,
    location: 'Santa Felicidade, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Santa Felicidade',
    zipCode: '82410-000',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Piscina Privativa', 'Área Gourmet', 'Jardim', 'Churrasqueira', 'Suíte Master', 'Closet', 'Aquecimento Solar'],
    rating: 4.9,
    agentId: 1
  },
  {
    id: 3,
    title: 'Apartamento Compacto no Centro',
    description: 'Apartamento funcional e bem localizado no centro de Curitiba. Ideal para jovens profissionais ou investimento. Próximo ao transporte público, universidades e comércio. Prédio com portaria e elevador.',
    price: 2800,
    type: 'aluguel',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    parking: 1,
    location: 'Centro, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Centro',
    zipCode: '80010-000',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Mobiliado', 'Portaria', 'Elevador', 'Próximo ao Metrô', 'Internet Inclusa'],
    rating: 4.5,
    agentId: 2
  },

  // PARANÁ - Londrina
  {
    id: 4,
    title: 'Casa Familiar na Gleba Palhano',
    description: 'Casa espaçosa com 3 quartos, sendo 1 suíte, em um dos bairros mais valorizados de Londrina. Quintal amplo, garagem para 2 carros e área de lazer. Próxima a escolas, supermercados e parques.',
    price: 650000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    parking: 2,
    location: 'Gleba Palhano, Londrina - PR',
    city: 'Londrina',
    state: 'PR',
    neighborhood: 'Gleba Palhano',
    zipCode: '86050-000',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Quintal Amplo', 'Área de Lazer', 'Garagem Coberta', 'Próximo a Escolas', 'Jardim'],
    rating: 4.6,
    agentId: 3
  },

  // SÃO PAULO - Capital
  {
    id: 5,
    title: 'Cobertura Duplex em Moema',
    description: 'Cobertura duplex de luxo com 4 suítes, terraço com piscina privativa e vista deslumbrante da cidade. Localizada em uma das regiões mais nobres de São Paulo, próxima ao Parque Ibirapuera e aos melhores restaurantes da cidade.',
    price: 2800000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    parking: 3,
    location: 'Moema, São Paulo - SP',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Moema',
    zipCode: '04077-000',
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Terraço Privativo', 'Piscina', 'Vista Panorâmica', 'Suíte Master', 'Closet', 'Lareira', 'Adega'],
    rating: 4.9,
    agentId: 1
  },
  {
    id: 6,
    title: 'Apartamento Studio em Pinheiros',
    description: 'Studio moderno e funcional no coração de Pinheiros. Ideal para jovens profissionais que buscam praticidade e localização privilegiada. Próximo ao metrô, bares, restaurantes e vida noturna agitada.',
    price: 3500,
    type: 'aluguel',
    bedrooms: 0,
    bathrooms: 1,
    area: 35,
    parking: 1,
    location: 'Pinheiros, São Paulo - SP',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Pinheiros',
    zipCode: '05422-000',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Mobiliado', 'Ar Condicionado', 'Próximo ao Metrô', 'Portaria 24h', 'Internet Inclusa'],
    rating: 4.4,
    agentId: 2
  },

  // SÃO PAULO - Campinas
  {
    id: 7,
    title: 'Casa de Alto Padrão no Cambuí',
    description: 'Casa de arquitetura moderna com 4 suítes, piscina, área gourmet e jardim paisagístico. Localizada no nobre bairro Cambuí, próxima ao Parque Taquaral e aos principais shopping centers de Campinas.',
    price: 1800000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 5,
    area: 350,
    parking: 4,
    location: 'Cambuí, Campinas - SP',
    city: 'Campinas',
    state: 'SP',
    neighborhood: 'Cambuí',
    zipCode: '13025-000',
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Piscina', 'Área Gourmet', 'Jardim Paisagístico', 'Suíte Master', 'Closet', 'Escritório', 'Aquecimento Solar'],
    rating: 4.8,
    agentId: 1
  },

  // SANTA CATARINA - Florianópolis
  {
    id: 8,
    title: 'Apartamento Frente Mar em Canasvieiras',
    description: 'Apartamento com vista para o mar na praia de Canasvieiras. 2 quartos, varanda ampla e acesso direto à praia. Ideal para quem busca qualidade de vida ou investimento em temporada. Condomínio com piscina e área de lazer.',
    price: 750000,
    type: 'venda',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parking: 1,
    location: 'Canasvieiras, Florianópolis - SC',
    city: 'Florianópolis',
    state: 'SC',
    neighborhood: 'Canasvieiras',
    zipCode: '88054-000',
    image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Vista para o Mar', 'Varanda Ampla', 'Piscina', 'Acesso à Praia', 'Portaria', 'Área de Lazer'],
    rating: 4.7,
    agentId: 3
  },
  {
    id: 9,
    title: 'Casa de Praia em Jurerê Internacional',
    description: 'Casa de luxo em Jurerê Internacional com 5 suítes, piscina infinity e área gourmet completa. A apenas 200 metros da praia, em condomínio fechado de alto padrão com segurança 24h e clube privativo.',
    price: 3200000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 6,
    area: 420,
    parking: 4,
    location: 'Jurerê Internacional, Florianópolis - SC',
    city: 'Florianópolis',
    state: 'SC',
    neighborhood: 'Jurerê Internacional',
    zipCode: '88053-000',
    image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Piscina Infinity', 'Vista para o Mar', 'Área Gourmet', 'Jardim', 'Suíte Master', 'Closet', 'Sauna'],
    rating: 4.9,
    agentId: 1
  },

  // SANTA CATARINA - Blumenau
  {
    id: 10,
    title: 'Apartamento Familiar no Centro',
    description: 'Apartamento espaçoso com 3 quartos no centro de Blumenau. Próximo ao comércio, escolas e pontos turísticos. Prédio com elevador, portaria e área de lazer. Ideal para famílias que buscam praticidade e localização.',
    price: 4200,
    type: 'aluguel',
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    parking: 2,
    location: 'Centro, Blumenau - SC',
    city: 'Blumenau',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '89010-000',
    image: 'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Elevador', 'Portaria', 'Área de Lazer', 'Próximo ao Comércio', 'Varanda'],
    rating: 4.5,
    agentId: 2
  },

  // Mais propriedades para completar o catálogo
  {
    id: 11,
    title: 'Loft Industrial em Vila Madalena',
    description: 'Loft com conceito industrial no coração da Vila Madalena. Espaço integrado, pé direito alto e acabamentos modernos. Localização privilegiada próxima a bares, restaurantes e vida cultural de São Paulo.',
    price: 5800,
    type: 'aluguel',
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    parking: 1,
    location: 'Vila Madalena, São Paulo - SP',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Vila Madalena',
    zipCode: '05433-000',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Conceito Industrial', 'Pé Direito Alto', 'Mobiliado', 'Ar Condicionado', 'Próximo ao Metrô'],
    rating: 4.6,
    agentId: 2
  },
  {
    id: 12,
    title: 'Casa Colonial em Águas Claras',
    description: 'Casa de estilo colonial com 3 quartos, jardim amplo e varanda. Localizada em bairro residencial tranquilo, ideal para famílias. Próxima a escolas, parques e comércio local.',
    price: 580000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    parking: 2,
    location: 'Águas Claras, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Águas Claras',
    zipCode: '82640-000',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Estilo Colonial', 'Jardim Amplo', 'Varanda', 'Garagem Coberta', 'Próximo a Escolas'],
    rating: 4.4,
    agentId: 3
  },

  // NOVAS CASAS PARANÁ (10 adicionais)
  {
    id: 13,
    title: 'Casa Moderna no Ecoville',
    description: 'Casa contemporânea com 4 quartos, sendo 2 suítes, em condomínio fechado no Ecoville. Área gourmet com churrasqueira, piscina aquecida e jardim paisagístico. Próxima ao Shopping Palladium e principais vias de acesso.',
    price: 980000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    parking: 3,
    location: 'Ecoville, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Ecoville',
    zipCode: '81200-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Piscina Aquecida', 'Área Gourmet', 'Jardim Paisagístico', 'Condomínio Fechado', 'Churrasqueira', 'Closet'],
    rating: 4.7,
    agentId: 1
  },
  {
    id: 14,
    title: 'Sobrado Familiar no Portão',
    description: 'Sobrado espaçoso com 3 quartos, sala ampla e quintal com área de lazer. Localizado no tradicional bairro Portão, próximo a escolas, comércio e transporte público. Ideal para famílias que buscam conforto e praticidade.',
    price: 450000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: 2,
    location: 'Portão, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Portão',
    zipCode: '81070-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Quintal Amplo', 'Área de Lazer', 'Garagem Coberta', 'Próximo a Escolas', 'Sala Ampla'],
    rating: 4.3,
    agentId: 2
  },
  {
    id: 15,
    title: 'Casa de Campo em São José dos Pinhais',
    description: 'Casa de campo com 5 quartos em terreno de 1000m². Piscina, área gourmet, pomar e horta. Localizada em condomínio rural com segurança 24h. Ideal para quem busca tranquilidade próximo à capital.',
    price: 750000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 3,
    area: 200,
    parking: 4,
    location: 'São José dos Pinhais - PR',
    city: 'São José dos Pinhais',
    state: 'PR',
    neighborhood: 'Centro',
    zipCode: '83005-000',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Terreno 1000m²', 'Piscina', 'Pomar', 'Horta', 'Área Gourmet', 'Condomínio Rural'],
    rating: 4.8,
    agentId: 3
  },
  {
    id: 16,
    title: 'Casa Térrea no Jardim Botânico',
    description: 'Casa térrea com 3 suítes, sala de estar e jantar integradas, cozinha planejada e área gourmet. Localizada no charmoso bairro Jardim Botânico, próxima ao parque e com fácil acesso ao centro da cidade.',
    price: 720000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parking: 2,
    location: 'Jardim Botânico, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Jardim Botânico',
    zipCode: '80210-000',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Térrea', 'Cozinha Planejada', 'Área Gourmet', 'Próximo ao Parque', 'Suítes'],
    rating: 4.6,
    agentId: 1
  },
  {
    id: 17,
    title: 'Casa Duplex no Bigorrilho',
    description: 'Casa duplex moderna com 4 quartos, sendo 2 suítes, escritório e área de lazer completa. Localizada no valorizado bairro Bigorrilho, próxima ao Shopping Mueller e com excelente infraestrutura urbana.',
    price: 850000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    parking: 2,
    location: 'Bigorrilho, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Bigorrilho',
    zipCode: '80730-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Duplex', 'Escritório', 'Área de Lazer', 'Próximo ao Shopping', 'Suítes'],
    rating: 4.5,
    agentId: 2
  },
  {
    id: 18,
    title: 'Casa Geminada no Cajuru',
    description: 'Casa geminada com 3 quartos, sala ampla e quintal nos fundos. Localizada no tradicional bairro Cajuru, com ótima localização e acesso facilitado ao transporte público. Ideal para primeira moradia.',
    price: 320000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parking: 1,
    location: 'Cajuru, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Cajuru',
    zipCode: '82900-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Geminada', 'Quintal', 'Sala Ampla', 'Transporte Público', 'Primeira Moradia'],
    rating: 4.2,
    agentId: 3
  },
  {
    id: 19,
    title: 'Casa de Luxo no Alto da Glória',
    description: 'Casa de alto padrão com 5 suítes, piscina com deck, sauna e adega climatizada. Localizada no exclusivo bairro Alto da Glória, com vista panorâmica da cidade e acabamentos de primeira linha.',
    price: 1500000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 6,
    area: 400,
    parking: 4,
    location: 'Alto da Glória, Curitiba - PR',
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Alto da Glória',
    zipCode: '80030-000',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Luxo', 'Vista Panorâmica', 'Piscina com Deck', 'Sauna', 'Adega Climatizada'],
    rating: 4.9,
    agentId: 1
  },
  {
    id: 20,
    title: 'Casa Condomínio Fechado em Maringá',
    description: 'Casa em condomínio fechado com 4 quartos, sendo 2 suítes, piscina e área gourmet. Localizada em Maringá, com segurança 24h, área verde e clube completo. Excelente para famílias.',
    price: 680000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 190,
    parking: 3,
    location: 'Zona 7, Maringá - PR',
    city: 'Maringá',
    state: 'PR',
    neighborhood: 'Zona 7',
    zipCode: '87020-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Condomínio Fechado', 'Piscina', 'Área Gourmet', 'Segurança 24h', 'Clube'],
    rating: 4.6,
    agentId: 2
  },
  {
    id: 21,
    title: 'Casa Térrea em Ponta Grossa',
    description: 'Casa térrea com 3 quartos, sala ampla e quintal espaçoso. Localizada em bairro residencial de Ponta Grossa, próxima a escolas e comércio. Ideal para famílias que buscam tranquilidade.',
    price: 380000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    parking: 2,
    location: 'Centro, Ponta Grossa - PR',
    city: 'Ponta Grossa',
    state: 'PR',
    neighborhood: 'Centro',
    zipCode: '84010-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Térrea', 'Quintal Espaçoso', 'Sala Ampla', 'Próximo a Escolas', 'Bairro Residencial'],
    rating: 4.3,
    agentId: 3
  },
  {
    id: 22,
    title: 'Casa Moderna em Foz do Iguaçu',
    description: 'Casa moderna com 4 quartos, sendo 2 suítes, piscina e área gourmet. Localizada em Foz do Iguaçu, próxima às Cataratas e com excelente infraestrutura. Ideal para moradia ou investimento turístico.',
    price: 520000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 170,
    parking: 2,
    location: 'Centro, Foz do Iguaçu - PR',
    city: 'Foz do Iguaçu',
    state: 'PR',
    neighborhood: 'Centro',
    zipCode: '85851-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Moderna', 'Piscina', 'Área Gourmet', 'Próximo às Cataratas', 'Investimento Turístico'],
    rating: 4.5,
    agentId: 1
  },

  // CASCAVEL - PR (4 casas específicas)
  {
    id: 23,
    title: 'Casa Familiar no Centro de Cascavel',
    description: 'Casa espaçosa com 4 quartos, sendo 1 suíte, sala ampla e quintal com churrasqueira. Localizada no centro de Cascavel, próxima a escolas, comércio e serviços. Ideal para famílias que buscam praticidade e localização central.',
    price: 420000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 2,
    area: 160,
    parking: 2,
    location: 'Centro, Cascavel - PR',
    city: 'Cascavel',
    state: 'PR',
    neighborhood: 'Centro',
    zipCode: '85801-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Centro da Cidade', 'Quintal com Churrasqueira', 'Sala Ampla', 'Próximo a Escolas', 'Garagem Coberta'],
    rating: 4.4,
    agentId: 2
  },
  {
    id: 24,
    title: 'Casa Moderna no Jardim Cristal',
    description: 'Casa moderna com 3 suítes, área gourmet e piscina. Localizada no nobre bairro Jardim Cristal em Cascavel, com acabamentos de primeira linha e projeto arquitetônico diferenciado. Condomínio com segurança.',
    price: 650000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parking: 3,
    location: 'Jardim Cristal, Cascavel - PR',
    city: 'Cascavel',
    state: 'PR',
    neighborhood: 'Jardim Cristal',
    zipCode: '85807-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Bairro Nobre', 'Piscina', 'Área Gourmet', 'Acabamentos Premium', 'Condomínio com Segurança'],
    rating: 4.7,
    agentId: 1
  },
  {
    id: 25,
    title: 'Casa Térrea no Coqueiral',
    description: 'Casa térrea com 3 quartos, sala de estar e jantar, cozinha planejada e área de serviço. Localizada no tradicional bairro Coqueiral em Cascavel, próxima a parques e com fácil acesso ao centro.',
    price: 350000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    parking: 2,
    location: 'Coqueiral, Cascavel - PR',
    city: 'Cascavel',
    state: 'PR',
    neighborhood: 'Coqueiral',
    zipCode: '85805-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Térrea', 'Cozinha Planejada', 'Próximo a Parques', 'Bairro Tradicional', 'Área de Serviço'],
    rating: 4.3,
    agentId: 3
  },
  {
    id: 26,
    title: 'Casa de Alto Padrão no Pacaembu',
    description: 'Casa de alto padrão com 5 quartos, sendo 3 suítes, piscina com deck, sauna e área gourmet completa. Localizada no exclusivo bairro Pacaembu em Cascavel, com projeto paisagístico e acabamentos de luxo.',
    price: 890000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 4,
    area: 250,
    parking: 4,
    location: 'Pacaembu, Cascavel - PR',
    city: 'Cascavel',
    state: 'PR',
    neighborhood: 'Pacaembu',
    zipCode: '85806-000',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Alto Padrão', 'Piscina com Deck', 'Sauna', 'Projeto Paisagístico', 'Acabamentos de Luxo'],
    rating: 4.8,
    agentId: 1
  },

  // NOVAS CASAS SÃO PAULO (10 adicionais)
  {
    id: 27,
    title: 'Casa Contemporânea em Alphaville',
    description: 'Casa contemporânea com 4 suítes, piscina infinity e área gourmet em condomínio fechado de Alphaville. Projeto arquitetônico moderno, automação residencial e acabamentos de primeira linha.',
    price: 2200000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 5,
    area: 350,
    parking: 4,
    location: 'Alphaville, Barueri - SP',
    city: 'Barueri',
    state: 'SP',
    neighborhood: 'Alphaville',
    zipCode: '06454-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Condomínio Fechado', 'Piscina Infinity', 'Automação Residencial', 'Projeto Moderno', 'Alphaville'],
    rating: 4.9,
    agentId: 1
  },
  {
    id: 28,
    title: 'Casa de Praia em Guarujá',
    description: 'Casa de praia com 5 quartos, sendo 3 suítes, piscina e área gourmet. Localizada a 300m da praia do Guarujá, com vista para o mar e acesso privativo à praia. Ideal para temporada e investimento.',
    price: 1800000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    parking: 3,
    location: 'Praia da Enseada, Guarujá - SP',
    city: 'Guarujá',
    state: 'SP',
    neighborhood: 'Enseada',
    zipCode: '11440-000',
    image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Praia', 'Vista para o Mar', 'Acesso Privativo à Praia', 'Piscina', 'Investimento'],
    rating: 4.8,
    agentId: 2
  },
  {
    id: 29,
    title: 'Casa Moderna em Ribeirão Preto',
    description: 'Casa moderna com 4 quartos, sendo 2 suítes, piscina aquecida e área gourmet. Localizada em condomínio fechado em Ribeirão Preto, com segurança 24h e clube completo.',
    price: 750000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    parking: 3,
    location: 'Jardim Canadá, Ribeirão Preto - SP',
    city: 'Ribeirão Preto',
    state: 'SP',
    neighborhood: 'Jardim Canadá',
    zipCode: '14024-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Condomínio Fechado', 'Piscina Aquecida', 'Área Gourmet', 'Segurança 24h', 'Clube'],
    rating: 4.6,
    agentId: 3
  },
  {
    id: 30,
    title: 'Casa Colonial em Campos do Jordão',
    description: 'Casa colonial com 3 suítes, lareira e jardim paisagístico. Localizada em Campos do Jordão, com arquitetura típica da região, próxima ao centro e com vista para as montanhas.',
    price: 980000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parking: 2,
    location: 'Centro, Campos do Jordão - SP',
    city: 'Campos do Jordão',
    state: 'SP',
    neighborhood: 'Centro',
    zipCode: '12460-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Arquitetura Colonial', 'Lareira', 'Vista para Montanhas', 'Jardim Paisagístico', 'Centro'],
    rating: 4.7,
    agentId: 1
  },
  {
    id: 31,
    title: 'Casa Térrea em Santos',
    description: 'Casa térrea com 4 quartos, sendo 2 suítes, próxima à praia em Santos. Quintal amplo, área gourmet e garagem para 3 carros. Localização privilegiada a poucos metros do mar.',
    price: 850000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 190,
    parking: 3,
    location: 'Gonzaga, Santos - SP',
    city: 'Santos',
    state: 'SP',
    neighborhood: 'Gonzaga',
    zipCode: '11060-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Próximo à Praia', 'Quintal Amplo', 'Área Gourmet', 'Casa Térrea', 'Gonzaga'],
    rating: 4.5,
    agentId: 2
  },
  {
    id: 32,
    title: 'Casa Duplex em São José dos Campos',
    description: 'Casa duplex com 4 quartos, sendo 3 suítes, escritório e área de lazer. Localizada em condomínio fechado em São José dos Campos, próxima ao Parque Tecnológico.',
    price: 720000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 4,
    area: 210,
    parking: 2,
    location: 'Jardim Aquarius, São José dos Campos - SP',
    city: 'São José dos Campos',
    state: 'SP',
    neighborhood: 'Jardim Aquarius',
    zipCode: '12246-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Duplex', 'Escritório', 'Condomínio Fechado', 'Próximo ao Parque Tecnológico', 'Área de Lazer'],
    rating: 4.4,
    agentId: 3
  },
  {
    id: 33,
    title: 'Casa de Luxo em Itu',
    description: 'Casa de luxo com 5 suítes, piscina com deck, sauna e adega climatizada. Localizada em condomínio de alto padrão em Itu, com campo de golfe e clube completo.',
    price: 1200000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 6,
    area: 320,
    parking: 4,
    location: 'Condomínio Fazenda Vila Real, Itu - SP',
    city: 'Itu',
    state: 'SP',
    neighborhood: 'Fazenda Vila Real',
    zipCode: '13301-000',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Luxo', 'Campo de Golfe', 'Piscina com Deck', 'Sauna', 'Adega Climatizada'],
    rating: 4.9,
    agentId: 1
  },
  {
    id: 34,
    title: 'Casa Familiar em Sorocaba',
    description: 'Casa familiar com 3 quartos, sendo 1 suíte, quintal amplo e área gourmet. Localizada em bairro residencial de Sorocaba, próxima a escolas e comércio.',
    price: 480000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: 2,
    location: 'Jardim Vergueiro, Sorocaba - SP',
    city: 'Sorocaba',
    state: 'SP',
    neighborhood: 'Jardim Vergueiro',
    zipCode: '18030-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Familiar', 'Quintal Amplo', 'Área Gourmet', 'Bairro Residencial', 'Próximo a Escolas'],
    rating: 4.3,
    agentId: 2
  },
  {
    id: 35,
    title: 'Casa Moderna em Jundiaí',
    description: 'Casa moderna com 4 quartos, sendo 2 suítes, piscina e área gourmet. Localizada em condomínio fechado em Jundiaí, com segurança 24h e área verde preservada.',
    price: 680000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    parking: 3,
    location: 'Medeiros, Jundiaí - SP',
    city: 'Jundiaí',
    state: 'SP',
    neighborhood: 'Medeiros',
    zipCode: '13212-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Condomínio Fechado', 'Piscina', 'Área Gourmet', 'Segurança 24h', 'Área Verde'],
    rating: 4.5,
    agentId: 3
  },
  {
    id: 36,
    title: 'Casa Térrea em Piracicaba',
    description: 'Casa térrea com 3 quartos, sala ampla e quintal espaçoso. Localizada em bairro tradicional de Piracicaba, próxima ao centro e com fácil acesso a universidades.',
    price: 420000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    parking: 2,
    location: 'Centro, Piracicaba - SP',
    city: 'Piracicaba',
    state: 'SP',
    neighborhood: 'Centro',
    zipCode: '13400-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Térrea', 'Quintal Espaçoso', 'Próximo ao Centro', 'Próximo a Universidades', 'Bairro Tradicional'],
    rating: 4.2,
    agentId: 1
  },

  // NOVAS CASAS SANTA CATARINA (10 adicionais)
  {
    id: 37,
    title: 'Casa de Praia em Bombinhas',
    description: 'Casa de praia com 4 quartos, sendo 2 suítes, a 200m da praia de Bombinhas. Área gourmet, piscina e vista parcial do mar. Ideal para temporada e investimento turístico.',
    price: 980000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 160,
    parking: 2,
    location: 'Centro, Bombinhas - SC',
    city: 'Bombinhas',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '88215-000',
    image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Praia', 'Vista Parcial do Mar', 'Piscina', 'Área Gourmet', 'Investimento Turístico'],
    rating: 4.7,
    agentId: 2
  },
  {
    id: 38,
    title: 'Casa Moderna em Joinville',
    description: 'Casa moderna com 3 suítes, área gourmet e piscina aquecada. Localizada em condomínio fechado em Joinville, com segurança 24h e clube completo.',
    price: 650000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 3,
    area: 170,
    parking: 3,
    location: 'América, Joinville - SC',
    city: 'Joinville',
    state: 'SC',
    neighborhood: 'América',
    zipCode: '89204-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Condomínio Fechado', 'Piscina Aquecida', 'Área Gourmet', 'Segurança 24h', 'Clube'],
    rating: 4.6,
    agentId: 3
  },
  {
    id: 39,
    title: 'Casa Colonial em Pomerode',
    description: 'Casa de estilo colonial alemão com 4 quartos, lareira e jardim paisagístico. Localizada no centro histórico de Pomerode, com arquitetura típica da região.',
    price: 520000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    parking: 2,
    location: 'Centro, Pomerode - SC',
    city: 'Pomerode',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '89107-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Estilo Colonial Alemão', 'Centro Histórico', 'Lareira', 'Jardim Paisagístico', 'Arquitetura Típica'],
    rating: 4.5,
    agentId: 1
  },
  {
    id: 40,
    title: 'Casa de Luxo em Balneário Camboriú',
    description: 'Casa de luxo com 5 suítes, piscina infinity e vista para o mar. Localizada em condomínio de alto padrão em Balneário Camboriú, próxima à praia central.',
    price: 2500000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 6,
    area: 400,
    parking: 4,
    location: 'Centro, Balneário Camboriú - SC',
    city: 'Balneário Camboriú',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '88330-000',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Luxo', 'Vista para o Mar', 'Piscina Infinity', 'Condomínio Alto Padrão', 'Praia Central'],
    rating: 4.9,
    agentId: 1
  },
  {
    id: 41,
    title: 'Casa Familiar em Chapecó',
    description: 'Casa familiar com 4 quartos, sendo 2 suítes, quintal amplo e área gourmet. Localizada em bairro residencial de Chapecó, próxima a escolas e comércio.',
    price: 480000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 160,
    parking: 2,
    location: 'Centro, Chapecó - SC',
    city: 'Chapecó',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '89801-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Familiar', 'Quintal Amplo', 'Área Gourmet', 'Bairro Residencial', 'Próximo a Escolas'],
    rating: 4.3,
    agentId: 2
  },
  {
    id: 42,
    title: 'Casa Térrea em Criciúma',
    description: 'Casa térrea com 3 quartos, sendo 1 suíte, sala ampla e quintal com churrasqueira. Localizada em bairro tradicional de Criciúma, próxima ao centro.',
    price: 380000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    parking: 2,
    location: 'Centro, Criciúma - SC',
    city: 'Criciúma',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '88801-000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Térrea', 'Quintal com Churrasqueira', 'Sala Ampla', 'Bairro Tradicional', 'Próximo ao Centro'],
    rating: 4.2,
    agentId: 3
  },
  {
    id: 43,
    title: 'Casa Moderna em Itajaí',
    description: 'Casa moderna com 4 quartos, sendo 2 suítes, piscina e área gourmet. Localizada próxima ao porto de Itajaí, com fácil acesso às praias da região.',
    price: 620000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    parking: 3,
    location: 'Centro, Itajaí - SC',
    city: 'Itajaí',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '88301-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571449/pexels-photo-1571449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Moderna', 'Piscina', 'Área Gourmet', 'Próximo ao Porto', 'Acesso às Praias'],
    rating: 4.4,
    agentId: 1
  },
  {
    id: 44,
    title: 'Casa de Campo em São Bento do Sul',
    description: 'Casa de campo com 5 quartos em terreno de 2000m². Piscina, pomar e área de lazer completa. Localizada em região serrana com clima ameno.',
    price: 580000,
    type: 'venda',
    bedrooms: 5,
    bathrooms: 3,
    area: 200,
    parking: 4,
    location: 'Centro, São Bento do Sul - SC',
    city: 'São Bento do Sul',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '89283-000',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Campo', 'Terreno 2000m²', 'Piscina', 'Pomar', 'Região Serrana'],
    rating: 4.6,
    agentId: 2
  },
  {
    id: 45,
    title: 'Casa Duplex em Lages',
    description: 'Casa duplex com 4 quartos, sendo 3 suítes, lareira e área gourmet. Localizada em condomínio fechado em Lages, com segurança 24h.',
    price: 450000,
    type: 'venda',
    bedrooms: 4,
    bathrooms: 4,
    area: 170,
    parking: 2,
    location: 'Centro, Lages - SC',
    city: 'Lages',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '88501-000',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa Duplex', 'Lareira', 'Área Gourmet', 'Condomínio Fechado', 'Segurança 24h'],
    rating: 4.3,
    agentId: 3
  },
  {
    id: 46,
    title: 'Casa de Praia em Porto Belo',
    description: 'Casa de praia com 3 suítes, piscina e vista para o mar. Localizada a 100m da praia de Porto Belo, ideal para temporada e investimento.',
    price: 850000,
    type: 'venda',
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    parking: 2,
    location: 'Centro, Porto Belo - SC',
    city: 'Porto Belo',
    state: 'SC',
    neighborhood: 'Centro',
    zipCode: '88210-000',
    image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    images: [
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
    ],
    features: ['Casa de Praia', 'Vista para o Mar', 'Piscina', '100m da Praia', 'Investimento'],
    rating: 4.7,
    agentId: 1
  }
];

export const getPropertyById = (id: number): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getAgentById = (id: number): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};

export const getPropertiesByCity = (city: string): Property[] => {
  return properties.filter(property => property.city.toLowerCase() === city.toLowerCase());
};

export const getPropertiesByState = (state: string): Property[] => {
  return properties.filter(property => property.state === state);
};

export const getPropertiesByType = (type: 'venda' | 'aluguel'): Property[] => {
  return properties.filter(property => property.type === type);
};

export const getPropertiesByPriceRange = (minPrice: number, maxPrice: number): Property[] => {
  return properties.filter(property => property.price >= minPrice && property.price <= maxPrice);
};