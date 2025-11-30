import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import * as propertiesModule from '../data/imoveis';
import type { Property } from '../data/imoveis';

const properties = (propertiesModule as any).default || (propertiesModule as any).properties || propertiesModule;

const AllProperties: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* TÍTULO DA PÁGINA */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Todos os Imóveis</h2>
          <p className="text-xl text-gray-600">
            Encontrados <span className="font-bold text-blue-600">{properties.length}</span> imóveis disponíveis
          </p>
        </div>

        {/* GRID EXATAMENTE IGUAL À HOME */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property: Property) => {
            const isAluguel = property.categoria === 'aluguel';

            // PROTEÇÃO INTELIGENTE: nunca mostra "aluguel" ou "venda" como título
            const tituloExibido = (() => {
              const tipoLower = property.tipo.trim().toLowerCase();
              if (tipoLower === 'aluguel' || tipoLower === 'venda' || tipoLower === '') {
                // Fallback seguro e bonito
                const cidade = property.endereco.split('-').pop()?.trim() || 'Cidade';
                return isAluguel
                  ? `Sobrado/Casa para aluguel em ${cidade}`
                  : `Apartamento/Casa para venda em ${cidade}`;
              }
              return property.tipo;
            })();

            return (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                {/* IMAGEM + BADGES */}
                <div className="relative group">
                  <Link to={`/imovel/${property.id}`}>
                    <img
                      src={property.image || '/placeholder.jpg'}
                      alt={tituloExibido}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* BADGE ALUGUEL/VENDA */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                        isAluguel ? 'bg-blue-600' : 'bg-green-600'
                      } text-white`}
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
                  {/* TÍTULO CORRETO E PROTEGIDO */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    <Link to={`/imovel/${property.id}`} className="hover:text-blue-600 transition">
                    {tituloExibido}
                    </Link>
                  </h3>


                  {/* ENDEREÇO */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm line-clamp-1">{property.endereco}</span>
                  </div>

                  {/* PREÇO */}
                  <div className="text-2xl font-extrabold text-blue-600">
                    R$ {property.valor.toLocaleString('pt-BR')}
                    {isAluguel && <span className="text-base font-normal text-gray-500">/mês</span>}
                  </div>

                  {/* DETALHES RÁPIDOS */}
                  <div className="flex justify-between text-sm text-gray-600 mt-5">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{property.quartos}</span> quartos
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{property.banheiros}</span> banheiros
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{property.area}</span> m²
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTÃO WHATSAPP */}
        <div className="text-center mt-16">
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
    </div>
  );
};

export default AllProperties;