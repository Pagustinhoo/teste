import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Bed, Bath, Square } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import * as propertiesModule from '../data/properties';

// tipo mínimo esperado para cada imóvel (ajuste conforme seu data file)
type Property = {
  id: string | number;
  tipo: string;
  endereco: string;
  cidade: string;
  estado: string;
  valor: number;
  quartos: number;
  banheiros: number;
  area: number;
  image?: string;
  rating?: number;
  descricao?: string;
  caracteristicas?: string[];
};

type FilterState = {
  tipo: string;
  priceMin: string;
  priceMax: string;
  quartos: string;
  cidade: string;
  estado: string;
};

// Função para extrair cidade e estado do endereço
function extractCityState(endereco: string) {
  if (!endereco) return { cidade: '', estado: '' };
  const parts = endereco.split('-').map((p: string) => p.trim());
  const cidade = parts.length >= 2 ? parts[parts.length - 2] : '';
  const estado = parts.length >= 1 ? parts[parts.length - 1] : '';
  return { cidade, estado };
}

// Adapta os dados para o formato esperado pelo componente
const _raw = (propertiesModule as any).default ?? (propertiesModule as any).properties ?? propertiesModule;
const propertiesListRaw: any[] = Array.isArray(_raw) ? _raw : [];
const propertiesList: Property[] = propertiesListRaw.map((p) => {
  const { cidade, estado } = extractCityState(p.endereco);
  return {
    id: p.id,
    tipo: p.tipo ?? '',
    endereco: p.endereco ?? '',
    cidade: cidade ?? '',
    estado: estado ?? '',
    valor: p.valor ?? 0,
    quartos: p.quartos ?? 0,
    banheiros: p.banheiros ?? 0,
    area: p.area ?? 0,
    image: p.image,
    rating: 4.5,
    descricao: p.descricao ?? 'Sem descrição.',
    caracteristicas: p.caracteristicas ?? []
  };
});

const Properties: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    tipo: 'all',
    priceMin: '',
    priceMax: '',
    quartos: 'all',
    cidade: 'all',
    estado: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Suporte para query params (?q=...&tipo=...)
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    const tipo = params.get('type') || 'all';
    setSearchQuery(q);
    setFilters((prev) => ({ ...prev, tipo }));
  }, [location.search]);

  const cidades = [...new Set(propertiesList.map(p => p.cidade).filter(Boolean))].sort();
  const estados = [...new Set(propertiesList.map(p => p.estado).filter(Boolean))].sort();

  const filteredProperties = useMemo(() => {
    return propertiesList.filter(property => {
      const matchesSearch = (property.tipo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (property.endereco || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (property.cidade || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTipo = filters.tipo === 'all' || property.tipo === filters.tipo;
      
      const priceMin = filters.priceMin ? parseInt(filters.priceMin, 10) : undefined;
      const priceMax = filters.priceMax ? parseInt(filters.priceMax, 10) : undefined;
      const matchesPrice = (priceMin === undefined || property.valor >= priceMin) &&
                           (priceMax === undefined || property.valor <= priceMax);
      
      let matchesQuartos = true;
      if (filters.quartos !== 'all') {
        const b = parseInt(filters.quartos, 10);
        if (!isNaN(b)) {
          if (b === 0) {
            matchesQuartos = property.quartos === 0;
          } else if (b === 4) {
            matchesQuartos = property.quartos >= 4;
          } else {
            matchesQuartos = property.quartos === b;
          }
        }
      }
      
      const matchesCidade = filters.cidade === 'all' || property.cidade === filters.cidade;
      const matchesEstado = filters.estado === 'all' || property.estado === filters.estado;

      return matchesSearch && matchesTipo && matchesPrice && matchesQuartos && matchesCidade && matchesEstado;
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
                  placeholder="Buscar por tipo, endereço ou cidade..."
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
                value={filters.tipo}
                onChange={(e) => setFilters({...filters, tipo: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os tipos</option>
                {[...new Set(propertiesList.map(p => p.tipo))].filter(Boolean).map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>

              <select
                value={filters.estado}
                onChange={(e) => setFilters({...filters, estado: e.target.value, cidade: 'all'})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os estados</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>

              <select
                value={filters.cidade}
                onChange={(e) => setFilters({...filters, cidade: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as cidades</option>
                {cidades
                  .filter(cidade => filters.estado === 'all' || propertiesList.find(p => p.cidade === cidade)?.estado === filters.estado)
                  .map(cidade => (
                    <option key={cidade} value={cidade}>{cidade}</option>
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
                value={filters.quartos}
                onChange={(e) => setFilters({...filters, quartos: e.target.value})}
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
                  alt={property.tipo ?? 'Imóvel'}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.tipo === 'venda' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {property.tipo === 'venda' ? 'Venda' : 'Aluguel'}
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
                    {property.estado}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.tipo}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.endereco}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {property.valor.toLocaleString('pt-BR')}
                    {property.tipo === 'aluguel' && <span className="text-sm text-gray-500">/mês</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Bed size={16} />
                    <span>{property.quartos === 0 ? 'Comercial' : (property.quartos ?? '—')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath size={16} />
                    <span>{property.banheiros ?? '—'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square size={16} />
                    <span>{property.area ?? '—'}m²</span>
                  </div>
                </div>
                {/* Descrição */}
                <div className="mt-4 text-gray-700 text-sm">
                  {property.descricao}
                </div>
                {/* Características */}
                {property.caracteristicas && property.caracteristicas.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {property.caracteristicas.map((carac, idx) => (
                      <li key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{carac}</li>
                    ))}
                  </ul>
                )}
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