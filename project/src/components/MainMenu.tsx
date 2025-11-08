import React from 'react';
import { Swords, Shield, Zap, Crown } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-8">
        <div className="flex items-center justify-center mb-8">
          <Crown className="text-yellow-400 mr-4" size={48} />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Epic Cooperative Adventure
          </h1>
          <Crown className="text-yellow-400 ml-4" size={48} />
        </div>
        
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Dois heróis. Uma missão épica. Trabalhem juntos para derrotar os inimigos,<br/>
          coletar tesouros e sobreviver nas masmorras mais perigosas!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-blue-500 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <Shield className="text-blue-400 mr-2" size={32} />
              <h3 className="text-2xl font-bold text-blue-400">Cavaleiro Azul</h3>
            </div>
            <p className="text-gray-300 mb-4">O defensor corajoso com escudo protetor</p>
            <div className="text-sm text-gray-400">
              <div>WASD - Movimento</div>
              <div>Espaço - Ataque</div>
              <div>Shift - Escudo Protetor</div>
            </div>
          </div>

          <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-red-500 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <Zap className="text-red-400 mr-2" size={32} />
              <h3 className="text-2xl font-bold text-red-400">Guerreiro Vermelho</h3>
            </div>
            <p className="text-gray-300 mb-4">O atacante ágil com dash relâmpago</p>
            <div className="text-sm text-gray-400">
              <div>Setas - Movimento</div>
              <div>Enter - Ataque</div>
              <div>Shift Dir - Dash Relâmpago</div>
            </div>
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="group relative px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold text-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50"
        >
          <Swords className="inline-block mr-2" size={24} />
          Iniciar Aventura
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
        </button>

        <div className="mt-8 text-sm text-gray-400">
          <p>🎯 Derrotem os inimigos trabalhando em equipe</p>
          <p>💎 Coletem tesouros para aumentar a pontuação</p>
          <p>⚡ Usem habilidades especiais com sabedoria</p>
          <p>🏆 Sobrevivam o máximo possível!</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;