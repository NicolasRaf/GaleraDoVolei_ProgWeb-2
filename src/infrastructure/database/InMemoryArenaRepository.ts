import { Arena } from "../../domain/models/arena";
import { IArenaRepository } from "../../domain/repositories/IArenaRepository";
import { v7 as uuid } from "uuid"; 

export class InMemoryArenaRepository implements IArenaRepository {
    private arenas: Arena[] = [
        new Arena(uuid(), "THE Beach", "Leste"),
        new Arena(uuid(), "Arena Ypê", "Norte"),
    ];

    async save(arena: Arena): Promise<void> {
        const arenaIndex = this.arenas.findIndex(a => a.id === arena.id);
        if (arenaIndex > -1) {
            this.arenas[arenaIndex] = arena; 
        } else {
            this.arenas.push(arena); 
        }
    }

    async findById(id: string): Promise<Arena | null> {
        const arena = this.arenas.find(a => a.id === id);
        return arena || null;
    }

    async findAll(zona?: string): Promise<Arena[]> {
        if (zona) {
            return this.arenas.filter(arena => arena.zona === zona);
        }
        
        return this.arenas;
    }

    async delete(id: string): Promise<void> {
        this.arenas = this.arenas.filter(a => a.id !== id);
    }
}