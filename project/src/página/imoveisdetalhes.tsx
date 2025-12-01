import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Square, ArrowLeft, Camera, Star
} from 'lucide-react';
import { getPropertyById, getAgentById } from '../data/imoveis';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const property = getPropertyById(Number(id));
  const agent = property ? getAgentById(property.corretor ?? 1) : null;

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

  const images: string[] =
    property?.images && Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : property?.image
        ? [property.image]
        : ['/placeholder.jpg'];

  if (!property || !agent) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* VOLTAR */}
        <Link 
          to="/imoveis"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar aos imóveis</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CONTEÚDO PRINCIPAL */}
          <div className="lg:col-span-2">

            {/* GALERIA */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative">

                <img
                  src={images[currentImageIndex]}
                  alt={property.tipo || 'Imóvel'}
                  className="w-full h-96 object-cover"
                />

                {/* INDICADORES DE IMAGENS */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* CONTADOR */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Camera size={16} />
                  <span className="text-sm">{currentImageIndex + 1}/{images.length}</span>
                </div>

                {/* CATEGORIA */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.categoria === 'venda' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {property.categoria === 'venda' ? 'Venda' : 'Aluguel'}
                  </span>
                </div>
              </div>

              {/* MINIATURAS */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* INFORMAÇÕES DO IMÓVEL */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

              <div className="flex items-start justify-between mb-6">
                <div>

                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1)}
                  </h1>

                  <div className="flex items-center mb-3">
                    <Star size={18} className="text-yellow-400 mr-1" />
                    <span className="text-lg font-semibold">{property.rating}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={20} className="mr-2" />
                    <span className="text-lg">{property.endereco}</span>
                  </div>
                </div>

                {/* 🔥 FAVORITAR E COMPARTILHAR REMOVIDOS AQUI */}
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  R$ {property.valor.toLocaleString('pt-BR')}
                  {property.categoria === 'aluguel' && <span className="text-lg text-gray-500">/mês</span>}
                </div>
              </div>

              {/* DETALHES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{property.quartos}</div>
                  <div className="text-sm text-gray-600">Quartos</div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{property.banheiros}</div>
                  <div className="text-sm text-gray-600">Banheiros</div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{property.area}m²</div>
                  <div className="text-sm text-gray-600">Área</div>
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Descrição do Imóvel</h2>

                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.descricao && property.descricao.trim() !== ""
                    ? property.descricao
                    : "Descrição não disponível."}
                </p>
              </div>

            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-8">

              <div className="text-center mb-6">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800">{agent.name}</h3>
                <p className="text-gray-600">Consultor Imobiliário</p>
              </div>

              {/* CONTATOS */}
              <div className="space-y-4 mb-6">
                <a href={`tel:${agent.phone}`} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                  <span>{agent.phone}</span>
                </a>

                <a href={`mailto:${agent.email}`} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                  <span>{agent.email}</span>
                </a>
              </div>

              {/* BOTÕES */}
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
                  className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Agendar Visita
                </button>
              </div>

              {/* FORMULÁRIOS */}
              {showContactForm && (
                <form onSubmit={handleContactSubmit} className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Enviar Mensagem</h4>
                  <div className="space-y-4">
                    <input type="text" placeholder="Seu nome" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <input type="email" placeholder="Seu email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <input type="tel" placeholder="Seu telefone" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <textarea placeholder="Sua mensagem" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              )}

              {showScheduleForm && (
                <form onSubmit={handleScheduleSubmit} className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Agendar Visita</h4>
                  <div className="space-y-4">
                    <input type="text" placeholder="Seu nome" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <input type="email" placeholder="Seu email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <input type="tel" placeholder="Seu telefone" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <input type="date" required min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="">Selecione o horário</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                    <textarea placeholder="Observações (opcional)" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
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
