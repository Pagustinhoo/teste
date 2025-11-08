import React from 'react';
import { Trophy, RotateCcw, Crown } from 'lucide-react';

interface GameOverProps {
  score: number;
  level: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, level, onRestart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-400 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-8">
        <div className="flex items-center justify-center mb-8">
          <Crown className="text-yellow-400 mr-4" size={48} />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Game Over
          </h1>
          <Crown className="text-yellow-400 ml-4" size={48} />
        </div>
        
        <p className="text-2xl text-gray-300 mb-8">
          Os heróis lutaram bravamente!
        </p>

        <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-yellow-500 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="text-yellow-400 mr-3" size={32} />
            <h2 className="text-3xl font-bold text-yellow-400">Pontuação Final</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{score.toLocaleString()}</div>
              <div className="text-gray-400">Pontos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{level}</div>
              <div className="text-gray-400">Nível Alcançado</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Conquistas da Aventura:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">🏆</span>
              Sobreviveram a {level} níveis
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">⚔️</span>
              Derrotaram inúmeros inimigos
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">💎</span>
              Coletaram {Math.floor(score / 10)} tesouros
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">🤝</span>
              Lutaram como verdadeiros parceiros
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50"
        >
          <RotateCcw className="inline-block mr-2" size={24} />
          Jogar Novamente
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
        </button>

        <div className="mt-8 text-sm text-gray-400">
          <p>💪 A união faz a força!</p>
          <p>🎮 Tentem superar essa pontuação na próxima aventura!</p>
        </div>
      </div>
    </div>
  );
};

export default GameOver;