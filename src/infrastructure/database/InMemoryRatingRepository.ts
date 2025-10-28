import { Rating } from "../../domain/models/rating";
import { IRatingRepository } from "../../domain/repositories/IRatingRepository";

export class InMemoryRatingRepository implements IRatingRepository {
  private ratings: Rating[] = [];

  async save(rating: Rating): Promise<void> {
    const index = this.ratings.findIndex(r => r.id === rating.id);
    if (index > -1) {
      this.ratings[index] = rating; 
    } else {
      this.ratings.push(rating); 
    }
  }

  async findById(id: string): Promise<Rating | null> {
    const rating = this.ratings.find(r => r.id === id);
    return rating || null;
  }

  async findByMatchId(matchId: string): Promise<Rating[]> {
    return this.ratings.filter(r => r.matchId === matchId);
  }

  async findRatingsReceivedByPlayer(ratedPlayerId: string): Promise<Rating[]> {
    return this.ratings.filter(r => r.ratedPlayerId === ratedPlayerId);
  }

  async findRatingsGivenByPlayer(raterPlayerId: string): Promise<Rating[]> {
    return this.ratings.filter(r => r.raterPlayerId === raterPlayerId);
  }

  async findByMatchRaterAndRated(matchId: string, raterPlayerId: string, ratedPlayerId: string): Promise<Rating | null> {
    const rating = this.ratings.find(r => 
      r.matchId === matchId && 
      r.raterPlayerId === raterPlayerId && 
      r.ratedPlayerId === ratedPlayerId
    );

    return rating || null;
  }

  async delete(id: string): Promise<void> {
    this.ratings = this.ratings.filter(r => r.id !== id);
  }
}