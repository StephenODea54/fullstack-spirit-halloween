// Module Imports
import express from 'express';

// Services Import
import businessServices from '@/services/businessServices.js';

// Types
import type { FormerBusiness, TypedRequestQuery } from '@/types/index.js';

const router = express.Router();

router.get(
    '/counts',
    (req: TypedRequestQuery<FormerBusiness[], { sort: 'ASC' | 'DESC'; limit: number }>, res) => {
        const { sort, limit } = req.query;
        const stateCounts = businessServices.getFormerBusinessCounts(sort, limit);

        res.send(stateCounts);
    },
);

router.get('/max', (_req, res) => {
    const highestFormerBusinessCount = businessServices.getHighestFormerBusiness();
    res.send(highestFormerBusinessCount);
});

export default router;
