// Module Imports
import cors from 'cors';
import express from 'express';

// Logging
import { requestLogger } from '@/logging/index.js';

// Router Imports
import businessRouter from '@/routes/businesses.js';
import locationRouter from '@/routes/locations.js';
import stateRouter from '@/routes/states.js';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use('/api/businesses', businessRouter);
app.use('/api/locations', locationRouter);
app.use('/api/states', stateRouter);

export default app;
