import React from 'react';
import { Link } from 'react-router-dom';
import * as propertiesModule from '../data/properties';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';

const _raw = (propertiesModule as any).default ?? (propertiesModule as any).properties ?? propertiesModule;
const propertiesList = Array.isArray(_raw) ? _raw : [];

const AllProperties: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Catálogo Completo de Imóveis</h1>
          <p className="text-lg text-gray-600">Veja todos os imóveis disponíveis para venda e aluguel</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertiesList.map((property: any) => (
            <Link
              key={property.id}
              to={`/imovel/${property.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={property.image ?? '/placeholder.jpg'}
                  alt={property.tipo}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.categoria === 'venda'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {property.categoria === 'venda' ? 'Venda' : 'Aluguel'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-sm">4.5</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1)}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.endereco}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {property.valor.toLocaleString('pt-BR')}
                    {property.categoria === 'aluguel' && <span className="text-sm text-gray-500">/mês</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Bed size={16} />
                    <span>{property.quartos === 0 ? 'Comercial' : property.quartos}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath size={16} />
                    <span>{property.banheiros}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square size={16} />
                    <span>{property.area}m²</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {propertiesList.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-gray-500">O catálogo está vazio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
