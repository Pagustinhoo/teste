import React from 'react';
import { Link } from 'react-router-dom';
import * as propertiesModule from '../data/imoveis';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';

// Tipagem correta
import { Property } from '../data/imoveis';

const _raw =
  (propertiesModule as any).default ??
  (propertiesModule as any).properties ??
  propertiesModule;

const propertiesList: Property[] = Array.isArray(_raw) ? _raw : [];

const AllProperties: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TÍTULO DA PÁGINA */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Catálogo Completo de Imóveis
          </h1>
          <p className="text-lg text-gray-600">
            Veja todos os imóveis disponíveis para venda e aluguel
          </p>
        </div>

        {/* GRID DE IMÓVEIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {propertiesList.map((property) => {
            const isAluguel = property.categoria === 'aluguel';

            return (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative flex flex-col h-full"
              >
                {/* LINK + IMAGEM */}
                <Link to={`/imovel/${property.id}`} className="block relative">
                  <img
                    src={property.image ?? '/placeholder.jpg'}
                    alt={property.tipo}
                    className="w-full h-56 object-cover"
                  />

                  {/* BADGE CATEGORIA (VENDA / ALUGUEL) */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider shadow-md ${
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
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  )}
                </Link>

                {/* INFORMAÇÕES */}
                <div className="p-6 flex flex-col flex-1">
                  {/* TÍTULO */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {property.tipo}
                  </h3>

                  {/* ENDEREÇO */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1.5 text-gray-500" />
                    <span className="text-sm line-clamp-1">{property.endereco}</span>
                  </div>

                  {/* PREÇO */}
                  <div className="text-2xl font-extrabold text-blue-600 mb-5">
                    R$ {property.valor.toLocaleString('pt-BR')}
                    {isAluguel && (
                      <span className="text-base font-normal text-gray-500">/mês</span>
                    )}
                  </div>

                  {/* DETALHES RÁPIDOS */}
                  <div className="flex items-center justify-between text-gray-600 mt-auto">
                    <div className="flex items-center gap-1">
                      <Bed size={18} className="text-gray-500" />
                      <span className="text-sm">
                        {property.quartos === 0 ? 'Comercial' : property.quartos}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={18} className="text-gray-500" />
                      <span className="text-sm">{property.banheiros}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={18} className="text-gray-500" />
                      <span className="text-sm">{property.area} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ESTADO VAZIO */}
        {propertiesList.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-500">O catálogo está vazio no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;