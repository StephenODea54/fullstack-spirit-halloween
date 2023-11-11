// Module Imports
import express from 'express';

// Services Import
import locationServices from '@/services/locationServices.js';

const router = express.Router();

router.get('/', async (_req, res) => {
    const locations = await locationServices.getLocations();

    res.send(locations);
});

export default router;
