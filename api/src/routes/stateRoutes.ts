// Module Imports
import express from 'express';

// Services Import
import stateServices from '@/services/stateServices.js';

const router = express.Router();

router.get('/', (_req, res) => {
    const stateNames = stateServices.getStates();

    res.send(stateNames);
});

export default router;
