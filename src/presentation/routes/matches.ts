import { Router } from 'express';
import { MatchController } from '../controllers/MatchController'; 

export const createMatchesRouter = (controller: MatchController): Router => {
  const router = Router();

  router.post('/', (req, res, next) => controller.create(req, res, next));
  router.get('/', (req, res, next) => controller.findAll(req, res, next));
  router.get('/:id', (req, res, next) => controller.findById(req, res, next));
  router.put('/:id', (req, res, next) => controller.update(req, res, next));
  router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

  return router;
};