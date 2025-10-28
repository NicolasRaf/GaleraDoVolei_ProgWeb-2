import { Request, Response, NextFunction } from 'express';

import { CreateMatch } from '../../application/use-cases/match/CreateMatch';
import { FindAllMatches } from '../../application/use-cases/match/FindAllMatches';
import { FindMatchById } from '../../application/use-cases/match/FindMatchById';
import { UpdateMatch } from '../../application/use-cases/match/UpdateMatch';
import { DeleteMatch } from '../../application/use-cases/match/DeleteMatch';

export class MatchController {
  
  constructor(
    private createMatch: CreateMatch,
    private findAllMatches: FindAllMatches,
    private findMatchById: FindMatchById,
    private updateMatch: UpdateMatch,
    private deleteMatch: DeleteMatch
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { date: dateString, location } = req.body;
      const date = new Date(dateString);
      const newMatch = await this.createMatch.execute({ date, location });

      return res.status(201).json(newMatch); 
    } catch (error) {
      next(error); 
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.findAllMatches.execute();

      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const match = await this.findMatchById.execute(id);

      if (!match) {
        throw new Error("Partida não encontrada."); 
      }

      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { date: dateString, location, status, score } = req.body; 
      
      const date = dateString ? new Date(dateString) : undefined;
      const updatedMatch = await this.updateMatch.execute(id, { date, location, status, score }); 

      return res.status(200).json(updatedMatch); 
    } catch (error) {
      next(error); 
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteMatch.execute(id);

      return res.status(204).send(); 
    } catch (error) {
      next(error); 
    }
  }
}