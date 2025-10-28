import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './presentation/exceptions/globalErrorHandler';


// --- IMPORTS DE PLAYER ---
import { createPlayerRouter } from './presentation/routes/player';
import { PlayerController } from './presentation/controllers/PlayerController';
import { InMemoryPlayerRepository } from './infrastructure/database/InMemoryPlayerRepository';
import { CreatePlayer } from './application/use-cases/player/CreatePlayer';
import { FindAllPlayers } from './application/use-cases/player/FindAllPlayers';
import { FindPlayerById } from './application/use-cases/player/FindPlayerById';
import { UpdatePlayer } from './application/use-cases/player/UpdatePlayer';
import { DeletePlayer } from './application/use-cases/player/DeletePlayer';

// --- IMPORTS DE MATCH ---
import { createMatchesRouter } from './presentation/routes/matches';
import { MatchController } from './presentation/controllers/MatchController';
import { InMemoryMatchRepository } from './infrastructure/database/InMemoryMatchRepository';
import { CreateMatch } from './application/use-cases/match/CreateMatch';
import { FindAllMatches } from './application/use-cases/match/FindAllMatches';
import { FindMatchById } from './application/use-cases/match/FindMatchById';
import { UpdateMatch } from './application/use-cases/match/UpdateMatch';
import { DeleteMatch } from './application/use-cases/match/DeleteMatch';

// --- IMPORTS DE ARENA ---
import { createArenaRouter } from './presentation/routes/arena';
import { ArenaController } from './presentation/controllers/ArenaController';
import { InMemoryArenaRepository } from './infrastructure/database/InMemoryArenaRepository';
import { CreateArena } from './application/use-cases/arena/CreateArena';
import { FindAllArenas } from './application/use-cases/arena/FindAllArenas';
import { FindArenaById } from './application/use-cases/arena/FindArenaById';
import { UpdateArena } from './application/use-cases/arena/UpdateArena';
import { DeleteArena } from './application/use-cases/arena/DeleteArena';

// --- IMPORTS DE REGISTRATIONS ---
import { InMemoryRegistrationRepository } from './infrastructure/database/InMemoryRegistrationRepository';
import { RegistrationController } from './presentation/controllers/RegistrationController';
import { createRegistrationsRouter } from './presentation/routes/registrations';
import { RegisterPlayerForMatch } from './application/use-cases/registration/RegisterPlayerForMatch';
import { CancelRegistration } from './application/use-cases/registration/CancelRegistration';
import { FindRegistrationsByMatch } from './application/use-cases/registration/FindRegistrationsByMatch';
import { FindRegistrationsByPlayer } from './application/use-cases/registration/FindRegistrationsByPlayer';

// --- IMPORTS RATING ---
import { createRatingRouter } from './presentation/routes/rating';
import { RatingController } from './presentation/controllers/RatingController';
import { InMemoryRatingRepository } from './infrastructure/database/InMemoryRatingRepository';
import { CreateRating } from './application/use-cases/rating/CreateRating';
import { FindRatingsByMatch } from './application/use-cases/rating/FindRatingsByMatch';
import { FindRatingsGivenByPlayer } from './application/use-cases/rating/FindRatingsGivenByPlayer';
import { FindRatingsReceivedByPlayer } from './application/use-cases/rating/FindRatingsReceivedByPlayer';
import { FindRatingById } from './application/use-cases/rating/FindRatingById';
import { UpdateRating } from './application/use-cases/rating/UpdateRating';
import { DeleteRating } from './application/use-cases/rating/DeleteRating';

const app = express();
app.use(express.json());
app.use(cors());

// --- COMPOSIÇÃO DE PLAYER ---
const playerRepository = new InMemoryPlayerRepository();
const createPlayerUseCase = new CreatePlayer(playerRepository);
const findAllPlayersUseCase = new FindAllPlayers(playerRepository);
const findPlayerByIdUseCase = new FindPlayerById(playerRepository);
const updatePlayerUseCase = new UpdatePlayer(playerRepository);
const deletePlayerUseCase = new DeletePlayer(playerRepository);

