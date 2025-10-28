import { Match, MatchStatus } from "../../domain/models/match";
import { IMatchRepository } from "../../domain/repositories/IMatchRepository";

export class InMemoryMatchRepository implements IMatchRepository {

  private matches: Match[] = [];

  async save(match: Match): Promise<void> {
    const matchIndex = this.matches.findIndex(m => m.id === match.id);
    if (matchIndex > -1) {
      this.matches[matchIndex] = match;
    } else {
      this.matches.push(match); 
    }
  }

  async findById(id: string): Promise<Match | null> {
    const match = this.matches.find(m => m.id === id);
    return match || null;
  }

  async findAll(): Promise<Match[]> {
    return this.matches;
  }

  async findByStatus(status: MatchStatus): Promise<Match[]> {
    return this.matches.filter(m => m.status === status);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Match[]> {
    return this.matches.filter(m => 
      m.date >= startDate && m.date <= endDate
    );
  }

  async delete(id: string): Promise<void> {
    this.matches = this.matches.filter(m => m.id !== id);
  }
}