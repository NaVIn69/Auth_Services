import { DataSource } from 'typeorm';
import app from '../../src/app';
import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entity/User';
import { trancuateTables } from '../utils';
// AAA
// A-> arrange all the data
// A-> act -> using supertest , act on the endpoint
// A -> assert -> check
describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        // it will run before any test case run
        connection = await AppDataSource.initialize();
        // await connection.synchronize(true);
    });

    beforeEach(async () => {
        // database trancuate
        await trancuateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    // beforing running any test case we have to clean our whole database of test DB not to get conflict with another test case
    describe('Given all the data', () => {
        it('it should return 201 status code', async () => {
            // arrange
            const user = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret',
            };
            // Act on post /auth/register endpoint with this user data
            const response = await request(app)
                .post('/auth/register')
                .send(user);
            // assert
            expect(response.statusCode).toBe(201);
        });

        it('should be valid json', async () => {
            // arrange
            const user = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret',
            };
            // Act on post /auth/register endpoint with this user data
            const response = await request(app)
                .post('/auth/register')
                .send(user);
            // assert
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'),
            );
        });

        it('should presist the user in database', async () => {
            const userData = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret',
            };
            // Act on post /auth/register endpoint with this user data
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0]?.firstName).toBe(userData.firstName);
            expect(users[0]?.lastName).toBe(userData.lastName);
            expect(users[0]?.email).toBe(userData.email);
            expect(users[0]?.password).toBe(userData.password);
        });
    });

    describe('With Missing Data', () => {});
});
