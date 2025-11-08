import React from 'react';
import { Player as PlayerType } from '../types/GameTypes';
import { Shield, Zap } from 'lucide-react';

interface PlayerProps {
  player: PlayerType;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  const getPlayerIcon = () => {
    return player.specialAbility === 'shield' ? Shield : Zap;
  };

  const IconComponent = getPlayerIcon();

  return (
    <div
      className="absolute transition-all duration-75 ease-linear"
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        transform: `translateZ(${player.position.z}px) rotateY(${player.facing}deg)`,
        zIndex: Math.floor(player.position.z + 100)
      }}
    >
      {/* Player Shadow */}
      <div 
        className="absolute w-12 h-6 bg-black opacity-30 rounded-full blur-sm"
        style={{ 
          bottom: '-24px', 
          left: '50%', 
          transform: 'translateX(-50%) scale(1.2)' 
        }}
      />
      
      {/* Player Body */}
      <div 
        className={`relative w-12 h-12 rounded-full border-4 ${
          player.abilityActive ? 'animate-pulse shadow-lg' : ''
        } transition-all duration-200`}
        style={{ 
          backgroundColor: player.color,
          borderColor: player.abilityActive ? '#FFD700' : '#FFF',
          boxShadow: player.abilityActive ? `0 0 20px ${player.color}` : 'none'
        }}
      >
        <IconComponent 
          className="absolute inset-0 m-auto text-white" 
          size={20} 
        />
        
        {/* Attack Animation */}
        {player.isAttacking && (
          <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping" />
        )}
      </div>

      {/* Health Bar */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16">
        <div className="bg-black bg-opacity-50 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
            style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
          />
        </div>
      </div>

      {/* Energy Bar */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-16">
        <div className="bg-black bg-opacity-50 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-blue-400 transition-all duration-300"
            style={{ width: `${(player.energy / player.maxEnergy) * 100}%` }}
          />
        </div>
      </div>

      {/* Player Name */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-white text-xs font-bold bg-black bg-opacity-50 px-2 py-1 rounded">
          {player.name}
        </span>
      </div>
    </div>
  );
};

export default Player;