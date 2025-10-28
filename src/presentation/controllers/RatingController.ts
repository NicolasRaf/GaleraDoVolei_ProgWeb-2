import { Request, Response, NextFunction } from 'express';
import { CreateRating } from '../../application/use-cases/rating/CreateRating';
import { FindRatingsByMatch } from '../../application/use-cases/rating/FindRatingsByMatch';
import { FindRatingsGivenByPlayer } from '../../application/use-cases/rating/FindRatingsGivenByPlayer';
import { FindRatingsReceivedByPlayer } from '../../application/use-cases/rating/FindRatingsReceivedByPlayer';
import { FindRatingById } from '../../application/use-cases/rating/FindRatingById';
import { UpdateRating } from '../../application/use-cases/rating/UpdateRating';
import { DeleteRating } from '../../application/use-cases/rating/DeleteRating'

export class RatingController {
  
  constructor(
    private createRating: CreateRating,
    private findRatingsByMatch: FindRatingsByMatch,
    private findRatingsGivenByPlayer: FindRatingsGivenByPlayer,
    private findRatingsReceivedByPlayer: FindRatingsReceivedByPlayer,
    private findRatingById: FindRatingById,
    private updateRating: UpdateRating,
    private deleteRating: DeleteRating
  ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
        const { matchId, raterPlayerId, ratedPlayerId, score, comment } = req.body;

        const newRating = await this.createRating.execute({ 
            matchId, raterPlayerId, ratedPlayerId, score, comment 
        });
        
        return res.status(201).json(newRating); 

        } catch (error) {
            next(error); 
        }
    }

    async findReceivedByPlayer(req: Request, res: Response, next: NextFunction) {
        try {
        const { playerId } = req.params;
        const ratings = await this.findRatingsReceivedByPlayer.execute(playerId);

        return res.status(200).json(ratings);
        } catch (error) {
            next(error);
        }
    }

    async findGivenByPlayer(req: Request, res: Response, next: NextFunction) {
        try {
            const { playerId } = req.params; 
            const ratings = await this.findRatingsGivenByPlayer.execute(playerId);

            return res.status(200).json(ratings);
        } catch (error) {
            next(error);
        }
    }

    async findByMatch(req: Request, res: Response, next: NextFunction) {
        try {
            const { matchId } = req.params; 
            const ratings = await this.findRatingsByMatch.execute(matchId);

            return res.status(200).json(ratings);
        } catch (error) {
            next(error);
        }
    }  

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const rating = await this.findRatingById.execute(id);
            if (!rating) throw new Error("Avaliação não encontrada."); 
            
            return res.status(200).json(rating);
        } catch (error) {
            next(error); 
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { score, comment } = req.body; 
            const updatedRating = await this.updateRating.execute(id, { score, comment });

            return res.status(200).json(updatedRating); 
        } catch (error) {
            next(error); 
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.deleteRating.execute(id);

            return res.status(204).send(); 
        } catch (error) {
            next(error); 
        }
    }
}
