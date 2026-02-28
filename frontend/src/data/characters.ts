export interface Character {
  id: string;
  name: string;
  abilityName: string;
  abilityDescription: string;
  cooldown?: string;
  duration?: string;
  type: 'Active' | 'Passive';
}

export const characters: Character[] = [
  {
    id: 'alok',
    name: 'DJ Alok',
    abilityName: 'Drop the Beat',
    abilityDescription:
      'Creates a 5m aura that increases ally movement speed by 10% and restores 5 HP/s for 10 seconds. One of the most versatile active abilities in the game, great for aggressive pushes and team support.',
    cooldown: '45s',
    duration: '10s',
    type: 'Active',
  },
  {
    id: 'chrono',
    name: 'Chrono',
    abilityName: 'Time Turner',
    abilityDescription:
      'Creates a force field that blocks 600 damage from enemies. Inside the force field, movement speed increases by 15% for allies. Excellent for creating cover in open areas.',
    cooldown: '170s',
    duration: '4s',
    type: 'Active',
  },
  {
    id: 'dimitri',
    name: 'Dimitri',
    abilityName: 'Healing Heartbeat',
    abilityDescription:
      'Creates a 3.5m healing zone that allows downed allies to self-revive and restores 3 HP/s to all inside. Invaluable in squad matches for keeping the team alive under pressure.',
    cooldown: '85s',
    duration: '10s',
    type: 'Active',
  },
  {
    id: 'k',
    name: 'K (Captain Booyah)',
    abilityName: 'Master of All',
    abilityDescription:
      'Has two modes: Jiu-jitsu mode increases EP conversion rate for allies by 500%, and Psychology mode restores 2 EP every 3 seconds up to 150 EP. Switching modes has a 3s cooldown.',
    cooldown: '3s',
    type: 'Active',
  },
  {
    id: 'skyler',
    name: 'Skyler',
    abilityName: 'Riptide Rhythm',
    abilityDescription:
      'Emits a sonic wave that destroys up to 5 gloo walls ahead. Each gloo wall deployed also restores 4 HP. Extremely powerful against defensive players who rely on gloo walls.',
    cooldown: '60s',
    type: 'Active',
  },
  {
    id: 'hayato',
    name: 'Hayato',
    abilityName: 'Bushido',
    abilityDescription:
      'Increases armor penetration by 7.5% for every 10% decrease in max HP. Passive ability that rewards aggressive low-HP gameplay and punishes enemies with armor.',
    type: 'Passive',
  },
  {
    id: 'moco',
    name: 'Moco',
    abilityName: 'Hacker\'s Eye',
    abilityDescription:
      'Tags enemies shot for 5 seconds, sharing their location with teammates. Passive ability that provides crucial intel for squad coordination and tracking fleeing enemies.',
    duration: '5s',
    type: 'Passive',
  },
  {
    id: 'wukong',
    name: 'Wukong',
    abilityName: 'Camouflage',
    abilityDescription:
      'Transforms into a bush for 15 seconds. The camouflage ends when the player shoots or takes damage. Cooldown resets upon eliminating an enemy, making it deadly in aggressive plays.',
    cooldown: '200s',
    duration: '15s',
    type: 'Active',
  },
  {
    id: 'over',
    name: 'Jai',
    abilityName: 'Raging Reload',
    abilityDescription:
      'Automatically reloads 30% of the magazine after knocking down an enemy when using AR, SMG, Pistol, or Shotgun. Passive ability that rewards aggressive multi-kill plays.',
    type: 'Passive',
  },
  {
    id: 'xayne',
    name: 'Xayne',
    abilityName: 'Xtreme Encounter',
    abilityDescription:
      'Temporarily gains 80 HP and increases damage to gloo walls and shields by 100% for 15 seconds. Excellent for breaking through defensive setups and initiating fights.',
    cooldown: '150s',
    duration: '15s',
    type: 'Active',
  },
];
