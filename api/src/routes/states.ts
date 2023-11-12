// Module Imports
import express, { type Request } from 'express';

// Services Import
import stateServices from '@/services/stateServices.js';

// Types
import { State } from '@/types/index.js';
type EmptyRecord = Record<string, never>;

const router = express.Router();

router.get(
    '/counts',
    (req: Request<EmptyRecord, State[], EmptyRecord, { sort: 'ASC' | 'DESC'; limit: number }>, res) => {
        const { sort, limit } = req.query;
        const stateCounts = stateServices.getStateCounts(sort, limit);

        res.send(stateCounts);
    },
);

router.get('/total', (_req, res) => {
    const totalLocations = stateServices.getTotalStates();
    res.send(totalLocations);
});

export default router;
