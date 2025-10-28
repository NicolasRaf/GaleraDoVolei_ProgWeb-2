import { Rating } from "../../../domain/models/rating";
import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";

export class FindRatingById {
  constructor(private ratingRepository: IRatingRepository) {}

  async execute(id: string): Promise<Rating | null> {
    if (!id) throw new Error("O ID da avaliação é obrigatório.");
    const rating = await this.ratingRepository.findById(id);
    
    return rating;
  }
}