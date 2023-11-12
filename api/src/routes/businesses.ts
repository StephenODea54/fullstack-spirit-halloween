// Module Imports
import express from 'express';

// Services Import
import businessServices from '@/services/businessServices.js';

const router = express.Router();

router.get('/max', (_req, res) => {
    const highestFormerBusinessCount = businessServices.getHighestFormerBusiness();
    res.send(highestFormerBusinessCount);
});

export default router;
