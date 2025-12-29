import express from 'express';
import { AuthController } from '../Controllers/AuthController';

const router = express.Router();
const Auth = new AuthController();

router.post('/register', (req, res) => Auth.register(req, res));

export default router;
