import { NextFunction, Response } from 'express';
import { RegisteruserRequest } from '../types/index';

import { UserService } from '../Services/userServices';
import { Logger } from 'winston';

export class AuthController {
    constructor(
        private UserService: UserService,
        private logger: Logger,
    ) {}

    async register(
        req: RegisteruserRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { firstName, lastName, email, password } = req.body;
            this.logger.debug('new Request we get for new User', {
                firstName,
                lastName,
                email,
                password: '*******',
            });
            const user = await this.UserService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info('user registered successfully', { id: user.id });
            res.status(201).json({
                message: 'user successfully registered',
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            });
        } catch (error) {
            next(error);
            return;
        }
    }
}
