import { Player } from "../models/player";

export interface IPlayerRepository {
    
    // C/U - Create/Update
    save(player: Player): Promise<void>;

    // R - Único
    findById(id: string): Promise<Player | null>;
    findByEmail(email: string): Promise<Player | null>;

    // R - Todos
    findAll(): Promise<Player[]>;

    // D - Delete
    delete(id: string): Promise<void>;
}