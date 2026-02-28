export interface PlayerStats {
  playerNickname: string;
  playerUID: string;
  level: number;
  rankName: string;
  rankTier: number;
  kdRatio: number;
  winRate: number;
  totalMatches: number;
  headshotPercentage: number;
  totalKills: number;
  totalWins: number;
  avgDamage: number;
  avgSurvivalTime: string;
}

export const playerStats: PlayerStats = {
  playerNickname: 'BLAZER_FF',
  playerUID: '4829301756',
  level: 72,
  rankName: 'Heroic',
  rankTier: 3,
  kdRatio: 4.28,
  winRate: 18.5,
  totalMatches: 2847,
  headshotPercentage: 42.3,
  totalKills: 12184,
  totalWins: 527,
  avgDamage: 1340,
  avgSurvivalTime: '14:22',
};
