// Module Imports
import express from 'express';

// Services Import
import locationServices from '@/services/locationServices.js';

const router = express.Router();

router.get('/', (_req, res) => {
    const locations = locationServices.getLocations();
    res.send(locations);
});

router.get('/total', (_req, res) => {
    const totalLocations = locationServices.getLocationCounts();
    res.send(totalLocations);
});

export default router;
