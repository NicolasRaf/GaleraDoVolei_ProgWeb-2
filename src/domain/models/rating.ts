export class Rating {
  public readonly id: string;
  public readonly matchId: string;
  public readonly raterPlayerId: string; 
  public readonly ratedPlayerId: string; 
  public score: number; 
  public comment?: string;
  public readonly createdAt: Date;
  
  constructor(
    id: string,
    matchId: string,
    raterPlayerId: string,
    ratedPlayerId: string,
    score: number, 
    comment?: string ){

      if (!matchId) throw new Error("O ID da partida é obrigatório.");
      if (!raterPlayerId) throw new Error("O ID do jogador avaliador é obrigatório.");
      if (!ratedPlayerId) throw new Error("O ID do jogador avaliado é obrigatório.");
      
      if (raterPlayerId === ratedPlayerId) {
        throw new Error("Um jogador não pode avaliar a si mesmo.");
      }
      validateScore(score); 

      this.id = id;
      this.matchId = matchId;
      this.raterPlayerId = raterPlayerId;
      this.ratedPlayerId = ratedPlayerId;
      this.score = score;
      this.comment = comment;
      this.createdAt = new Date();
    }

  updateComment(newComment?: string): void {
      this.comment = newComment;
  }

  updateScore(newScore: number): void {
      validateScore(newScore); 
      this.score = newScore;
  }
}

function validateScore(score: number) {
  if (typeof score !== 'number' || score < 1 || score > 5 || !Number.isInteger(score)) {
    throw new Error("A pontuação deve ser um número inteiro entre 1 e 5.");
  }
}