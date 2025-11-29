import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Search, Heart, Share2 } from 'lucide-react';
import { properties } from '../data/imoveis';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Salvar no localStorage
  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Featured properties (1–6)
  const featuredProperties = properties.slice(0, 6).map(property => ({
    id: property.id,
    title: property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1),
    location: property.endereco,
    price: property.valor,
    type: property.categoria,
    rating: property.rating,
    bedrooms: property.quartos,
    bathrooms: property.banheiros,
    area: property.area,
    image: property.image
  }));

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Encontre o Imóvel dos
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

          {/* BUSCA */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4">

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Digite a cidade, bairro ou endereço..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg"
                />
              </div>

              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-3 border rounded-lg"
              >
                <option value="all">Todos</option>
                <option value="venda">Comprar</option>
                <option value="aluguel">Alugar</option>
              </select>

              <Link
                to={`/imoveis?q=${searchQuery}&type=${searchType}`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
              >
                <Search size={20} />
                Buscar
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* IMÓVEIS EM DESTAQUE */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Imóveis em Destaque</h2>
            <p className="text-xl text-gray-600">Selecionamos os melhores imóveis para você</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition"
              >

                {/* IMAGEM */}
                <div className="relative">
                  <Link to={`/imovel/${property.id}`}>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  {/* CATEGORY */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.type === 'venda' ? 'bg-green-500' : 'bg-blue-500'
                    } text-white`}>
                      {property.type === 'venda' ? 'Venda' : 'Aluguel'}
                    </span>
                  </div>

                  {/* RATING */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span>{property.rating}</span>
                  </div>

                  {/* FAVORITAR */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(property.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}
                    />
                  </button>

                  {/* COMPARTILHAR */}
                  <button
                    onClick={() => navigator.share?.({ title: property.title, url: window.location.href })}
                    className="absolute bottom-4 right-14 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                  >
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* INFO */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    <Link to={`/imovel/${property.id}`}>{property.title}</Link>
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{property.location}</span>
                  </div>

                  <div className="text-2xl font-bold text-blue-600">
                    R$ {property.price.toLocaleString('pt-BR')}
                    {property.type === 'aluguel' && <span className="text-sm text-gray-500">/mês</span>}
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <span>{property.bedrooms} quartos</span>
                    <span>{property.bathrooms} banheiros</span>
                    <span>{property.area}m²</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/imoveis"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              Ver Todos os Imóveis
              <TrendingUp size={20} />
            </Link>
          </div>

        </div>
      </section>

      {/* WHATSAPP */}
      <div className="text-center py-16">
        <a
          href="https://wa.me/5545920029986"
          target="_blank"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold"
        >
          Falar com Especialista
        </a>
      </div>

    </div>
  );
};

export default Home;
