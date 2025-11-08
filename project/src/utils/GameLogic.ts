import { GameState, Player, Enemy, Treasure, Particle, Position } from '../types/GameTypes';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SPEED = 3;
const ENEMY_SPEED = 1;

export const initializeGame = (): GameState => {
  const players: Player[] = [
    {
      id: 1,
      position: { x: 100, y: 100, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      isAttacking: false,
      attackCooldown: 0,
      facing: 0,
      color: '#3B82F6',
      name: 'Cavaleiro Azul',
      specialAbility: 'shield',
      abilityActive: false,
      abilityCooldown: 0
    },
    {
      id: 2,
      position: { x: 150, y: 150, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      isAttacking: false,
      attackCooldown: 0,
      facing: 0,
      color: '#EF4444',
      name: 'Guerreiro Vermelho',
      specialAbility: 'dash',
      abilityActive: false,
      abilityCooldown: 0
    }
  ];

  const enemies: Enemy[] = [];
  const treasures: Treasure[] = [];

  // Spawn initial enemies
  for (let i = 0; i < 3; i++) {
    enemies.push(createEnemy(i + 1, 1));
  }

  // Spawn initial treasures
  for (let i = 0; i < 5; i++) {
    treasures.push(createTreasure(i + 1));
  }

  return {
    isPlaying: true,
    isGameOver: false,
    level: 1,
    score: 0,
    players,
    enemies,
    treasures,
    particles: []
  };
};

export const updateGameState = (
  gameState: GameState,
  pressedKeys: { [key: string]: boolean },
  deltaTime: number
): GameState => {
  let newState = { ...gameState };

  // Update players
  newState.players = newState.players.map(player => 
    updatePlayer(player, pressedKeys, deltaTime)
  );

  // Update enemies
  newState.enemies = newState.enemies.map(enemy => 
    updateEnemy(enemy, newState.players, deltaTime)
  );

  // Update treasures
  newState.treasures = newState.treasures.map(treasure => 
    updateTreasure(treasure, deltaTime)
  );

  // Update particles
  newState.particles = newState.particles
    .map(particle => updateParticle(particle, deltaTime))
    .filter(particle => particle.life > 0);

  // Check collisions
  newState = checkCollisions(newState);

  // Check level progression
  if (newState.enemies.length === 0) {
    newState = advanceLevel(newState);
  }

  // Check game over
  if (newState.players.every(player => player.health <= 0)) {
    newState.isGameOver = true;
  }

  return newState;
};

const updatePlayer = (
  player: Player,
  pressedKeys: { [key: string]: boolean },
  deltaTime: number
): Player => {
  const updatedPlayer = { ...player };

  // Update cooldowns
  updatedPlayer.attackCooldown = Math.max(0, updatedPlayer.attackCooldown - deltaTime);
  updatedPlayer.abilityCooldown = Math.max(0, updatedPlayer.abilityCooldown - deltaTime);

  // Regenerate energy
  if (updatedPlayer.energy < updatedPlayer.maxEnergy) {
    updatedPlayer.energy = Math.min(updatedPlayer.maxEnergy, updatedPlayer.energy + 0.5);
  }

  // Handle input
  if (player.id === 1) {
    // Player 1 controls (WASD)
    if (pressedKeys['KeyW']) {
      updatedPlayer.position.y = Math.max(0, updatedPlayer.position.y - PLAYER_SPEED);
      updatedPlayer.facing = 0;
    }
    if (pressedKeys['KeyS']) {
      updatedPlayer.position.y = Math.min(GAME_HEIGHT - 50, updatedPlayer.position.y + PLAYER_SPEED);
      updatedPlayer.facing = 180;
    }
    if (pressedKeys['KeyA']) {
      updatedPlayer.position.x = Math.max(0, updatedPlayer.position.x - PLAYER_SPEED);
      updatedPlayer.facing = 270;
    }
    if (pressedKeys['KeyD']) {
      updatedPlayer.position.x = Math.min(GAME_WIDTH - 50, updatedPlayer.position.x + PLAYER_SPEED);
      updatedPlayer.facing = 90;
    }
    if (pressedKeys['Space'] && updatedPlayer.attackCooldown <= 0) {
      updatedPlayer.isAttacking = true;
      updatedPlayer.attackCooldown = 500;
    }
    if (pressedKeys['ShiftLeft'] && updatedPlayer.abilityCooldown <= 0 && updatedPlayer.energy >= 30) {
      updatedPlayer.abilityActive = true;
      updatedPlayer.abilityCooldown = 3000;
      updatedPlayer.energy -= 30;
    }
  } else if (player.id === 2) {
    // Player 2 controls (Arrow keys)
    if (pressedKeys['ArrowUp']) {
      updatedPlayer.position.y = Math.max(0, updatedPlayer.position.y - PLAYER_SPEED);
      updatedPlayer.facing = 0;
    }
    if (pressedKeys['ArrowDown']) {
      updatedPlayer.position.y = Math.min(GAME_HEIGHT - 50, updatedPlayer.position.y + PLAYER_SPEED);
      updatedPlayer.facing = 180;
    }
    if (pressedKeys['ArrowLeft']) {
      updatedPlayer.position.x = Math.max(0, updatedPlayer.position.x - PLAYER_SPEED);
      updatedPlayer.facing = 270;
    }
    if (pressedKeys['ArrowRight']) {
      updatedPlayer.position.x = Math.min(GAME_WIDTH - 50, updatedPlayer.position.x + PLAYER_SPEED);
      updatedPlayer.facing = 90;
    }
    if (pressedKeys['Enter'] && updatedPlayer.attackCooldown <= 0) {
      updatedPlayer.isAttacking = true;
      updatedPlayer.attackCooldown = 500;
    }
    if (pressedKeys['ShiftRight'] && updatedPlayer.abilityCooldown <= 0 && updatedPlayer.energy >= 20) {
      // Dash ability
      const dashDistance = 50;
      const dashX = Math.cos((updatedPlayer.facing * Math.PI) / 180) * dashDistance;
      const dashY = Math.sin((updatedPlayer.facing * Math.PI) / 180) * dashDistance;
      
      updatedPlayer.position.x = Math.max(0, Math.min(GAME_WIDTH - 50, updatedPlayer.position.x + dashX));
      updatedPlayer.position.y = Math.max(0, Math.min(GAME_HEIGHT - 50, updatedPlayer.position.y + dashY));
      
      updatedPlayer.abilityActive = true;
      updatedPlayer.abilityCooldown = 2000;
      updatedPlayer.energy -= 20;
    }
  }

  // Reset attack state
  if (updatedPlayer.attackCooldown < 400) {
    updatedPlayer.isAttacking = false;
  }

  // Reset ability state
  if (updatedPlayer.abilityCooldown < 2500) {
    updatedPlayer.abilityActive = false;
  }

  return updatedPlayer;
};

const updateEnemy = (enemy: Enemy, players: Player[], deltaTime: number): Enemy => {
  const updatedEnemy = { ...enemy };

  // Find nearest player
  let nearestPlayer = players[0];
  let nearestDistance = getDistance(enemy.position, players[0].position);

  players.forEach(player => {
    if (player.health > 0) {
      const distance = getDistance(enemy.position, player.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPlayer = player;
      }
    }
  });

  // Move towards nearest player
  if (nearestPlayer && nearestPlayer.health > 0) {
    const dx = nearestPlayer.position.x - enemy.position.x;
    const dy = nearestPlayer.position.y - enemy.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      updatedEnemy.position.x += (dx / distance) * ENEMY_SPEED;
      updatedEnemy.position.y += (dy / distance) * ENEMY_SPEED;
    }
  }

  return updatedEnemy;
};

const updateTreasure = (treasure: Treasure, deltaTime: number): Treasure => {
  const updatedTreasure = { ...treasure };
  updatedTreasure.animation = (updatedTreasure.animation + 2) % 360;
  return updatedTreasure;
};

const updateParticle = (particle: Particle, deltaTime: number): Particle => {
  const updatedParticle = { ...particle };
  
  updatedParticle.position.x += updatedParticle.velocity.x * (deltaTime / 16);
  updatedParticle.position.y += updatedParticle.velocity.y * (deltaTime / 16);
  updatedParticle.life -= deltaTime;

  return updatedParticle;
};

const checkCollisions = (gameState: GameState): GameState => {
  let newState = { ...gameState };

  // Player-Enemy collisions
  newState.players.forEach((player, playerIndex) => {
    if (player.health <= 0) return;

    newState.enemies.forEach((enemy, enemyIndex) => {
      const distance = getDistance(player.position, enemy.position);
      
      if (distance < 30) {
        // Player attacks enemy
        if (player.isAttacking) {
          const damage = player.specialAbility === 'shield' ? 25 : 30;
          newState.enemies[enemyIndex].health -= damage;
          
          // Create hit particles
          for (let i = 0; i < 3; i++) {
            newState.particles.push(createParticle(enemy.position, 'hit'));
          }

          if (newState.enemies[enemyIndex].health <= 0) {
            newState.score += enemy.type === 'dragon' ? 100 : enemy.type === 'orc' ? 50 : 25;
            newState.enemies.splice(enemyIndex, 1);
          }
        }
        
        // Enemy attacks player (if not shielded)
        const isShielded = player.specialAbility === 'shield' && player.abilityActive;
        if (!isShielded) {
          const damage = enemy.attackDamage;
          newState.players[playerIndex].health = Math.max(0, newState.players[playerIndex].health - damage);
        }
      }
    });

    // Player-Treasure collisions
    newState.treasures.forEach((treasure, treasureIndex) => {
      if (treasure.collected) return;
      
      const distance = getDistance(player.position, treasure.position);
      
      if (distance < 25) {
        newState.treasures[treasureIndex].collected = true;
        
        // Apply treasure effects
        switch (treasure.type) {
          case 'coin':
            newState.score += treasure.value;
            break;
          case 'heart':
            newState.players[playerIndex].health = Math.min(
              newState.players[playerIndex].maxHealth,
              newState.players[playerIndex].health + treasure.value
            );
            break;
          case 'energy':
            newState.players[playerIndex].energy = Math.min(
              newState.players[playerIndex].maxEnergy,
              newState.players[playerIndex].energy + treasure.value
            );
            break;
          case 'powerup':
            newState.score += treasure.value;
            newState.players[playerIndex].health = newState.players[playerIndex].maxHealth;
            break;
        }

        // Create collect particles
        for (let i = 0; i < 5; i++) {
          newState.particles.push(createParticle(treasure.position, 'collect'));
        }

        // Remove collected treasure
        newState.treasures.splice(treasureIndex, 1);
      }
    });
  });

  return newState;
};

const advanceLevel = (gameState: GameState): GameState => {
  const newState = { ...gameState };
  newState.level += 1;
  newState.score += 100 * newState.level;

  // Spawn new enemies
  const enemyCount = Math.min(10, 2 + newState.level);
  for (let i = 0; i < enemyCount; i++) {
    newState.enemies.push(createEnemy(Date.now() + i, newState.level));
  }

  // Spawn new treasures
  const treasureCount = Math.min(8, 3 + Math.floor(newState.level / 2));
  for (let i = 0; i < treasureCount; i++) {
    newState.treasures.push(createTreasure(Date.now() + i + 1000));
  }

  return newState;
};

const createEnemy = (id: number, level: number): Enemy => {
  const types: Array<'goblin' | 'orc' | 'dragon'> = ['goblin', 'orc', 'dragon'];
  const type = types[Math.floor(Math.random() * Math.min(types.length, Math.ceil(level / 2)))];
  
  const baseHealth = type === 'dragon' ? 80 : type === 'orc' ? 50 : 30;
  const health = baseHealth + (level - 1) * 10;
  
  return {
    id,
    position: {
      x: Math.random() * (GAME_WIDTH - 100) + 50,
      y: Math.random() * (GAME_HEIGHT - 100) + 50,
      z: 0
    },
    velocity: { x: 0, y: 0, z: 0 },
    health,
    maxHealth: health,
    type,
    attackDamage: type === 'dragon' ? 25 : type === 'orc' ? 15 : 10,
    attackRange: 30,
    lastAttack: 0,
    target: null,
    size: type === 'dragon' ? 2 : type === 'orc' ? 1.5 : 1
  };
};

const createTreasure = (id: number): Treasure => {
  const types: Array<'coin' | 'heart' | 'energy' | 'powerup'> = ['coin', 'coin', 'coin', 'heart', 'energy', 'powerup'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let value = 10;
  switch (type) {
    case 'coin':
      value = 25;
      break;
    case 'heart':
      value = 30;
      break;
    case 'energy':
      value = 40;
      break;
    case 'powerup':
      value = 100;
      break;
  }

  return {
    id,
    position: {
      x: Math.random() * (GAME_WIDTH - 50) + 25,
      y: Math.random() * (GAME_HEIGHT - 50) + 25,
      z: 0
    },
    type,
    value,
    collected: false,
    animation: 0
  };
};

const createParticle = (position: Position, type: 'hit' | 'collect' | 'magic'): Particle => {
  const colors = {
    hit: '#FF4444',
    collect: '#FFD700',
    magic: '#8B5CF6'
  };

  return {
    id: Date.now() + Math.random(),
    position: { ...position },
    velocity: {
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
      z: 0
    },
    life: 1000,
    maxLife: 1000,
    color: colors[type],
    size: Math.random() * 8 + 4,
    type
  };
};

const getDistance = (pos1: Position, pos2: Position): number => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};