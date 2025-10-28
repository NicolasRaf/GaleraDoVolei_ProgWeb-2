import { Match } from "../../../domain/models/match";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

export class FindAllMatches {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(): Promise<Match[]> {
    return this.matchRepository.findAll();
  }
}