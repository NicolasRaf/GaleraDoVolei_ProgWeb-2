import { Registration } from "../../../domain/models/registration";
import { IRegistrationRepository } from "../../../domain/repositories/IRegistrationRepository";

export class FindRegistrationsByMatch {
  constructor(private registrationRepository: IRegistrationRepository) {}

  async execute(matchId: string): Promise<Registration[]> {
    if (!matchId) {
      throw new Error("O ID da partida é obrigatório.");
    }
    
    return this.registrationRepository.findByMatchId(matchId);
  }
}