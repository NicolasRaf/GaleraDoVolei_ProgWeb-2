import { Registration } from "../../../domain/models/registration";
import { IRegistrationRepository } from "../../../domain/repositories/IRegistrationRepository";
import { IPlayerRepository } from "../../../domain/repositories/IPlayerRepository";
import { IMatchRepository } from "../../../domain/repositories/IMatchRepository";
import { Match } from "../../../domain/models/match";
import { v7 as uuid } from "uuid"; 

export interface RegisterPlayerInput {
    playerId: string;
    matchId: string;
}

export class RegisterPlayerForMatch {
  
  constructor(
    private registrationRepository: IRegistrationRepository,
    private playerRepository: IPlayerRepository,
    private matchRepository: IMatchRepository
  ) {}

async execute(input: RegisterPlayerInput): Promise<Registration> {
    const { playerId, matchId } = input;

    const player = await this.playerRepository.findById(playerId);
    if (!player) throw new Error("Jogador não encontrado.");

    const match = await this.matchRepository.findById(matchId);
    if (!match) throw new Error("Partida não encontrada.");

    const existingRegistration = await this.registrationRepository.findByMatchAndPlayer(matchId, playerId);
    if (existingRegistration) throw new Error("Jogador já inscrito nesta partida.");
    
    match.addPlayer(playerId); 
    
    const registrationId = uuid();
    const registration = new Registration(registrationId, playerId, matchId);

    await this.registrationRepository.save(registration);
    await this.matchRepository.save(match);

    return registration;
  }
}