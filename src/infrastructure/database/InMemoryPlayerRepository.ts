import { Player } from "../../domain/models/player";
import { IPlayerRepository } from "../../domain/repositories/IPlayerRepository";

export class InMemoryPlayerRepository implements IPlayerRepository {
  
  private players: Player[] = [];

  // C (Create) e U (Update)
  async save(player: Player): Promise<void> {
    const playerIndex = this.players.findIndex(p => p.id === player.id);

    if (playerIndex > -1) {
      this.players[playerIndex] = player;
    } else {
      this.players.push(player);
    }
  }

  // R (Read) - 
  async findByEmail(email: string): Promise<Player | null> {
    const player = this.players.find(p => p.email === email);
    return player || null; 
  }

  // R (Read) 
  async findById(id: string): Promise<Player | null> {
    const player = this.players.find(p => p.id === id);
    return player || null;
  }

  // R (Read)
  async findAll(): Promise<Player[]> {
    return this.players;
  }
  
  async findByName(name: string): Promise<Player[]> {
    return this.players.filter(p => p.name === name);
  }

  async delete(id: string): Promise<void> {
    this.players = this.players.filter(p => p.id !== id);
  }
}