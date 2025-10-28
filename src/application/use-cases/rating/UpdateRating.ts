import { Rating } from "../../../domain/models/rating";
import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

 
export interface UpdateRatingInput {
  score?: number;
  comment?: string;
}

export class UpdateRating {
  constructor(
      private ratingRepository: IRatingRepository,
      private matchRepository: IMatchRepository 
    ) {}

  async execute(id: string, input: UpdateRatingInput): Promise<Rating> {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) {
        throw new Error("Avaliação não encontrada.");
    }

    const match = await this.matchRepository.findById(rating.matchId);
    if (match && match.status !== 'concluida') { 
        throw new Error("Não é possível editar a avaliação neste momento.");
    }

    if (input.score !== undefined) {
        rating.updateScore(input.score);
    }

    if (input.comment !== undefined) {
        rating.updateComment(input.comment);
    }

    await this.ratingRepository.save(rating);
    return rating;
  }
}