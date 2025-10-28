import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";

export class DeletePlayer {
  constructor(private playerRepository: IPlayerRepository) {}

  async execute(id: string): Promise<void> {
    
    const player = await this.playerRepository.findById(id);
    if (!player) {
      throw new Error("Jogador não encontrado.");
    }

    await this.playerRepository.delete(id);
  }
}