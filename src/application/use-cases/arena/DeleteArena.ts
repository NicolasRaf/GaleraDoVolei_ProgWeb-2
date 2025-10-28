import { IArenaRepository } from "../../../domain/repositories/IArenaRepository";

export class DeleteArena {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(id: string): Promise<void> {
    const arena = await this.arenaRepository.findById(id);
    if (!arena) throw new Error("Arena não encontrada.");
    
    await this.arenaRepository.delete(id);
  }
}