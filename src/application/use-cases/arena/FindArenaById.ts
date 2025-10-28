import { Arena } from "../../../domain/models/arena";
import { IArenaRepository } from "../../../domain/repositories/IArenaRepository";

export class FindArenaById {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(id: string): Promise<Arena | null> {
    const arena = await this.arenaRepository.findById(id);
    
    return arena;
  }
}