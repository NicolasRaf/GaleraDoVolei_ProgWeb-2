import { Arena, Zona } from "../../../domain/models/arena";
import { IArenaRepository } from "../../../domain/repositories/IArenaRepository";
import { v7 as uuid } from "uuid"; 

export interface CreateArenaInput {
  nome: string;
  zona: Zona;
  endereco?: string;
  geolocalizacao?: string;
}

export class CreateArena {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(input: CreateArenaInput): Promise<Arena> {
    const arenaId = uuid(); 
    
    const arena = new Arena(
      arenaId,
      input.nome,
      input.zona,
      input.endereco,
      input.geolocalizacao
    );
    await this.arenaRepository.save(arena);
    
    return arena;
  }
}