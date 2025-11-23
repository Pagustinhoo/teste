import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Search } from 'lucide-react';
import { properties } from '../data/imoveis';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  // Get featured properties (first 6)
  const featuredProperties = properties.slice(0, 6).map(property => ({
    id: property.id,
    title: property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1),
    location: property.endereco,
    price: property.valor,
    type: property.categoria,
    rating: 4.5, // Default rating since it's not in the database
    bedrooms: property.quartos,
    bathrooms: property.banheiros,
    area: property.area,
    image: property.image
  }));


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Encontre o Imóvel dos
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Seus Sonhos
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-200 max-w-3xl mx-auto">
              <span className="text-yellow-400 font-bold">HeyHouse</span> - Transformando sonhos em lares
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto">
              A melhor plataforma de venda e aluguel de imóveis no Paraná, Santa Catarina e Rio Grande do Sul. 
              Mais de {properties.length} opções esperando por você.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Digite a cidade, bairro ou endereço..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="venda">Comprar</option>
                  <option value="aluguel">Alugar</option>
                </select>

                <Link
                  to={`/imoveis?q=${searchQuery}&type=${searchType}`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
                >
                  <Search size={20} />
                  <span>Buscar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Imóveis em Destaque</h2>
            <p className="text-xl text-gray-600">Selecionamos os melhores imóveis para você no Paraná, Santa Catarina e Rio Grande do Sul</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/imovel/${property.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.type === 'venda' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {property.type === 'venda' ? 'Venda' : 'Aluguel'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-sm">{property.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {property.price.toLocaleString('pt-BR')}
                      {property.type === 'aluguel' && <span className="text-sm text-gray-500">/mês</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{property.bedrooms} quartos</span>
                    <span>{property.bathrooms} banheiros</span>
                    <span>{property.area}m²</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/imoveis"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Ver Todos os Imóveis</span>
              <TrendingUp size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossas Regiões de Atuação</h2>
            <p className="text-xl text-gray-600">Encontre seu imóvel ideal em três dos melhores estados do Brasil</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🌲</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Paraná</h3>
              <p className="text-gray-600 mb-4">
                Cascavel, Curitiba, Londrina, Maringá, Foz do Iguaçu, Ponta Grossa
              </p>
              <div className="text-blue-600 font-semibold">
                {properties.filter((p: any) => p.state === 'PR').length} imóveis disponíveis
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🏖️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Santa Catarina</h3>
              <p className="text-gray-600 mb-4">
                Florianópolis, Joinville, Blumenau, Itajaí, Balneário Camboriú, Chapecó
              </p>
              <div className="text-blue-600 font-semibold">
                {properties.filter((p: any) => p.state === 'SC').length} imóveis disponíveis
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🏙️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Rio Grande do Sul</h3>
              <p className="text-gray-600 mb-4">
                Porto Alegre, Caxias do Sul, Gramado
              </p>
              <div className="text-blue-600 font-semibold">
                {properties.filter((p: any) => p.state === 'RS').length} imóveis disponíveis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto para Encontrar seu Novo Lar?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Entre em contato conosco e deixe nossos especialistas ajudarem você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:heliasandrei16@gmail.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Falar com Especialista
            </a>
            <Link
              to="/imoveis"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Explorar Imóveis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;