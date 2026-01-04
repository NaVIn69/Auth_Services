import { Response } from 'express';
import { RegisteruserRequest } from '../types/index';

import { UserService } from '../Services/userServices';

export class AuthController {
    UserService: UserService;
    constructor(UserService: UserService) {
        this.UserService = UserService;
    }

    async register(req: RegisteruserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        await this.UserService.create({ firstName, lastName, email, password });
        res.status(201).json({
            message: 'user successfully registered',
        });
    }
}
