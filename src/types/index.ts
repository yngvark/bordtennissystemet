export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Match {
  id: string;
  home: string;
  away: string;
  homeScore?: number;
  awayScore?: number;
  completed: boolean;
}

export type { Player, Match };
