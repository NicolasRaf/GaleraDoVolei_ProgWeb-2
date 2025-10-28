import { Player } from "../../../domain/models/player";
import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";

export class FindPlayerById {
  
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(id: string): Promise<Player | null> {
    const player = await this.playerRepository.findById(id);
    return player; 
  }
}