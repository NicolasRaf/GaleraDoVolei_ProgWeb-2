import { IRegistrationRepository } from "../../../domain/repositories/IRegistrationRepository";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";
import { Match } from "../../../domain/models/match";

export interface CancelRegistrationInput {
    matchId: string;
    playerId: string;
}

export class CancelRegistration {
  
  constructor(
    private registrationRepository: IRegistrationRepository,
    private matchRepository: IMatchRepository 
  ) {}

    async execute(input: CancelRegistrationInput): Promise<void> {
      const { matchId, playerId } = input;

      const registration = await this.registrationRepository.findByMatchAndPlayer(matchId, playerId);
      if (!registration) throw new Error("Inscrição não encontrada para este jogador nesta partida.");

      const match = await this.matchRepository.findById(matchId);

      
      if (match) {
          match.removePlayer(playerId); 
          await this.matchRepository.save(match); 
      } else {
          throw new Error("Partida nao encontrada.");
      }

      await this.registrationRepository.delete(registration.id); 
    }
}