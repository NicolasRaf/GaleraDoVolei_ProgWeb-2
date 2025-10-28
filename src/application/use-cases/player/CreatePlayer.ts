import { Player } from "../../../domain/models/player";
import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";

export interface CreatePlayerInput {
    name: string;
    email: string;
}

export class CreatePlayer {

    constructor(private playerRepository: IPlayerRepository) {}

    async execute(input:CreatePlayerInput): Promise<void> {
        const playerExists = await this.playerRepository.findByEmail(input.email);
        if (playerExists) throw new Error("Este email já esstá em uso");

        const player = new Player(`player_${Date.now}`, input.name, input.email);
        await this.playerRepository.save(player);
    }
}