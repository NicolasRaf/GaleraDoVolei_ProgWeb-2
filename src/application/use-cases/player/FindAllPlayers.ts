import { Player } from "../../../domain/models/player";
import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";

export class FindAllPlayers {
  
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(): Promise<Player[]> {
    const players = await this.playerRepository.findAll();
    return players;
  }
}