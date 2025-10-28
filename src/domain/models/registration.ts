export class Registration {
  public readonly id: string;
  public readonly playerId: string; 
  public readonly matchId: string; 
  public readonly registrationDate: Date; 

  constructor(id: string, playerId: string, matchId: string) {
    if (!playerId || playerId.trim().length === 0) {
      throw new Error("O ID do jogador não pode ser vazio.");
    }
    if (!matchId || matchId.trim().length === 0) {
      throw new Error("O ID da partida não pode ser vazio.");
    }

    this.id = id;
    this.playerId = playerId;
    this.matchId = matchId;
    this.registrationDate = new Date();
  }
}