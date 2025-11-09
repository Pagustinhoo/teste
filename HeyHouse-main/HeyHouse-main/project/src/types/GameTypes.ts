export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Velocity {
  x: number;
  y: number;
  z: number;
}

export interface Player {
  id: number;
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  isAttacking: boolean;
  attackCooldown: number;
  facing: number;
  color: string;
  name: string;
  specialAbility: 'shield' | 'dash';
  abilityActive: boolean;
  abilityCooldown: number;
}

export interface Enemy {
  id: number;
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  type: 'goblin' | 'orc' | 'dragon';
  attackDamage: number;
  attackRange: number;
  lastAttack: number;
  target: number | null;
  size: number;
}

export interface Treasure {
  id: number;
  position: Position;
  type: 'coin' | 'heart' | 'energy' | 'powerup';
  value: number;
  collected: boolean;
  animation: number;
}

export interface Particle {
  id: number;
  position: Position;
  velocity: Velocity;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'hit' | 'collect' | 'magic';
}

export interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  level: number;
  score: number;
  players: Player[];
  enemies: Enemy[];
  treasures: Treasure[];
  particles: Particle[];
}

export interface KeyboardState {
  [key: string]: boolean;
}