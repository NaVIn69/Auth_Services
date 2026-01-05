import { UserData } from '../types/index';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import createHttpError from 'http-errors';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        try {
            const user = this.userRepository.create({
                firstName,
                lastName,
                email,
                password,
            });
            return await this.userRepository.save(user);
        } catch {
            const error = createHttpError(
                500,
                'failed to store in the Database',
            );
            throw error;
        }
    }
}
