import { Registration } from "../../domain/models/registration";
import { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";

export class InMemoryRegistrationRepository implements IRegistrationRepository {

  private registrations: Registration[] = [];

  async save(registration: Registration): Promise<void> {
    const regIndex = this.registrations.findIndex(r => r.id === registration.id);
    if (regIndex > -1) {
      this.registrations[regIndex] = registration; 
    } else {
      this.registrations.push(registration);
    }
  }

  async findById(id: string): Promise<Registration | null> {
    const registration = this.registrations.find(r => r.id === id);
    return registration || null;
  }

  async findByMatchId(matchId: string): Promise<Registration[]> {
    return this.registrations.filter(r => r.matchId === matchId);
  }

  async findByPlayerId(playerId: string): Promise<Registration[]> {
    return this.registrations.filter(r => r.playerId === playerId);
  }

  async findByMatchAndPlayer(matchId: string, playerId: string): Promise<Registration | null> {
    const registration = this.registrations.find(r => 
      r.matchId === matchId && r.playerId === playerId
    );
    return registration || null;
  }

  async delete(id: string): Promise<void> {
    this.registrations = this.registrations.filter(r => r.id !== id);
  }
}