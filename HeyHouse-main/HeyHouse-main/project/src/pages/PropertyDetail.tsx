import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Bed, Bath, Square, Car, Wifi, Dumbbell, 
  Shield, Phone, Mail, Calendar, Heart, Share2, ArrowLeft,
  Camera, Award
} from 'lucide-react';
import * as propertiesModule from '../data/properties';

// Tipos mínimos
type Property = {
  id: string | number;
  title?: string;
  location?: string;
  city?: string;
  state?: string;
  type?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  parking?: number;
  description?: string;
  features?: string[];
  images?: string[];
  agentId?: string | number;
  rating?: number;
  image?: string;
};

type Agent = {
  id: string | number;
  name?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  rating?: number;
  experience?: number;
  specialties?: string[];
};

// Suporte a diferentes exports: default array, named `properties`, ou objeto com helpers
const _raw = (propertiesModule as any).default ?? (propertiesModule as any).properties ?? propertiesModule;
const propertiesList: any[] = Array.isArray(_raw) ? _raw : Array.isArray((propertiesModule as any).properties) ? (propertiesModule as any).properties : [];
const agentsList: any[] = Array.isArray((propertiesModule as any).agents) ? (propertiesModule as any).agents : [];

const getPropertyById = (id: number | string): any | null => {
  const fn = (propertiesModule as any).getPropertyById;
  if (typeof fn === 'function') return fn(Number(id));
  return propertiesList.find(p => String(p.id) === String(id)) ?? null;
};

const getAgentById = (id: number | string): any | null => {
  const fn = (propertiesModule as any).getAgentById;
  if (typeof fn === 'function') return fn(Number(id));
  return agentsList.find(a => String(a.id) === String(id)) ?? null;
};

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // Busca o imóvel pelo id da URL
  const property = getPropertyById(id ?? '1');
  const agent = property ? getAgentById(property.agent ?? property.agentId ?? 1) : null;

  // Prepara dados para exibição
  const safeProperty = {
    ...property,
    images: property?.images && property.images.length > 0
      ? property.images
      : property?.image
        ? [property.image]
        : ['/placeholder.jpg'],
    tipo: property?.tipo ?? '',
    endereco: property?.endereco ?? '',
    valor: property?.valor ?? 0,
    categoria: property?.categoria ?? '',
    quartos: property?.quartos ?? 0,
    banheiros: property?.banheiros ?? 0,
    area: property?.area ?? 0,
  };

  const safeAgent = agent || {
    name: 'Agente',
    avatar: '/agent-placeholder.jpg',
    phone: '',
    email: '',
    specialties: [],
    experience: 0,
    rating: 0,
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Imóvel não encontrado</h2>
          <Link to="/imoveis" className="text-blue-600 hover:text-blue-700">
            Voltar aos imóveis
          </Link>
        </div>
      </div>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada! Entraremos em contato em breve.');
    setShowContactForm(false);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Visita agendada! Entraremos em contato para confirmar.');
    setShowScheduleForm(false);
  };

  const amenities = [
    { icon: Wifi, label: 'Wi-Fi' },
    { icon: Dumbbell, label: 'Academia' },
    { icon: Shield, label: 'Segurança 24h' },
    { icon: Car, label: 'Garagem' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/imoveis"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar aos imóveis</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={safeProperty.images[currentImageIndex]}
                  alt={safeProperty.tipo}
                  className="w-full h-96 object-cover"
                />
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {safeProperty.images.map((_: string, index: number) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                        aria-label={`Mostrar imagem ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Camera size={16} />
                  <span className="text-sm">{currentImageIndex + 1}/{safeProperty.images.length}</span>
                </div>
                {/* Property Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${safeProperty.categoria === 'venda' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                    {safeProperty.categoria === 'venda' ? 'Venda' : 'Aluguel'}
                  </span>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{safeProperty.tipo}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={20} className="mr-2" />
                    <span className="text-lg">{safeProperty.endereco}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star size={20} className="text-yellow-400" />
                      <span className="font-semibold">4.5</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button type="button" className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Heart size={20} />
                  </button>
                  <button type="button" className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  R$ {safeProperty.valor.toLocaleString('pt-BR')}
                  {safeProperty.categoria === 'aluguel' && <span className="text-lg text-gray-500">/mês</span>}
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{safeProperty.quartos}</div>
                  <div className="text-sm text-gray-600">Quartos</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{safeProperty.banheiros}</div>
                  <div className="text-sm text-gray-600">Banheiros</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{safeProperty.area}m²</div>
                  <div className="text-sm text-gray-600">Área</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Car size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">-</div>
                  <div className="text-sm text-gray-600">Vagas</div>
                </div>
              </div>

              {/* Description */}
              {/* Adicione aqui se desejar: descrição, características, comodidades etc */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-8">
              <div className="text-center mb-6">
                <img
                  src={safeAgent.avatar}
                  alt={safeAgent.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800">{safeAgent.name}</h3>
                <p className="text-gray-600">Consultor Imobiliário</p>
              </div>
              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${safeAgent.phone}`}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Phone size={20} />
                  <span>{safeAgent.phone}</span>
                </a>
                <a
                  href={`mailto:${safeAgent.email}`}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Mail size={20} />
                  <span>{safeAgent.email}</span>
                </a>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Entrar em Contato
                </button>
                <button
                  type="button"
                  onClick={() => setShowScheduleForm(!showScheduleForm)}
                  className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Calendar size={20} />
                  <span>Agendar Visita</span>
                </button>
              </div>
              {/* Contact Form */}
              {showContactForm && (
                <form onSubmit={handleContactSubmit} className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Enviar Mensagem</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Seu email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Seu telefone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Sua mensagem"
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              )}
              {/* Schedule Form */}
              {showScheduleForm && (
                <form onSubmit={handleScheduleSubmit} className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Agendar Visita</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Seu email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Seu telefone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione o horário</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                    <textarea
                      placeholder="Observações (opcional)"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirmar Agendamento
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;