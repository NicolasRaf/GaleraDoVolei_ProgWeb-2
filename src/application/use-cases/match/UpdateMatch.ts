import { Match, MatchStatus, MatchScore } from "../../../domain/models/match";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";

export interface UpdateMatchInput {
  date?: Date;
  location?: string;
  status?: MatchStatus;
  score?: MatchScore;  
}

export class UpdateMatch {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(id: string, input: UpdateMatchInput): Promise<Match> {
    const match = await this.matchRepository.findById(id);
    if (!match) throw new Error("Partida não encontrada.");

    if (input.location) {
        if (input.location.trim().length === 0) {
            throw new Error("A localização da partida não pode ser vazia.");
        }
        match.location = input.location;
    }
    if (input.date) { 
        if (!(input.date instanceof Date) || isNaN(input.date.getTime())) {
            throw new Error("A data da partida é inválida.");
        }
        match.date = input.date;
    }

    if (input.status && input.status !== match.status) {
      switch (input.status) {
        case 'em-andamento':
          match.startMatch(); 
          break;
        case 'concluida':
          if (!input.score) {
            throw new Error("É necessário fornecer o placar (score) para finalizar a partida.");
          }
          match.finishMatch(input.score); 
          break;
        case 'cancelada':
          match.cancelMatch();
          break;
        case 'agendada':
          throw new Error(`Mudança de status inválida para '${input.status}'.`);
        default:
          throw new Error(`Status desconhecido: ${input.status}`);
      }
    } else if (input.score && match.status === 'concluida') {
        throw new Error(` Não é possível definir um placar para uma partida concluida.`);
    } else if (input.score && match.status !== 'concluida') {
        throw new Error(`Não é possível definir um placar para uma partida com status '${match.status}'.`);
    }

    await this.matchRepository.save(match);
    return match;
  }
}