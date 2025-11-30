import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import * as propertiesModule from '../data/imoveis';
import type { Property } from '../data/imoveis';

const _raw = (propertiesModule as any).default ?? (propertiesModule as any).properties ?? propertiesModule;
const propertiesList: Property[] = Array.isArray(_raw) ? _raw : [];

const AllProperties: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TÍTULO DA PÁGINA */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Todos os Imóveis
          </h1>
          <p className="text-xl text-gray-600">
            Encontrados <span className="font-bold text-blue-600">{propertiesList.length}</span> imóveis
          </p>
        </div>

        {/* GRID DE IMÓVEIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {propertiesList.map((property) => {
            const isAluguel = property.categoria === 'aluguel';

            return (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group"
              >
                {/* IMAGEM + BADGES */}
                <div className="relative">
                  <Link to={`/imovel/${property.id}`}>
                    <img
                      src={property.image || '/placeholder.jpg'}
                      alt={property.tipo}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* BADGE ALUGUEL/VENDA */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                        isAluguel
                          ? 'bg-blue-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {isAluguel ? 'ALUGUEL' : 'VENDA'}
                    </span>
                  </div>

                  {/* RATING */}
                  {property.rating && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="font-medium">{property.rating}</span>
                    </div>
                  )}
                </div>

                {/* CONTEÚDO DO CARD */}
                <div className="p-6">
                  {/* TÍTULO DO IMÓVEL (agora é o tipo correto!) */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    <Link
                      to={`/imovel/${property.id}`}
                      className="hover:text-blue-600 transition"
                    >
                      {property.tipo}
                    </Link>
                  </h3>

                  {/* ENDEREÇO */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm line-clamp-1">{property.endereco}</span>
                  </div>

                  {/* PREÇO */}
                  <div className="text-2xl font-extrabold text-blue-600 mb-4">
                    R$ {property.valor.toLocaleString('pt-BR')}
                    {isAluguel && (
                      <span className="text-base font-normal text-gray-500">/mês</span>
                    )}
                  </div>

                  {/* DETALHES RÁPIDOS */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed size={18} className="text-gray-500" />
                      <span className="font-medium">{property.quartos}</span>
                      <span className="text-gray-500">quartos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={18} className="text-gray-500" />
                      <span className="font-medium">{property.banheiros}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={18} className="text-gray-500" />
                      <span className="font-medium">{property.area}</span> m²
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MENSAGEM QUANDO NÃO TEM IMÓVEIS */}
        {propertiesList.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-500">Tente ajustar os filtros ou volte mais tarde.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;