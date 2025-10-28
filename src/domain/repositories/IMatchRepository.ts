import { Match, MatchStatus } from "../models/match";

export interface IMatchRepository {
  
  // C (Create) e U (Update)
  save(match: Match): Promise<void>;

  // R (Read)
  findById(id: string): Promise<Match | null>;
  findAll(): Promise<Match[]>;
  
  // R (Read) 
  findByStatus(status: MatchStatus): Promise<Match[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Match[]>;

  // D (Delete)
  delete(id: string): Promise<void>;
}