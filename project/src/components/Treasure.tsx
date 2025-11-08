import React from 'react';
import { Treasure as TreasureType } from '../types/GameTypes';
import { Coins, Heart, Zap, Star } from 'lucide-react';

interface TreasureProps {
  treasure: TreasureType;
}

const Treasure: React.FC<TreasureProps> = ({ treasure }) => {
  const getTreasureAppearance = () => {
    switch (treasure.type) {
      case 'coin':
        return {
          icon: Coins,
          color: '#FFD700',
          glow: 'shadow-yellow-400'
        };
      case 'heart':
        return {
          icon: Heart,
          color: '#EF4444',
          glow: 'shadow-red-400'
        };
      case 'energy':
        return {
          icon: Zap,
          color: '#3B82F6',
          glow: 'shadow-blue-400'
        };
      case 'powerup':
        return {
          icon: Star,
          color: '#8B5CF6',
          glow: 'shadow-purple-400'
        };
      default:
        return {
          icon: Coins,
          color: '#FFD700',
          glow: 'shadow-yellow-400'
        };
    }
  };

  const appearance = getTreasureAppearance();
  const IconComponent = appearance.icon;

  return (
    <div
      className="absolute transition-all duration-200 ease-out"
      style={{
        left: `${treasure.position.x}px`,
        top: `${treasure.position.y}px`,
        transform: `translateZ(${treasure.position.z}px) rotateY(${treasure.animation}deg)`,
        zIndex: Math.floor(treasure.position.z + 100)
      }}
    >
      {/* Treasure Glow */}
      <div 
        className={`absolute w-8 h-8 rounded-full blur-lg ${appearance.glow} opacity-60 animate-pulse`}
        style={{ 
          backgroundColor: appearance.color,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Treasure Body */}
      <div 
        className="relative w-6 h-6 rounded-full border-2 border-white flex items-center justify-center animate-pulse"
        style={{ 
          backgroundColor: appearance.color,
          boxShadow: `0 0 15px ${appearance.color}`
        }}
      >
        <IconComponent 
          className="text-white" 
          size={14} 
        />
      </div>

      {/* Floating Animation */}
      <div className="absolute inset-0 animate-ping opacity-30">
        <div 
          className="w-6 h-6 rounded-full border-2 border-white"
          style={{ backgroundColor: appearance.color }}
        />
      </div>
    </div>
  );
};

export default Treasure;