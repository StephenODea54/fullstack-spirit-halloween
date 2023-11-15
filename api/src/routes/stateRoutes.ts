// Module Imports
import express from 'express';

// Services Import
import stateServices from '@/services/stateServices.js';

const router = express.Router();

router.get('/', (_req, res) => {
    const stateNames = stateServices.getStates();

    res.send(stateNames);
});

router.get('/total', (_req, res) => {
    const totalLocations = stateServices.getStateCounts();
    res.send(totalLocations);
});

export default router;
