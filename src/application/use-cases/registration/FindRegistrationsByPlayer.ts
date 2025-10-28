import { Registration } from "../../../domain/models/registration";
import { IRegistrationRepository } from "../../../domain/repositories/IRegistrationRepository";

export class FindRegistrationsByPlayer {
    constructor(private registrationRepository: IRegistrationRepository) {}

    async execute(playerId: string): Promise<Registration[]> {
        if (!playerId) throw new Error("O ID do jogador é obrigatório.");
        
        return this.registrationRepository.findByPlayerId(playerId);
    }
}