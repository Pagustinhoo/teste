import React from 'react';
import { Particle as ParticleType } from '../types/GameTypes';

interface ParticleProps {
  particle: ParticleType;
}

const Particle: React.FC<ParticleProps> = ({ particle }) => {
  const opacity = particle.life / particle.maxLife;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${particle.position.x}px`,
        top: `${particle.position.y}px`,
        transform: `translateZ(${particle.position.z}px)`,
        zIndex: Math.floor(particle.position.z + 200)
      }}
    >
      <div 
        className="rounded-full animate-pulse"
        style={{ 
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          backgroundColor: particle.color,
          opacity: opacity,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
        }}
      />
    </div>
  );
};

export default Particle;