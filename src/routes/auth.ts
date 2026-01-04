import express from 'express';
import { AuthController } from '../Controllers/AuthController';
import { UserService } from '../Services/userServices';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userservice = new UserService(userRepository);
const Auth = new AuthController(userservice);

router.post('/register', (req, res) => Auth.register(req, res));

export default router;
