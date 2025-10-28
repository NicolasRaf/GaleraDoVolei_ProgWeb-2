import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

export class DeleteMatch {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(id: string): Promise<void> {
    const match = await this.matchRepository.findById(id);
    if (!match) {
      throw new Error("Partida não encontrada.");
    }
    
    await this.matchRepository.delete(id);
  }
}