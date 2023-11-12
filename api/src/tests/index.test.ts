/* eslint @typescript-eslint/no-unsafe-member-access: 0 */

// Module Imports
import request, { type Response } from 'supertest';
import app from '@/app.js';

// Helper Functions
const check200StatusCode = (response: Response): void => {
    expect(response.statusCode).toBe(200);
};

const checkJsonResponse = (response: Response): void => {
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
};

const checkSort = (response: Response, sort: 'ASC' | 'DESC', key: string): void => {
    if (sort === 'DESC') {
        expect(response.body[0].totalLocations >= response.body[1][key]).toBe(true);
    } else {
        expect(response.body[0].totalLocations <= response.body[1][key]).toBe(true);
    }
};

const checkLength = (response: Response, length: number): void => {
    expect(response.body).toHaveLength(length);
};

// Tests
describe('Businesses Router Test Suite', () => {
    it('Ensures the /api/businesses/max route exists and is of type object', async () => {
        const response = await request(app).get('/api/businesses/max');

        check200StatusCode(response);
        checkJsonResponse(response);
        expect(Array.isArray(response.body)).toBe(false);
    });

    it('Ensures the /api/businesses/counts route exists and that the default parameters are working', async () => {
        const response = await request(app).get('/api/businesses/counts');

        check200StatusCode(response);
        checkJsonResponse(response);
        checkSort(response, 'DESC', 'totalLocations');
        checkLength(response, 10);
    });

    it('Ensures the /api/businesses/counts?sort= route exists and that the sort query parameter is working', async () => {
        const response = await request(app).get('/api/businesses/counts?sort=ASC');

        check200StatusCode(response);
        checkJsonResponse(response);
        checkSort(response, 'ASC', 'totalLocations');
    });

    it('Ensures the /api/businesses/counts?limit route exists and that the limit query parameter is working', async () => {
        const response = await request(app).get('/api/businesses/counts?limit=20');

        check200StatusCode(response);
        checkJsonResponse(response);
        checkLength(response, 20);
    });
});
