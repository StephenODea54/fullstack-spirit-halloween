// Module Imports
import express from 'express';

// Services Import
import stateServices from '@/services/stateServices.js';

const router = express.Router();

router.get('/total', (_req, res) => {
    const totalLocations = stateServices.getTotalStates();
    res.send(totalLocations);
});

export default router;
