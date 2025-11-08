import React from 'react';
import { GameState } from '../types/GameTypes';
import Player from './Player';
import Enemy from './Enemy';
import Treasure from './Treasure';
import Particle from './Particle';

interface GameEngineProps {
  gameState: GameState;
}

const GameEngine: React.FC<GameEngineProps> = ({ gameState }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3D Dungeon Environment */}
      <div className="absolute inset-0 perspective-1000">
        <div className="relative w-full h-full preserve-3d">
          {/* Floor */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900"
            style={{
              transform: 'rotateX(60deg) translateZ(-100px)',
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.1) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.1) 75%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          />
          
          {/* Walls */}
          <div 
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-600 to-stone-800"
            style={{ transform: 'rotateX(90deg) translateZ(50px)' }}
          />
          <div 
            className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-stone-600 to-stone-800"
            style={{ transform: 'rotateY(90deg) translateZ(50px)' }}
          />
          
          {/* Lighting Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"
              style={{ transform: 'translateZ(200px)' }}
            />
            <div 
              className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-15 blur-3xl animate-pulse"
              style={{ transform: 'translateZ(200px)', animationDelay: '1s' }}
            />
          </div>

          {/* Game Objects */}
          <div className="absolute inset-0">
            {/* Players */}
            {gameState.players.map(player => (
              <Player key={player.id} player={player} />
            ))}

            {/* Enemies */}
            {gameState.enemies.map(enemy => (
              <Enemy key={enemy.id} enemy={enemy} />
            ))}

            {/* Treasures */}
            {gameState.treasures.map(treasure => (
              <Treasure key={treasure.id} treasure={treasure} />
            ))}

            {/* Particles */}
            {gameState.particles.map(particle => (
              <Particle key={particle.id} particle={particle} />
            ))}
          </div>
        </div>
      </div>

      {/* Level Information */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-yellow-500 rounded-lg px-6 py-2">
          <h2 className="text-yellow-400 font-bold text-xl text-center">
            Dungeon Level {gameState.level}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GameEngine;