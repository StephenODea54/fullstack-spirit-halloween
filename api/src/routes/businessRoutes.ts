// Module Imports
import express from 'express';

// Services Import
import businessServices from '@/services/businessServices.js';

// Types
import type { GetBusinessCountsReturnType, TypedRequestQuery } from '@/types/index.js';

const router = express.Router();

router.get('/', (_req, res) => {
    const formerBusinesses = businessServices.getBusinesses();

    res.send(formerBusinesses);
});

router.get(
    '/counts',
    (req: TypedRequestQuery<GetBusinessCountsReturnType[], { sort: 'ASC' | 'DESC'; limit: number }>, res) => {
        const { sort, limit } = req.query;
        const stateCounts = businessServices.getBusinessCounts(sort, limit);

        res.send(stateCounts);
    },
);

router.get('/max', (_req, res) => {
    const highestFormerBusinessCount = businessServices.getBusinessMax();
    res.send(highestFormerBusinessCount);
});

export default router;
