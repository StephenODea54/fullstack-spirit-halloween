// Module Imports
import express from 'express';

// Services Import
import stateServices from '@/services/stateServices.js';

// Types
import { State, TypedRequestQuery } from '@/types/index.js';

const router = express.Router();

router.get('/counts', (req: TypedRequestQuery<State[], { sort: 'ASC' | 'DESC'; limit: number }>, res) => {
    const { sort, limit } = req.query;
    const stateCounts = stateServices.getStateCounts(sort, limit);

    res.send(stateCounts);
});

router.get('/total', (_req, res) => {
    const totalLocations = stateServices.getTotalStates();
    res.send(totalLocations);
});

export default router;
