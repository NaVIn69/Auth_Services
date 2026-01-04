import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Config } from '.';
import logger from './logger';

// export const AppDataSource = new DataSource({
//     // here db credentianls must be keep the according to the enviromental
//     // like in testing we use testing db and their credentials
//     type: 'postgres',
//     host: 'locahost',
//     port:5432,
//     username: Config.DB_USERNAME,
//     password: Config.DB_PASSWORD,
//     database: Config.DB_NAME,
//     // we have to do false in prod
//     synchronize: Config.NODE_ENV === 'test' || Config.NODE_ENV === 'Dev',
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// });
logger.info(Config.DB_USERNAME);

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'new_password',
    database: 'mern_auth_service_test',
    entities: [User],
    synchronize: false,
});
