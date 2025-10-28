export type MatchStatus = 'agendada' | 'em-andamento' | 'concluida' | 'cancelada';

export interface MatchScore {
  teamA: number;
  teamB: number;
}

export class Match {
  public readonly id: string;
  public date: Date;
  public location: string;
  public status: MatchStatus;
  
  private readonly MAX_PLAYERS = 12;
  public players: string[] = []; 
  public score: MatchScore | null = null;

  constructor(id: string, date: Date, location: string) {
    
    if (!location || location.trim().length === 0) {
      throw new Error("A localização da partida não pode ser vazia.");
    }
    
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("A data da partida é inválida.");
    }

    if (date.getTime() < (Date.now() - 60000)) { 
      throw new Error("Não é possível agendar uma partida em uma data passada.");
    }

    this.id = id;
    this.date = date;
    this.location = location;
    this.status = 'agendada'; 
  }

// --- Métodos de Domínio para Gerenciar Jogadores ---

  /** Adiciona um jogador à lista de inscritos */
  public addPlayer(playerId: string): void {
    if (this.status !== 'agendada') {
      throw new Error("Só é possível inscrever jogadores em partidas agendadas.");
    }
    if (this.players.length >= this.MAX_PLAYERS) {
      throw new Error(`A partida já atingiu o limite de ${this.MAX_PLAYERS} jogadores.`);
    }
    if (this.players.includes(playerId)) {
      // Poderíamos lançar erro ou só ignorar
      console.warn(`Jogador ${playerId} já está inscrito na partida ${this.id}.`);
      return; 
    }
    this.players.push(playerId);
  }

  /** Remove um jogador da lista de inscritos */
  public removePlayer(playerId: string): void {
    // Permitir cancelar mesmo se a partida já começou? Decisão de negócio.
    // Vamos restringir a 'agendada' por enquanto.
    if (this.status !== 'agendada') { 
      throw new Error("Só é possível cancelar inscrição de partidas agendadas.");
    }
    const index = this.players.indexOf(playerId);
    if (index > -1) {
      this.players.splice(index, 1);
    } else {
        console.warn(`Jogador ${playerId} não encontrado na lista de inscritos da partida ${this.id}.`);
    }
  }

  public startMatch(): void {
    if (this.status !== 'agendada') {
      throw new Error("Apenas partidas 'agendadas' podem ser iniciadas.");
    }
    if (this.players.length < 4) {
      throw new Error("São necessários pelo menos 2 jogadores inscritos para iniciar a partida.");
    }

    this.status = 'em-andamento';
    this.score = null; 
  }

  public finishMatch(finalScore: MatchScore): void {
    if (this.status !== 'em-andamento') {
      throw new Error("Apenas partidas 'em-andamento' podem ser finalizadas.");
    }
    // Validar o placar
    if (!finalScore || 
        typeof finalScore.teamA !== 'number' || finalScore.teamA < 0 || !Number.isInteger(finalScore.teamA) ||
        typeof finalScore.teamB !== 'number' || finalScore.teamB < 0 || !Number.isInteger(finalScore.teamB)) {
      throw new Error("Placar inválido. Forneça pontuações não-negativas inteiras para teamA e teamB.");
    }

    this.status = 'concluida';
    this.score = finalScore;
  }

  public cancelMatch(): void {
    if (this.status === 'concluida') {
      throw new Error("Não é possível cancelar uma partida já concluída.");
    }

    this.status = 'cancelada';
    this.score = null;
  }
}