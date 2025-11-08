import React from 'react';
import { GameState } from '../types/GameTypes';
import { Shield, Zap, Heart, Coins } from 'lucide-react';

interface HUDProps {
  gameState: GameState;
}

const HUD: React.FC<HUDProps> = ({ gameState }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Score and Level */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 backdrop-blur-sm border border-yellow-500 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Coins className="text-yellow-400" size={20} />
          <span className="text-yellow-400 font-bold">Score: {gameState.score}</span>
        </div>
        <div className="text-white font-semibold">Level: {gameState.level}</div>
      </div>

      {/* Player 1 Stats */}
      {gameState.players[0] && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 backdrop-blur-sm border-2 rounded-lg p-4"
             style={{ borderColor: gameState.players[0].color }}>
          <div className="flex items-center gap-2 mb-2">
            {gameState.players[0].specialAbility === 'shield' ? (
              <Shield className="text-blue-400" size={20} />
            ) : (
              <Zap className="text-yellow-400" size={20} />
            )}
            <span className="text-white font-bold">{gameState.players[0].name}</span>
          </div>
          
          {/* Health Bar */}
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-red-500" size={16} />
            <div className="w-24 bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
                style={{ width: `${(gameState.players[0].health / gameState.players[0].maxHealth) * 100}%` }}
              />
            </div>
            <span className="text-white text-sm">
              {gameState.players[0].health}/{gameState.players[0].maxHealth}
            </span>
          </div>

          {/* Energy Bar */}
          <div className="flex items-center gap-2">
            <Zap className="text-blue-400" size={16} />
            <div className="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-blue-400 transition-all duration-300"
                style={{ width: `${(gameState.players[0].energy / gameState.players[0].maxEnergy) * 100}%` }}
              />
            </div>
            <span className="text-white text-sm">
              {gameState.players[0].energy}/{gameState.players[0].maxEnergy}
            </span>
          </div>

          {/* Ability Cooldown */}
          {gameState.players[0].abilityCooldown > 0 && (
            <div className="mt-2 text-yellow-400 text-sm">
              Ability: {(gameState.players[0].abilityCooldown / 1000).toFixed(1)}s
            </div>
          )}
        </div>
      )}

      {/* Player 2 Stats */}
      {gameState.players[1] && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 backdrop-blur-sm border-2 rounded-lg p-4"
             style={{ borderColor: gameState.players[1].color }}>
          <div className="flex items-center gap-2 mb-2">
            {gameState.players[1].specialAbility === 'shield' ? (
              <Shield className="text-blue-400" size={20} />
            ) : (
              <Zap className="text-yellow-400" size={20} />
            )}
            <span className="text-white font-bold">{gameState.players[1].name}</span>
          </div>
          
          {/* Health Bar */}
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-red-500" size={16} />
            <div className="w-24 bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
                style={{ width: `${(gameState.players[1].health / gameState.players[1].maxHealth) * 100}%` }}
              />
            </div>
            <span className="text-white text-sm">
              {gameState.players[1].health}/{gameState.players[1].maxHealth}
            </span>
          </div>

          {/* Energy Bar */}
          <div className="flex items-center gap-2">
            <Zap className="text-blue-400" size={16} />
            <div className="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-blue-400 transition-all duration-300"
                style={{ width: `${(gameState.players[1].energy / gameState.players[1].maxEnergy) * 100}%` }}
              />
            </div>
            <span className="text-white text-sm">
              {gameState.players[1].energy}/{gameState.players[1].maxEnergy}
            </span>
          </div>

          {/* Ability Cooldown */}
          {gameState.players[1].abilityCooldown > 0 && (
            <div className="mt-2 text-yellow-400 text-sm">
              Ability: {(gameState.players[1].abilityCooldown / 1000).toFixed(1)}s
            </div>
          )}
        </div>
      )}

      {/* Controls Help */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 backdrop-blur-sm border border-gray-500 rounded-lg p-3">
        <div className="text-white text-sm">
          <div className="mb-2 font-bold text-yellow-400">Player 1 (Blue Knight)</div>
          <div>WASD - Move</div>
          <div>Space - Attack</div>
          <div>Shift - Shield</div>
          <div className="mt-2 mb-2 font-bold text-red-400">Player 2 (Red Warrior)</div>
          <div>Arrow Keys - Move</div>
          <div>Enter - Attack</div>
          <div>RShift - Dash</div>
        </div>
      </div>
    </div>
  );
};

export default HUD;