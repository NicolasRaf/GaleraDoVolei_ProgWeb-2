import { Rating } from "../../../domain/models/rating";
import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";

export class FindRatingsReceivedByPlayer {
  constructor(private ratingRepository: IRatingRepository) {}

  async execute(playerId: string): Promise<Rating[]> {
    if (!playerId) throw new Error("O ID do jogador é obrigatório.");

    return this.ratingRepository.findRatingsReceivedByPlayer(playerId);
  }
}