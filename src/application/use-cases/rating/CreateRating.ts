import { Rating } from "../../../domain/models/rating";
import { IRatingRepository } from "../../../domain/repositories/IRatingRepository";
import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";
import { IRegistrationRepository } from "../../../domain/repositories/IRegistrationRepository"; 
import { v7 as uuid } from "uuid";

export interface CreateRatingInput {
  matchId: string;
  raterPlayerId: string;
  ratedPlayerId: string;
  score: number;
  comment?: string;
}

export class CreateRating {
  
  constructor(
    private ratingRepository: IRatingRepository,
    private playerRepository: IPlayerRepository,
    private matchRepository: IMatchRepository,
    private registrationRepository: IRegistrationRepository 
  ) {}

  async execute(input: CreateRatingInput): Promise<Rating> {
    
    const raterPlayer = await this.playerRepository.findById(input.raterPlayerId);
    if (!raterPlayer) {
      throw new Error("Jogador avaliador não encontrado.");
    }

    const ratedPlayer = await this.playerRepository.findById(input.ratedPlayerId);
    if (!ratedPlayer) {
      throw new Error("Jogador avaliado não encontrado.");
    }

    const match = await this.matchRepository.findById(input.matchId);
    if (!match) {
      throw new Error("Partida não encontrada.");
    }

    if (match.status !== 'concluida') {
      throw new Error(`Não é possível avaliar jogadores de uma partida que ainda não foi concluída (status: '${match.status}').`);
    }

    const raterRegistration = await this.registrationRepository.findByMatchAndPlayer(
      input.matchId,
      input.raterPlayerId
    );
    if (!raterRegistration) {
      throw new Error("O jogador avaliador não participou desta partida.");
    }
    
    const ratedRegistration = await this.registrationRepository.findByMatchAndPlayer(
      input.matchId,
      input.ratedPlayerId
    );
    if (!ratedRegistration) {
      throw new Error("O jogador avaliado não participou desta partida.");
    }

    const existingRating = await this.ratingRepository.findByMatchRaterAndRated(
      input.matchId,
      input.raterPlayerId,
      input.ratedPlayerId
    );

    if (existingRating) {
      throw new Error("Você já avaliou este jogador para esta partida.");
    }

    const ratingId = uuid();
    const rating = new Rating(ratingId, input.matchId, input.raterPlayerId, input.ratedPlayerId, input.score, input.comment);
    await this.ratingRepository.save(rating);
    
    return rating;
  }
}