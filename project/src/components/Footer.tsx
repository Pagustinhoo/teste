import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo />
              <div className="flex flex-col">
                <span className="text-xl font-bold">HeyHouse</span>
                <span className="text-xs text-gray-400">Transformando sonhos em lares</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Encontre o imóvel dos seus sonhos no Paraná, São Paulo e Santa Catarina com a melhor plataforma de venda e aluguel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Início</a></li>
              <li><a href="/imoveis" className="text-gray-400 hover:text-white transition-colors">Imóveis</a></li>
              <li><a href="/imoveis?type=venda" className="text-gray-400 hover:text-white transition-colors">Comprar</a></li>
              <li><a href="/imoveis?type=aluguel" className="text-gray-400 hover:text-white transition-colors">Alugar</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Avaliação Gratuita</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Financiamento</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultoria</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentação</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <a 
                  href="mailto:heliasandrei16@gmail.com" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  heliasandrei16@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-red-400" />
                <span className="text-gray-400">Paraná, São Paulo, Santa Catarina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 HeyHouse. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
