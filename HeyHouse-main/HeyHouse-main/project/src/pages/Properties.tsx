import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Star, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as propertiesModule from '../data/properties';

// tipo mínimo esperado para cada imóvel (ajuste conforme seu data file)
type Property = {
  id: string | number;
  title: string;
  location: string;
  city: string;
  state: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image?: string;
  rating?: number;
};

// estado dos filtros usados na UI
type FilterState = {
  type: string;       // 'all' | 'venda' | 'aluguel'
  priceMin: string;
  priceMax: string;
  bedrooms: string;   // 'all' | '0' | '1' | '2' | '3' | '4'
  city: string;
  state: string;
};

// aceita tanto `export default [...]` quanto `export const properties = [...]`
const _raw = (propertiesModule as any).default ?? (propertiesModule as any).properties ?? propertiesModule;
const propertiesList: Property[] = Array.isArray(_raw) ? _raw : [];

const Properties: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'all',
    city: 'all',
    state: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const cities = [...new Set(propertiesList.map(p => p.city))].sort();
  const states = [...new Set(propertiesList.map(p => p.state))].sort();

  const filteredProperties = useMemo(() => {
    return propertiesList.filter(property => {
      const matchesSearch = (property.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (property.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (property.city || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filters.type === 'all' || property.type === filters.type;
      
      const priceMin = filters.priceMin ? parseInt(filters.priceMin, 10) : undefined;
      const priceMax = filters.priceMax ? parseInt(filters.priceMax, 10) : undefined;
      const matchesPrice = (priceMin === undefined || property.price >= priceMin) &&
                           (priceMax === undefined || property.price <= priceMax);
      
      // tratar "all", "0" (comercial), "4" como 4+ e demais valores exatos
      let matchesBedrooms = true;
      if (filters.bedrooms !== 'all') {
        const b = parseInt(filters.bedrooms, 10);
        if (!isNaN(b)) {
          if (b === 0) {
            matchesBedrooms = property.bedrooms === 0;
          } else if (b === 4) {
            matchesBedrooms = property.bedrooms >= 4;
          } else {
            matchesBedrooms = property.bedrooms === b;
          }
        }
      }
      
      const matchesCity = filters.city === 'all' || property.city === filters.city;
      
      const matchesState = filters.state === 'all' || property.state === filters.state;

      return matchesSearch && matchesType && matchesPrice && matchesBedrooms && matchesCity && matchesState;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Imóveis Disponíveis</h1>
          <p className="text-xl text-gray-600">Encontre o imóvel perfeito no Paraná, São Paulo e Santa Catarina</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por título, localização ou cidade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Buscar imóveis"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-pressed={showFilters}
              aria-label="Mostrar filtros"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os tipos</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>

              <select
                value={filters.state}
                onChange={(e) => setFilters({...filters, state: e.target.value, city: 'all'})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os estados</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              <select
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as cidades</option>
                {cities
                  .filter(city => filters.state === 'all' || propertiesList.find(p => p.city === city)?.state === filters.state)
                  .map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
              </select>

              <input
                type="number"
                placeholder="Preço mínimo"
                value={filters.priceMin}
                onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                aria-label="Preço mínimo"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Preço máximo"
                value={filters.priceMax}
                onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                aria-label="Preço máximo"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Qualquer quarto</option>
                <option value="0">Comercial</option>
                <option value="1">1 quarto</option>
                <option value="2">2 quartos</option>
                <option value="3">3 quartos</option>
                <option value="4">4+ quartos</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Encontrados <span className="font-semibold text-blue-600">{filteredProperties.length}</span> imóveis
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              to={`/imovel/${property.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={property.image ?? '/placeholder.jpg'}
                  alt={property.title ?? 'Imóvel'}
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
                    <span className="text-sm">{property.rating ?? '-'}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {property.state}
                  </span>
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
                  <div className="flex items-center space-x-1">
                    <Bed size={16} />
                    <span>{property.bedrooms === 0 ? 'Comercial' : (property.bedrooms ?? '—')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath size={16} />
                    <span>{property.bathrooms ?? '—'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square size={16} />
                    <span>{property.area ?? '—'}m²</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;