import express from 'express';
import { AuthController } from '../Controllers/AuthController';
import { UserService } from '../Services/userServices';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import logger from '../config/logger';

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userservice = new UserService(userRepository);
const Auth = new AuthController(userservice, logger);

router.post('/register', (req, res, next) => Auth.register(req, res, next));

export default router;
