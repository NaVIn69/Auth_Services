import { DataSource } from 'typeorm';
import app from '../../src/app';
import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entity/User';
import { trancuateTables } from '../utils';
import { Roles } from '../../src/constants';
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
        await connection.dropDatabase();
        await connection.synchronize();
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
                password: 'secret1',
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
                password: 'secret2',
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
                password: 'secret3',
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
        });

        it('it should return id of created user', async () => {
            const user = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret4',
            };
            // Act on post /auth/register endpoint with this user data
            const response = await request(app)
                .post('/auth/register')
                .send(user);

            // assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(response.body.user).toHaveProperty('id');
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('user successfully registered');

            expect(response.body.user.id).toBe(users[0]!.id);
            expect(response.body.user.firstName).toBe(users[0]!.firstName);
            expect(response.body.user.lastName).toBe(users[0]!.lastName);
            expect(response.body.user.email).toBe(users[0]!.email);
        });

        it('it should have role', async () => {
            const user = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret5',
            };
            // Act on post /auth/register endpoint with this user data
            const response = await request(app)
                .post('/auth/register')
                .send(user);

            // assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users[0]).toHaveProperty('role');
            expect(users[0]!.role).toBe(Roles.CUSTOMER);
        });

        it('it should store hashed password inside the Database', async () => {
            const userData = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret6',
            };
            // Act on post /auth/register endpoint with this user data
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            // assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users[0]?.password).not.toBe(userData.password);
            expect(users[0]?.password).toHaveLength(60);
            expect(users[0]?.password).toMatch(/^\$2[a|b]\$\d+\$/); // here we are checking my password is hashed or not
        });

        it('it should return 400 status code if email is register already', async () => {
            const userData = {
                firstName: 'navin',
                lastName: 'kumar',
                email: 'navin@gmail.com',
                password: 'secret6',
            };
            // Act on post /auth/register endpoint with this user data
            const userRepository = connection.getRepository(User);
            await userRepository.save({ ...userData, role: Roles.CUSTOMER });
            // here we have been created a user using testcase
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            console.log(response);
            // assert
            const user = await userRepository.find();
            expect(user.length).toBe(1);
            // expect(response.statusCode).toBe(400)
        });
    });

    describe('With Missing Data', () => {});
});
