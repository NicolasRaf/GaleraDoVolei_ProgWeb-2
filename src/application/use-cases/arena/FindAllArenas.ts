import { Arena, Zona } from "../../../domain/models/arena";
import { IArenaRepository } from "../../../domain/repositories/IArenaRepository";

export class FindAllArenas {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(zona?: Zona): Promise<Arena[]> {
    return this.arenaRepository.findAll(zona);
  }
}