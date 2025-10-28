import { Request, Response, NextFunction } from 'express';
import { CreatePlayer } from '../../application/use-cases/player/CreatePlayer';
import { FindAllPlayers } from '../../application/use-cases/player/FindAllPlayers';
import { FindPlayerById } from '../../application/use-cases/player/FindPlayerById';
import { UpdatePlayer } from '../../application/use-cases/player/UpdatePlayer';
import { DeletePlayer } from '../../application/use-cases/player/DeletePlayer';

export class PlayerController {

    constructor(
        private createPlayer: CreatePlayer,
        private findAllPlayers: FindAllPlayers,
        private findPlayerById: FindPlayerById,
        private updatePlayer: UpdatePlayer,
        private deletePlayer: DeletePlayer
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try { 
            const { name, email } = req.body;
            await this.createPlayer.execute({ name, email });
            
            return res.status(201).send();
        } catch (error) {
            next(error); 
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const players = await this.findAllPlayers.execute();

            return res.status(200).json(players);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const player = await this.findPlayerById.execute(id);

            if (!player) {
                throw new Error("Jogador não encontrado."); 
            }

            return res.status(200).json(player);
        } catch (error) {
            next(error);    
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const updatedPlayer = await this.updatePlayer.execute(id, { name, email });

            return res.status(200).json(updatedPlayer); 
        } catch (error) {
            next(error); 
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.deletePlayer.execute(id);

            return res.status(204).send(); 
        } catch (error) {
            next(error);
        }
    }
}