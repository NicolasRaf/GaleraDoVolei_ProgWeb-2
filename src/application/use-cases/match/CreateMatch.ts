import { Match } from "../../../domain/models/match";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

export interface CreateMatchInput {
  date: Date; 
  location: string;
}

export class CreateMatch {
  
  constructor(private matchRepository: IMatchRepository) {}

  async execute(input: CreateMatchInput): Promise<Match> { 
    const matchId = `match_${Date.now()}`; 
    const match = new Match(matchId, input.date, input.location);
    await this.matchRepository.save(match);

    return match;
  }
}