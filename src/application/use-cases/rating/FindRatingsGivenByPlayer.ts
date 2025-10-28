import { Rating } from "../../../domain/models/rating";
import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";

export class FindRatingsGivenByPlayer {
  constructor(private ratingRepository: IRatingRepository) {}

  async execute(playerId: string): Promise<Rating[]> {
    if (!playerId) throw new Error("O ID do jogador é obrigatório.");
    
    return this.ratingRepository.findRatingsGivenByPlayer(playerId);
  }
}