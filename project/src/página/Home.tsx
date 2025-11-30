import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Search } from 'lucide-react';
import { properties, Property } from '../data/imoveis';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  // IMÓVEIS EM DESTAQUE — exatamente na ordem que você pediu (10, 2, 3, 4, 5)
  const featuredProperties = [10, 2, 3, 4, 5]
    .map(id => properties.find(p => p.id === id))
    .filter((p): p is Property => p !== undefined)
    .map(property => ({
      id: property.id,
      title: property.tipo,                    // já está 100% correto no imoveis.ts
      location: property.endereco,
      price: property.valor,
      type: property.categoria,
      rating: property.rating || 4.8,
      bedrooms: property.quartos,
      bathrooms: property.banheiros,
      area: property.area,
      image: property.image || '/placeholder.jpg'
    }));

  return (
    <div className="min-h-screen">

      {/* HERO SECTION — IMAGEM DE FUNDO VOLTOU E MAIS LINDA QUE NUNCA */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* IMAGEM DE FUNDO CORRIGIDA E FUNCIONANDO */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'ur[](https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Encontre o Imóvel dos
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Seus Sonhos
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            <span className="text-yellow-400 font-bold">HeyHouse</span> — Transformando sonhos em lares
          </p>

          <p className="text-lg mb-12 text-gray-300">
            A melhor plataforma de venda e aluguel no Sul do Brasil. Mais de {properties.length} opções esperando por você.
          </p>

          {/* BARRA DE BUSCA */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Digite a cidade, bairro ou endereço..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="venda">Comprar</option>
                <option value="aluguel">Alugar</option>
              </select>

              <Link
                to={`/imoveis?q=${searchQuery}&type=${searchType}`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold transition shadow-lg"
              >
                <Search size={20} />
                Buscar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMÓVEIS EM DESTAQUE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Imóveis em Destaque</h2>
            <p className="text-xl text-gray-600">Selecionamos os melhores imóveis para você</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <div className="relative group">
                  <Link to={`/imovel/${property.id}`}>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* BADGE ALUGUEL/VENDA */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                      property.type === 'aluguel' ? 'bg-blue-600' : 'bg-green-600'
                    } text-white`}>
                      {property.type === 'aluguel' ? 'ALUGUEL' : 'VENDA'}
                    </span>
                  </div>

                  {/* RATING */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    <Link to={`/imovel/${property.id}`} className="hover:text-blue-600 transition">
                      {property.title}
                    </Link>
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm line-clamp-1">{property.location}</span>
                  </div>

                  <div className="text-2xl font-extrabold text-blue-600">
                    R$ {property.price.toLocaleString('pt-BR')}
                    {property.type === 'aluguel' && <span className="text-base font-normal text-gray-500">/mês</span>}
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mt-5">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{property.bedrooms}</span> quartos
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{property.bathrooms}</span> banheiros
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{property.area}</span> m²
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/imoveis"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 inline-flex items-center gap-3 text-lg font-semibold transition shadow-lg"
            >
              Ver Todos os Imóveis
              <TrendingUp size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* BOTÃO WHATSAPP */}
      <div className="text-center py-16 bg-white">
        <a
          href="https://wa.me/5545920029986"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-600 transition shadow-xl"
        >
          Falar com um Especialista no WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Home;