import { Player } from "../../../domain/models/player";
import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";

export interface UpdatePlayerInput {
  name?: string;
  email?: string;
}

export class UpdatePlayer {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(id: string, input: UpdatePlayerInput): Promise<Player> {
    
    const player = await this.playerRepository.findById(id);
    if (!player) {
      throw new Error("Jogador não encontrado.");
    }

    if (input.email && input.email !== player.email) {
      const emailExists = await this.playerRepository.findByEmail(input.email);
      if (emailExists) {
        throw new Error("O email fornecido já está em uso por outro jogador.");
      }
      player.updateEmail(input.email);
    }

    if (input.name) {
      player.updateName(input.name);
    }

    await this.playerRepository.save(player);
    
    return player; 
  }
}