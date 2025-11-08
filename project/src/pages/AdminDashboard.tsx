import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, Eye, Home, MapPin, DollarSign, Camera, Save, X } from 'lucide-react';
import { properties } from '../data/properties';

interface PropertyForm {
  title: string;
  description: string;
  price: number;
  type: 'venda' | 'aluguel';
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  address: string;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
  features: string[];
  images: string[];
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerCpf: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    description: '',
    price: 0,
    type: 'venda',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    parking: 0,
    address: '',
    city: '',
    state: 'PR',
    neighborhood: '',
    zipCode: '',
    features: [],
    images: [],
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerCpf: ''
  });

  // Verificar se é o admin autorizado
  const isAuthorizedAdmin = user?.email === 'heliasandrei16@gmail.com';

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h2>
          <p className="text-gray-600">Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">🚫 Acesso Restrito</h2>
          <p className="text-gray-600">Esta área é exclusiva para administradores autorizados.</p>
          <p className="text-sm text-gray-500 mt-2">Apenas heliasandrei16@gmail.com tem acesso.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' || name === 'parking' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleFeatureAdd = (feature: string) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const handleFeatureRemove = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleImageAdd = (imageUrl: string) => {
    if (imageUrl && !formData.images.includes(imageUrl)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
    }
  };

  const handleImageRemove = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.title || !formData.description || !formData.price) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.images.length === 0) {
      alert('Adicione pelo menos uma imagem do imóvel.');
      return;
    }

    // Simular salvamento
    console.log('Dados do imóvel:', formData);
    alert('Imóvel salvo com sucesso!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: 0,
      type: 'venda',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      parking: 0,
      address: '',
      city: '',
      state: 'PR',
      neighborhood: '',
      zipCode: '',
      features: [],
      images: [],
      sellerName: '',
      sellerPhone: '',
      sellerEmail: '',
      sellerCpf: ''
    });
    
    setShowForm(false);
    setActiveTab('list');
  };

  const commonFeatures = [
    'Piscina', 'Academia', 'Churrasqueira', 'Jardim', 'Garagem Coberta',
    'Portaria 24h', 'Elevador', 'Varanda', 'Suíte Master', 'Closet',
    'Cozinha Planejada', 'Ar Condicionado', 'Aquecimento Solar', 'Quintal',
    'Área de Serviço', 'Lavabo', 'Escritório', 'Sala de Jogos'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏠 Painel Administrativo</h1>
          <p className="text-xl text-gray-600">Gerencie imóveis da HeyHouse</p>
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Logado como administrador: <strong>{user.email}</strong>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'list' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Eye className="inline-block mr-2" size={20} />
              Listar Imóveis ({properties.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('add');
                setShowForm(true);
                setEditingProperty(null);
              }}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'add' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Plus className="inline-block mr-2" size={20} />
              Adicionar Imóvel
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'list' && !showForm && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Imóveis Cadastrados</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Imóvel</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Localização</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Preço</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {properties.slice(0, 10).map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={property.image} 
                              alt={property.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-semibold text-gray-800">{property.title}</div>
                              <div className="text-sm text-gray-500">{property.bedrooms}q • {property.area}m²</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-800">{property.city}</div>
                          <div className="text-sm text-gray-500">{property.state}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-semibold text-green-600">
                            R$ {property.price.toLocaleString('pt-BR')}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            property.type === 'venda' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {property.type === 'venda' ? 'Venda' : 'Aluguel'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingProperty(property);
                                setActiveTab('edit');
                                setShowForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Tem certeza que deseja excluir este imóvel?')) {
                                  alert('Imóvel excluído com sucesso!');
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Property Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProperty ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações Básicas */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Home className="mr-2" size={20} />
                    Informações do Imóvel
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título do Imóvel *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Casa Moderna com Piscina"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Descreva o imóvel detalhadamente..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preço (R$) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="350000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="venda">Venda</option>
                        <option value="aluguel">Aluguel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quartos
                      </label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Banheiros
                      </label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Área (m²)
                      </label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vagas de Garagem
                      </label>
                      <input
                        type="number"
                        name="parking"
                        value={formData.parking}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Localização */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPin className="mr-2" size={20} />
                    Localização
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço Completo *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Rua das Flores, 123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        placeholder="Centro"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Curitiba"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="PR">Paraná</option>
                        <option value="SP">São Paulo</option>
                        <option value="SC">Santa Catarina</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="80000-000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Dados do Vendedor */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <DollarSign className="mr-2" size={20} />
                    Dados do Proprietário/Vendedor
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="sellerName"
                        value={formData.sellerName}
                        onChange={handleInputChange}
                        placeholder="João Silva"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        name="sellerCpf"
                        value={formData.sellerCpf}
                        onChange={handleInputChange}
                        placeholder="000.000.000-00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="sellerPhone"
                        value={formData.sellerPhone}
                        onChange={handleInputChange}
                        placeholder="(41) 99999-9999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="sellerEmail"
                        value={formData.sellerEmail}
                        onChange={handleInputChange}
                        placeholder="joao@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Características */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Características do Imóvel
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {commonFeatures.map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => 
                          formData.features.includes(feature) 
                            ? handleFeatureRemove(feature)
                            : handleFeatureAdd(feature)
                        }
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          formData.features.includes(feature)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>

                  {formData.features.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Características selecionadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.features.map((feature) => (
                          <span
                            key={feature}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {feature}
                            <button
                              type="button"
                              onClick={() => handleFeatureRemove(feature)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Imagens */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Camera className="mr-2" size={20} />
                    Fotos do Imóvel (mínimo 4 fotos)
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adicionar URL da Imagem
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              if (input.value) {
                                handleImageAdd(input.value);
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              handleImageAdd(input.value);
                              input.value = '';
                            }
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>

                    {formData.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Imagens adicionadas ({formData.images.length}):
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image}
                                alt={`Imagem ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleImageRemove(image)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>{editingProperty ? 'Atualizar' : 'Salvar'} Imóvel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;