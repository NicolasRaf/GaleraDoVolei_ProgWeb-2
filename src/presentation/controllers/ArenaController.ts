import { Request, Response, NextFunction } from 'express';
import { Zona } from '../../domain/models/arena';
import { CreateArena } from '../../application/use-cases/arena/CreateArena';
import { FindAllArenas } from '../../application/use-cases/arena/FindAllArenas';
import { FindArenaById } from '../../application/use-cases/arena/FindArenaById';
import { UpdateArena } from '../../application/use-cases/arena/UpdateArena';
import { DeleteArena } from '../../application/use-cases/arena/DeleteArena';

export class ArenaController {
  
  constructor(
    private createArena: CreateArena,
    private findAllArenas: FindAllArenas,
    private findArenaById: FindArenaById, 
    private updateArena: UpdateArena,     
    private deleteArena: DeleteArena
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, zona, endereco, geolocalizacao } = req.body;
      const newArena = await this.createArena.execute({ nome, zona, endereco, geolocalizacao });

      return res.status(201).json(newArena);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const zona = req.query.zona as Zona | undefined; 
      const arenas = await this.findAllArenas.execute(zona);
    
      return res.status(200).json(arenas);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const arena = await this.findArenaById.execute(id);
      if (!arena) throw new Error("Arena não encontrada."); 
      
      return res.status(200).json(arena);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { nome, zona, endereco, geolocalizacao } = req.body;
      const updatedArena = await this.updateArena.execute(id, { nome, zona, endereco, geolocalizacao });

      return res.status(200).json(updatedArena); 
    } catch (error) {
      next(error); 
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteArena.execute(id);
      return res.status(204).send(); 
    } catch (error) {
      next(error); 
    }
  }
}