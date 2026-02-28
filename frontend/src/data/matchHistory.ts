export type MatchMode = 'Classic' | 'Clash Squad' | 'Ranked';

export interface Match {
  id: string;
  mapName: string;
  placement: number;
  kills: number;
  damageDealt: number;
  survivalTime: string;
  mode: MatchMode;
  timestamp: string;
}

export const matchHistory: Match[] = [
  {
    id: 'm1',
    mapName: 'Bermuda',
    placement: 1,
    kills: 8,
    damageDealt: 2340,
    survivalTime: '28:14',
    mode: 'Ranked',
    timestamp: '2026-02-28T14:32:00Z',
  },
  {
    id: 'm2',
    mapName: 'Purgatory',
    placement: 3,
    kills: 5,
    damageDealt: 1820,
    survivalTime: '22:47',
    mode: 'Classic',
    timestamp: '2026-02-28T13:10:00Z',
  },
  {
    id: 'm3',
    mapName: 'Kalahari',
    placement: 7,
    kills: 4,
    damageDealt: 1450,
    survivalTime: '18:33',
    mode: 'Ranked',
    timestamp: '2026-02-28T11:55:00Z',
  },
  {
    id: 'm4',
    mapName: 'Bermuda',
    placement: 1,
    kills: 12,
    damageDealt: 3210,
    survivalTime: '30:02',
    mode: 'Classic',
    timestamp: '2026-02-28T10:20:00Z',
  },
  {
    id: 'm5',
    mapName: 'Nexterra',
    placement: 15,
    kills: 2,
    damageDealt: 780,
    survivalTime: '12:18',
    mode: 'Ranked',
    timestamp: '2026-02-27T22:45:00Z',
  },
  {
    id: 'm6',
    mapName: 'Purgatory',
    placement: 2,
    kills: 7,
    damageDealt: 2100,
    survivalTime: '25:50',
    mode: 'Classic',
    timestamp: '2026-02-27T21:30:00Z',
  },
  {
    id: 'm7',
    mapName: 'Bermuda',
    placement: 1,
    kills: 6,
    damageDealt: 1980,
    survivalTime: '27:15',
    mode: 'Clash Squad',
    timestamp: '2026-02-27T20:05:00Z',
  },
  {
    id: 'm8',
    mapName: 'Kalahari',
    placement: 22,
    kills: 1,
    damageDealt: 420,
    survivalTime: '08:44',
    mode: 'Classic',
    timestamp: '2026-02-27T18:50:00Z',
  },
  {
    id: 'm9',
    mapName: 'Nexterra',
    placement: 4,
    kills: 6,
    damageDealt: 1760,
    survivalTime: '20:30',
    mode: 'Ranked',
    timestamp: '2026-02-27T17:15:00Z',
  },
  {
    id: 'm10',
    mapName: 'Bermuda',
    placement: 1,
    kills: 10,
    damageDealt: 2890,
    survivalTime: '29:40',
    mode: 'Ranked',
    timestamp: '2026-02-27T15:40:00Z',
  },
  {
    id: 'm11',
    mapName: 'Purgatory',
    placement: 9,
    kills: 3,
    damageDealt: 1100,
    survivalTime: '16:22',
    mode: 'Classic',
    timestamp: '2026-02-27T14:00:00Z',
  },
  {
    id: 'm12',
    mapName: 'Kalahari',
    placement: 5,
    kills: 5,
    damageDealt: 1650,
    survivalTime: '21:08',
    mode: 'Clash Squad',
    timestamp: '2026-02-27T12:30:00Z',
  },
];
