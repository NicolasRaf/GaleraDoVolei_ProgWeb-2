import { Rating } from "../../../domain/models/rating";
import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";

export class FindRatingsByMatch {
  constructor(private ratingRepository: IRatingRepository) {}

  async execute(matchId: string): Promise<Rating[]> {
    if (!matchId) throw new Error("O ID da partida é obrigatório.");
    
    return this.ratingRepository.findByMatchId(matchId);
  }
}