const playerController = new PlayerController(
  createPlayerUseCase, findAllPlayersUseCase, findPlayerByIdUseCase, updatePlayerUseCase, deletePlayerUseCase
);
const playerRouter = createPlayerRouter(playerController);

// --- COMPOSIÇÃO DE MATCH ---
const matchRepository = new InMemoryMatchRepository();
const createMatchUseCase = new CreateMatch(matchRepository);
const findAllMatchesUseCase = new FindAllMatches(matchRepository);
const findMatchByIdUseCase = new FindMatchById(matchRepository);
const updateMatchUseCase = new UpdateMatch(matchRepository);
const deleteMatchUseCase = new DeleteMatch(matchRepository);

const matchController = new MatchController(
  createMatchUseCase, findAllMatchesUseCase, findMatchByIdUseCase, updateMatchUseCase, deleteMatchUseCase
);
const matchesRouter = createMatchesRouter(matchController);

// --- COMPOSIÇÃO DE ARENA ---
const arenaRepository = new InMemoryArenaRepository();
const createArenaUseCase = new CreateArena(arenaRepository);
const findAllArenasUseCase = new FindAllArenas(arenaRepository);
const findArenaByIdUseCase = new FindArenaById(arenaRepository);
const updateArenaUseCase = new UpdateArena(arenaRepository)
const deleteArenaUseCase = new DeleteArena(arenaRepository);

const arenaController = new ArenaController(
  createArenaUseCase, findAllArenasUseCase, findArenaByIdUseCase, updateArenaUseCase, deleteArenaUseCase
);

const arenaRouter = createArenaRouter(arenaController);

// --- COMPOSIÇÃO REGISTRATION ---
const registrationRepository = new InMemoryRegistrationRepository();
const registerPlayerForMatchUseCase = new RegisterPlayerForMatch(registrationRepository, playerRepository, matchRepository);
const cancelRegistrationUseCase = new CancelRegistration(registrationRepository, matchRepository);
const findRegistrationsByMatchUseCase = new FindRegistrationsByMatch(registrationRepository);
const findRegistrationsByPlayerUseCase = new FindRegistrationsByPlayer(registrationRepository);

const registrationController = new RegistrationController(
  registerPlayerForMatchUseCase, cancelRegistrationUseCase, findRegistrationsByMatchUseCase, findRegistrationsByPlayerUseCase
);
const registrationsRouter = createRegistrationsRouter(registrationController);

// --- COMPOSIÇÃO RATING ---
const ratingRepository = new InMemoryRatingRepository();

const createRatingUseCase = new CreateRating(
  ratingRepository,       
  playerRepository,       
  matchRepository,        
  registrationRepository  
);

const findRatingsByMatchUseCase = new FindRatingsByMatch(ratingRepository);
const findRatingsGivenByPlayerUseCase = new FindRatingsGivenByPlayer(ratingRepository);
const findRatingsReceivedByPlayerUseCase = new FindRatingsReceivedByPlayer(ratingRepository);
const findRatingByIdUseCase = new FindRatingById(ratingRepository);
const updateRatingUseCase = new UpdateRating(ratingRepository, matchRepository);
const deleteRatingUseCase = new DeleteRating(ratingRepository, matchRepository);

const ratingController = new RatingController(
  createRatingUseCase,  
  findRatingsByMatchUseCase, 
  findRatingsGivenByPlayerUseCase, 
  findRatingsReceivedByPlayerUseCase,
  findRatingByIdUseCase,
  updateRatingUseCase,
  deleteRatingUseCase
);
const ratingRouter = createRatingRouter(ratingController);


app.use('/players', playerRouter);
app.use('/matches', matchesRouter); 
app.use('/arenas', arenaRouter);
app.use('/registrations', registrationsRouter);
app.use('/ratings', ratingRouter);

app.use(globalErrorHandler);

export { app };