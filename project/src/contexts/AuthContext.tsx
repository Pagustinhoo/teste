import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Base de dados simulada de usuários
const USERS_DATABASE = [
  {
    id: '1',
    name: 'Helias Andrei',
    email: 'heliasandrei16@gmail.com',
    password: 'admin123',
    phone: '(41) 99999-9999',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'admin'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'senha123',
    phone: '(11) 98888-8888',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'user'
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: 'maria456',
    phone: '(21) 97777-7777',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'user'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      // Verificar se o token ainda é válido (simulação)
      const tokenData = JSON.parse(storedToken);
      const now = new Date().getTime();
      
      if (now < tokenData.expiry) {
        setUser(JSON.parse(storedUser));
      } else {
        // Token expirado, limpar dados
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Validações de entrada
      if (!email || !password) {
        return { success: false, error: 'Email e senha são obrigatórios' };
      }

      if (!isValidEmail(email)) {
        return { success: false, error: 'Email inválido' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
      }

      // Buscar usuário na base de dados
      const foundUser = USERS_DATABASE.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        return { 
          success: false, 
          error: 'Email não encontrado. Use uma das contas de demonstração disponíveis.' 
        };
      }

      // Verificar senha
      if (foundUser.password !== password) {
        return { success: false, error: 'Senha incorreta' };
      }

      // Criar dados do usuário (sem a senha)
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        avatar: foundUser.avatar
      };

      // Criar token de sessão (válido por 24 horas)
      const token = {
        value: generateToken(),
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 horas
      };

      // Salvar dados
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', JSON.stringify(token));
      
      setIsLoading(false);
      return { success: true };
      
    } catch (error) {
      console.error('Erro no login:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Erro interno do sistema. Tente novamente.' 
      };
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Validações
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error('Nome, email e senha são obrigatórios');
      }

      if (!isValidEmail(userData.email)) {
        throw new Error('Email inválido');
      }

      if (userData.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (!isValidName(userData.name)) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }

      // Verificar se email já existe
      const existingUser = USERS_DATABASE.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      // Criar novo usuário
      const newUser = {
        id: generateUserId(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: getRandomAvatar()
      };

      // Simular salvamento na base de dados
      USERS_DATABASE.push({
        ...newUser,
        password: userData.password,
        role: 'user'
      });

      // Criar token de sessão
      const token = {
        value: generateToken(),
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000)
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('authToken', JSON.stringify(token));
      
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Erro no registro:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualizar também na base de dados simulada
      const userIndex = USERS_DATABASE.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        USERS_DATABASE[userIndex] = { ...USERS_DATABASE[userIndex], ...userData };
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Funções auxiliares
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

const generateToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const generateUserId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

const getRandomAvatar = (): string => {
  const avatars = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};