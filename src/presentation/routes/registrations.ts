import { Router } from 'express';
import { RegistrationController } from '../controllers/RegistrationController';

export const createRegistrationsRouter = (controller: RegistrationController): Router => {
  const router = Router();

  router.get('/match/:matchId', (req, res, next) => controller.findByMatch(req, res, next));
  router.get('/player/:playerId', (req, res, next) => controller.findByPlayer(req, res, next));
  router.post('/', (req, res, next) => controller.register(req, res, next));
  router.delete('/match/:matchId/player/:playerId', (req, res, next) => controller.cancel(req, res, next));

  return router;
};