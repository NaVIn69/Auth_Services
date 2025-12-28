import { DiscountPrice } from './src/utlis';
import request from 'supertest';
import app from './src/app';

describe('DiscountPrice()', () => {
    it('should apply 10% discount correctly', () => {
        const price = DiscountPrice(100, 10);
        expect(price).toBe(90);
    });

    it('should apply 20% discount correctly', () => {
        const price = DiscountPrice(200, 20);
        expect(price).toBe(160);
    });

    it('should return same price for 0% discount', () => {
        const price = DiscountPrice(150, 0);
        expect(price).toBe(150);
    });

    it('should return 0 when price is 0', () => {
        const price = DiscountPrice(0, 50);
        expect(price).toBe(0);
    });

    it('should return 200 status code', async () => {
        const response = await request(app).get('/').send();
        expect(response.statusCode).toBe(200);
    });
});
