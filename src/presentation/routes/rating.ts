import { Router } from 'express';
import { RatingController } from '../controllers/RatingController';

export const createRatingRouter = (controller: RatingController): Router => {
  const router = Router();

  router.post('/', (req, res, next) => controller.create(req, res, next));
  
  router.get('/player/:playerId/received', (req, res, next) => controller.findReceivedByPlayer(req, res, next));
  router.get('/player/:playerId/given', (req, res, next) => controller.findGivenByPlayer(req, res, next));
  router.get('/match/:matchId', (req, res, next) => controller.findByMatch(req, res, next));
  router.get('/:id', (req, res, next) => controller.findById(req, res, next));
  
  router.put('/:id', (req, res, next) => controller.update(req, res, next));

  router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

  return router;
};