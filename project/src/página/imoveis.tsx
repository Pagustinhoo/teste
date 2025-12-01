import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Bed, Bath, Square } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import * as propertiesModule from '../data/imoveis';

// tipo mínimo esperado para cada imóvel (ajuste conforme seu data file)
type Property = {
  id: string | number;
  tipo: string;           // nome do imóvel
  categoria: string;      // aluguel / venda
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
  categoria: string;
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

// Carregar dados do arquivo
const _raw = (propertiesModule as any).default ?? (propertiesModule as any).properties ?? propertiesModule;
const propertiesListRaw: any[] = Array.isArray(_raw) ? _raw : [];

// Mapear dados corretamente
const propertiesList: Property[] = propertiesListRaw.map((p) => {
  const { cidade, estado } = extractCityState(p.endereco);
  return {
    id: p.id,
    tipo: p.tipo ?? '',                 // nome real do imóvel
    categoria: p.categoria ?? '',       // aluguel / venda
    endereco: p.endereco ?? '',
    cidade,
    estado,
    valor: p.valor ?? 0,
    quartos: p.quartos ?? 0,
    banheiros: p.banheiros ?? 0,
    area: p.area ?? 0,
    image: p.image,
    rating: p.rating ?? 4.5,
    descricao: p.descricao ?? 'Sem descrição.',
    caracteristicas: p.caracteristicas ?? []
  };
});

const Properties: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    tipo: 'all',
    categoria: 'all',
    priceMin: '',
    priceMax: '',
    quartos: 'all',
    cidade: 'all',
    estado: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Query params
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
      const matchesSearch =
        property.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.endereco.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.cidade.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTipo = filters.tipo === 'all' || property.tipo === filters.tipo;
      const matchesCategoria = filters.categoria === 'all' || property.categoria === filters.categoria;

      const priceMin = filters.priceMin ? parseInt(filters.priceMin, 10) : undefined;
      const priceMax = filters.priceMax ? parseInt(filters.priceMax, 10) : undefined;
      const matchesPrice =
        (priceMin === undefined || property.valor >= priceMin) &&
        (priceMax === undefined || property.valor <= priceMax);

      let matchesQuartos = true;
      if (filters.quartos !== 'all') {
        const q = parseInt(filters.quartos, 10);
        if (!isNaN(q)) {
          if (q === 0) matchesQuartos = property.quartos === 0;
          else if (q === 4) matchesQuartos = property.quartos >= 4;
          else matchesQuartos = property.quartos === q;
        }
      }

      const matchesCidade = filters.cidade === 'all' || property.cidade === filters.cidade;
      const matchesEstado = filters.estado === 'all' || property.estado === filters.estado;

      return (
        matchesSearch &&
        matchesTipo &&
        matchesCategoria &&
        matchesPrice &&
        matchesQuartos &&
        matchesCidade &&
        matchesEstado
      );
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

        {/* Search + Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nome, endereço ou cidade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t">

              {/* Filtro por nome (tipo) */}
              <select
                value={filters.tipo}
                onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">Todos os nomes</option>
                {[...new Set(propertiesList.map(p => p.tipo))].map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>

              {/* Filtro por categoria */}
              <select
                value={filters.categoria}
                onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">Todas categorias</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>

              {/* Estado */}
              <select
                value={filters.estado}
                onChange={(e) => setFilters({ ...filters, estado: e.target.value, cidade: 'all' })}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">Todos os estados</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>

              {/* Cidade */}
              <select
                value={filters.cidade}
                onChange={(e) => setFilters({ ...filters, cidade: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">Todas as cidades</option>
                {cidades
                  .filter(cidade => filters.estado === 'all' || propertiesList.find(p => p.cidade === cidade)?.estado === filters.estado)
                  .map(cidade => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
              </select>

              {/* Preço min */}
              <input
                type="number"
                placeholder="Preço mínimo"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              />

              {/* Preço max */}
              <input
                type="number"
                placeholder="Preço máximo"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              />

            </div>
          )}
        </div>

        {/* Contagem */}
        <div className="mb-6">
          <p className="text-gray-600">
            Encontrados <span className="font-semibold text-blue-600">{filteredProperties.length}</span> imóveis
          </p>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              to={`/imovel/${property.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={property.image ?? '/placeholder.jpg'}
                  alt={property.tipo}
                  className="w-full h-48 object-cover"
                />

                {/* Badge categoria */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.categoria === 'venda'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {property.categoria === 'venda' ? 'Venda' : 'Aluguel'}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-sm">{property.rating ?? '-'}</span>
                  </div>
                </div>

                {/* Estado */}
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

                <div className="text-2xl font-bold text-blue-600 mb-4">
                  R$ {property.valor.toLocaleString('pt-BR')}
                  {property.categoria === 'aluguel' && (
                    <span className="text-sm text-gray-500">/mês</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
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

                <p className="text-sm text-gray-700">{property.descricao}</p>

                {property.caracteristicas && property.caracteristicas.length > 0 && ( <ul className="mt-2 flex flex-wrap gap-2"> {property.caracteristicas.map((carac, idx) => ( <li key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{carac}</li> ))} </ul> )}
              </div>
            </Link>
          ))}

        </div>

        {/* Nenhum resultado */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Search size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Properties;
