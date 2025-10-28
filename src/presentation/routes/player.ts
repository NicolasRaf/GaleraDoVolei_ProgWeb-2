import { Router } from 'express';
import { PlayerController } from '../controllers/PlayerController';

export const createPlayerRouter = (controller: PlayerController): Router => {
    const router = Router();

    router.post('/', (req, res, next) => controller.create(req, res, next));
    router.get('/', (req, res, next) => controller.findAll(req, res, next));
    router.get('/:id', (req, res, next) => controller.findById(req, res, next));
    router.put('/:id', (req, res, next) => controller.update(req, res, next));
    router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

    return router;
};