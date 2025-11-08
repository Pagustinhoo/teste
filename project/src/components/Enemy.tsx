import React from 'react';
import { Enemy as EnemyType } from '../types/GameTypes';

interface EnemyProps {
  enemy: EnemyType;
}

const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const getEnemyAppearance = () => {
    switch (enemy.type) {
      case 'goblin':
        return {
          color: '#4ADE80',
          emoji: '👹',
          size: 'w-10 h-10'
        };
      case 'orc':
        return {
          color: '#EF4444',
          emoji: '👺',
          size: 'w-12 h-12'
        };
      case 'dragon':
        return {
          color: '#8B5CF6',
          emoji: '🐉',
          size: 'w-16 h-16'
        };
      default:
        return {
          color: '#4ADE80',
          emoji: '👹',
          size: 'w-10 h-10'
        };
    }
  };

  const appearance = getEnemyAppearance();

  return (
    <div
      className="absolute transition-all duration-100 ease-linear"
      style={{
        left: `${enemy.position.x}px`,
        top: `${enemy.position.y}px`,
        transform: `translateZ(${enemy.position.z}px)`,
        zIndex: Math.floor(enemy.position.z + 100)
      }}
    >
      {/* Enemy Shadow */}
      <div 
        className="absolute bg-black opacity-30 rounded-full blur-sm"
        style={{ 
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${enemy.size * 16}px`,
          height: `${enemy.size * 8}px`
        }}
      />
      
      {/* Enemy Body */}
      <div 
        className={`relative ${appearance.size} rounded-full border-2 border-red-600 flex items-center justify-center animate-bounce`}
        style={{ 
          backgroundColor: appearance.color,
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
        }}
      >
        <span className="text-2xl">{appearance.emoji}</span>
      </div>

      {/* Health Bar */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12">
        <div className="bg-black bg-opacity-50 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
          />
        </div>
      </div>

      {/* Enemy Type Label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-red-400 text-xs font-bold capitalize bg-black bg-opacity-50 px-2 py-1 rounded">
          {enemy.type}
        </span>
      </div>
    </div>
  );
};

export default Enemy;