import { Arena, Zona } from "../models/arena";

export interface IArenaRepository {
    save(arena: Arena): Promise<void>;
    findById(id: string): Promise<Arena | null>;
    findAll(zona?: Zona): Promise<Arena[]>; 
    delete(id: string): Promise<void>;
}