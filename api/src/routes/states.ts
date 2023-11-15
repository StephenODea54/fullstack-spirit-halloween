// Module Imports
import express from 'express';

// Services Import
import stateServices from '@/services/stateServices.js';

// Types
import type { TypedRequestQuery } from '@/types/index.js';

const router = express.Router();

router.get('/', (req: TypedRequestQuery<{ state: string }[], { stateName: string | undefined }>, res) => {
    const { stateName } = req.query;
    const stateNames = stateServices.getStateNames(stateName);

    res.send(stateNames);
});

router.get('/total', (_req, res) => {
    const totalLocations = stateServices.getTotalStates();
    res.send(totalLocations);
});

export default router;
