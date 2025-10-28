import { Arena, Zona } from "../../../domain/models/arena";
import { IArenaRepository } from "../../../domain/repositories/IArenaRepository";

export interface UpdateArenaInput {
  nome?: string;
  zona?: Zona;
  endereco?: string;
  geolocalizacao?: string;
}

export class UpdateArena {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(id: string, input: UpdateArenaInput): Promise<Arena> {
    const arena = await this.arenaRepository.findById(id);
    if (!arena) {
      throw new Error("Arena não encontrada.");
    }

    if (input.nome !== undefined) {
      arena.updateNome(input.nome);
    }
    if (input.zona !== undefined) {
      arena.updateZona(input.zona);
    }
    if (input.endereco !== undefined) {
      arena.updateEndereco(input.endereco);
    }
    if (input.geolocalizacao !== undefined) {
      arena.updateGeolocalizacao(input.geolocalizacao);
    }

    await this.arenaRepository.save(arena);
    return arena;
  }
}