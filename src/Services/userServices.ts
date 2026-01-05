import { UserData } from '../types/index';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password, role }: UserData) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (user) {
            const error = createHttpError(400, 'Email already exist');
            throw error;
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
            });
        } catch {
            const error = createHttpError(
                500,
                'failed to store in the Database',
            );
            throw error;
        }
    }
}
