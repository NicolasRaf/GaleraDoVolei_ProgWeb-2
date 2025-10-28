import { Registration } from "../models/registration";

export interface IRegistrationRepository {
    // C e U 
    save(registration: Registration): Promise<void>;

    // R
    findById(id: string): Promise<Registration | null>;
    findByMatchId(matchId: string): Promise<Registration[]>;
    findByPlayerId(playerId: string): Promise<Registration[]>;

    // R 
    findByMatchAndPlayer(matchId: string, playerId: string): Promise<Registration | null>;

    // D
    delete(id: string): Promise<void>;
}