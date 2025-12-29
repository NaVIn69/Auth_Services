import app from '../../src/app';
import request from 'supertest';

// AAA
// A-> arrange all the data
// A-> act -> using supertest , act on the endpoint
// A -> assert -> check
describe('POST /auth/register', () => {
    describe('Given all the data', () => {
        it('it should return 201 status code', async () => {
            // arrange
            const user = {
                firstname: 'navin',
                lastname: 'kumar',
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
                firstname: 'navin',
                lastname: 'kumar',
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
    });

    describe('With Missing Data', () => {});
});
