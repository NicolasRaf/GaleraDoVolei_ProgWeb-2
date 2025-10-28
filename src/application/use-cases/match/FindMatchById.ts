import { Match } from "../../../domain/models/match";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

export class FindMatchById {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(id: string): Promise<Match | null> {
    const match = await this.matchRepository.findById(id);
    return match;
  }
}