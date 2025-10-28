import { Rating } from "../models/rating";

export interface IRatingRepository {
  save(rating: Rating): Promise<void>;
  
  findById(id: string): Promise<Rating | null>;
  findByMatchId(matchId: string): Promise<Rating[]>;
  findRatingsReceivedByPlayer(ratedPlayerId: string): Promise<Rating[]>;
  findRatingsGivenByPlayer(raterPlayerId: string): Promise<Rating[]>;
  findByMatchRaterAndRated(matchId: string, raterPlayerId: string, ratedPlayerId: string): Promise<Rating | null>;

  delete(id: string): Promise<void>;
}