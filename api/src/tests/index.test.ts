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
    it('Tests the /api/businesses/max route', async () => {
        const response = await request(app).get('/api/businesses/max');

        check200StatusCode(response);
        checkJsonResponse(response);
        expect(Array.isArray(response.body)).toBe(false);
    });

    it('Tests the /api/businesses/counts route', async () => {
        const responseDefaultParams = await request(app).get('/api/businesses/counts');

        check200StatusCode(responseDefaultParams);
        checkJsonResponse(responseDefaultParams);
        checkSort(responseDefaultParams, 'DESC', 'totalLocations');
        checkLength(responseDefaultParams, 10);

        const responseAscending = await request(app).get('/api/businesses/counts?sort=ASC');

        check200StatusCode(responseAscending);
        checkJsonResponse(responseAscending);
        checkSort(responseAscending, 'ASC', 'totalLocations');

        const responseNonDefaultLimit = await request(app).get('/api/businesses/counts?limit=20');

        check200StatusCode(responseNonDefaultLimit);
        checkJsonResponse(responseNonDefaultLimit);
        checkLength(responseNonDefaultLimit, 20);
    });
});
