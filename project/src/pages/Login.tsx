import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Erro desconhecido');
    }
  };

  const demoAccounts = [
    {
      name: 'Admin (Helias Andrei)',
      email: 'heliasandrei16@gmail.com',
      password: 'admin123',
      role: 'Administrador',
      description: 'Acesso completo ao painel administrativo'
    },
    {
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
      role: 'Cliente',
      description: 'Conta de cliente padrão'
    },
    {
      name: 'Maria Santos',
      email: 'maria@email.com',
      password: 'maria456',
      role: 'Cliente',
      description: 'Conta de cliente padrão'
    }
  ];

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setShowDemoAccounts(false);
    setError(''); // Clear any existing errors
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-600">Entre na sua conta para continuar</p>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-1">Sistema de Demonstração</h3>
              <p className="text-xs text-blue-700 mb-2">
                Este é um sistema de demonstração. Use uma das contas abaixo para fazer login:
              </p>
              <button
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium underline"
              >
                {showDemoAccounts ? 'Ocultar' : 'Ver'} Contas Disponíveis
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha (mín. 6 caracteres)"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts Section */}
          {showDemoAccounts && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Contas Disponíveis</span>
                  </div>
                  <p className="text-xs text-green-700 mb-3">
                    Clique em "Usar esta conta" para preencher automaticamente:
                  </p>
                  
                  {demoAccounts.map((account, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 mb-2 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{account.name}</div>
                          <div className="text-xs text-gray-600">{account.description}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          account.role === 'Administrador' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {account.role}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        <div><strong>Email:</strong> {account.email}</div>
                        <div><strong>Senha:</strong> {account.password}</div>
                      </div>
                      <button
                        onClick={() => fillDemoAccount(account.email, account.password)}
                        className="w-full bg-green-600 text-white py-1 px-3 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        Usar esta conta
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-blue-600 hover:text-blue-700 font-semibold">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>🔒 Sistema de autenticação seguro</p>
          <p>
            <a href="#" className="text-blue-600 hover:text-blue-700">Termos de Uso</a>
            {' e '}
            <a href="#" className="text-blue-600 hover:text-blue-700">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;