import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    // Nome
    if (!formData.name.trim()) {
      errors.push('Nome é obrigatório');
    } else if (formData.name.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    // Email
    if (!formData.email.trim()) {
      errors.push('Email é obrigatório');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push('Email inválido');
      }
    }

    // Telefone (opcional, mas se preenchido deve ser válido)
    if (formData.phone && formData.phone.length > 0) {
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.push('Telefone deve estar no formato (11) 99999-9999');
      }
    }

    // Senha
    if (!formData.password) {
      errors.push('Senha é obrigatória');
    } else {
      if (formData.password.length < 6) {
        errors.push('Senha deve ter pelo menos 6 caracteres');
      }
      if (!/(?=.*[a-z])/.test(formData.password)) {
        errors.push('Senha deve conter pelo menos uma letra minúscula');
      }
      if (!/(?=.*\d)/.test(formData.password)) {
        errors.push('Senha deve conter pelo menos um número');
      }
    }

    // Confirmação de senha
    if (!formData.confirmPassword) {
      errors.push('Confirmação de senha é obrigatória');
    } else if (formData.password !== formData.confirmPassword) {
      errors.push('As senhas não coincidem');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors([]);

    // Validar formulário
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const success = await register(formData);
    if (success) {
      navigate('/');
    } else {
      setError('Erro ao criar conta. Este email pode já estar cadastrado.');
    }
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (11) 99999-9999
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({
      ...formData,
      phone: formatted
    });
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Muito Fraca', 'Fraca', 'Regular', 'Boa', 'Forte'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Crie sua conta</h2>
          <p className="text-gray-600">Junte-se a nós e encontre o imóvel perfeito</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle size={20} />
                  <span className="font-semibold">Corrija os seguintes erros:</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres, com letra e número"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${strengthColors[passwordStrength - 1] || 'bg-gray-200'}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {strengthLabels[passwordStrength - 1] || 'Muito Fraca'}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className={formData.password.length >= 6 ? 'text-green-600' : 'text-gray-400'}>
                        {formData.password.length >= 6 ? '✓' : '○'} 6+ caracteres
                      </span>
                      <span className={/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>
                        {/(?=.*[a-z])/.test(formData.password) ? '✓' : '○'} Letra minúscula
                      </span>
                      <span className={/(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>
                        {/(?=.*\d)/.test(formData.password) ? '✓' : '○'} Número
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-1 text-xs">
                  {formData.password === formData.confirmPassword ? (
                    <span className="text-green-600 flex items-center space-x-1">
                      <CheckCircle size={14} />
                      <span>Senhas coincidem</span>
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>Senhas não coincidem</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Concordo com os{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Termos de Uso</a>
                {' e '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Política de Privacidade</a>
              </label>
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
                  <UserPlus size={20} />
                  <span>Criar Conta</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Entre aqui
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>🔒 Seus dados estão seguros conosco</p>
          <p>Criptografia de ponta a ponta</p>
        </div>
      </div>
    </div>
  );
};

export default Register;