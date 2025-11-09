import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Camera, Save, Heart, Eye, MessageSquare } from 'lucide-react';

type UserType = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

const STORAGE_KEY = 'heyhouse_user';

const getUserFromStorage = (): UserType | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveUserToStorage = (user: UserType) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(getUserFromStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserType>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = (data: UserType) => {
    const updated = { ...(user || {}), ...data };
    setUser(updated);
    saveUserToStorage(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const favoriteProperties = [
    {
      id: 1,
      title: 'Apartamento Luxuoso em Copacabana',
      location: 'Copacabana, Rio de Janeiro - RJ',
      price: 850000,
      type: 'venda',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    },
    {
      id: 2,
      title: 'Casa Moderna em Alphaville',
      location: 'Alphaville, Barueri - SP',
      price: 4500,
      type: 'aluguel',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
    }
  ];

  const recentActivity = [
    { type: 'view', property: 'Apartamento Luxuoso em Copacabana', date: '2 horas atrás' },
    { type: 'favorite', property: 'Casa Moderna em Alphaville', date: '1 dia atrás' },
    { type: 'contact', property: 'Cobertura com Vista para o Mar', date: '3 dias atrás' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h2>
          <p className="text-gray-600 mb-4">Você precisa estar logado para acessar esta página.</p>
          <div className="space-x-2">
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Entrar</Link>
            <Link to="/" className="px-4 py-2 border rounded-lg">Voltar</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                    alt={user.name || 'Usuário'}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => alert('Funcionalidade de upload não implementada')}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="(11) 99999-9999"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Save size={20} />
                        <span>Salvar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ name: user.name, email: user.email, phone: user.phone });
                        }}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Editar Perfil
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Favorite Properties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="text-red-500" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">Imóveis Favoritos</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteProperties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{property.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          R$ {property.price.toLocaleString('pt-BR')}
                          {property.type === 'aluguel' && <span className="text-sm">/mês</span>}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          property.type === 'venda' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.type === 'venda' ? 'Venda' : 'Aluguel'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Atividade Recente</h3>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'view' && <Eye className="text-blue-500" size={20} />}
                      {activity.type === 'favorite' && <Heart className="text-red-500" size={20} />}
                      {activity.type === 'contact' && <MessageSquare className="text-green-500" size={20} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">
                        {activity.type === 'view' && 'Visualizou'}
                        {activity.type === 'favorite' && 'Favoritou'}
                        {activity.type === 'contact' && 'Entrou em contato sobre'}
                        {' '}
                        <span className="font-semibold">{activity.property}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Suas Estatísticas</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <div className="text-gray-600">Imóveis Visualizados</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">2</div>
                  <div className="text-gray-600">Imóveis Favoritos</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                  <div className="text-gray-600">Contatos Realizados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Profile;