import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

export class DeleteRating {
  constructor(
      private ratingRepository: IRatingRepository,
      private matchRepository: IMatchRepository
    ) {}

  async execute(id: string): Promise<void> {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) {
        throw new Error("Avaliação não encontrada.");
    }

    const match = await this.matchRepository.findById(rating.matchId);
    if (match && match.status !== 'concluida') { 
        throw new Error("Não é possível deletar a avaliação neste momento.");
    }

    await this.ratingRepository.delete(id);
  }
}