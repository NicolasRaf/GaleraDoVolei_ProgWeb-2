import { Request, Response, NextFunction } from 'express';
import { RegisterPlayerForMatch } from '../../application/use-cases/registration/RegisterPlayerForMatch';
import { CancelRegistration } from '../../application/use-cases/registration/CancelRegistration';
import { FindRegistrationsByMatch } from '../../application/use-cases/registration/FindRegistrationsByMatch';
import { FindRegistrationsByPlayer } from '../../application/use-cases/registration/FindRegistrationsByPlayer';

export class RegistrationController {
  
  constructor(
    private registerPlayerForMatch: RegisterPlayerForMatch,
    private cancelRegistration: CancelRegistration,
    private findRegistrationsByMatch: FindRegistrationsByMatch,
    private findRegistrationsByPlayer: FindRegistrationsByPlayer
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { playerId, matchId } = req.body;
      const newRegistration = await this.registerPlayerForMatch.execute({ playerId, matchId });

      return res.status(201).json(newRegistration); 
    } catch (error) {
      next(error); 
    }
  }


  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { matchId, playerId } = req.params; 
      await this.cancelRegistration.execute({ matchId, playerId });

      return res.status(204).send(); 
    } catch (error) {
      next(error);
    }
  }

  async findByMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { matchId } = req.params;
      const registrations = await this.findRegistrationsByMatch.execute(matchId);
      
      return res.status(200).json(registrations);
    } catch (error) {
      next(error);
    }
  }

  async findByPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const { playerId } = req.params; 
      const registrations = await this.findRegistrationsByPlayer.execute(playerId);
      
      return res.status(200).json(registrations);
    } catch (error) {
      next(error);
    }
  }
}