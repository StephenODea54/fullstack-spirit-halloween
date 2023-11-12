// Module Imports
import cors from 'cors';
import express from 'express';

// Config
import { PORT } from '@/config/index.js';

// Router Imports
import businessRouter from '@/routes/businesses.js';
import locationRouter from '@/routes/locations.js';
import stateRouter from '@/routes/states.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/businesses', businessRouter);
app.use('/api/locations', locationRouter);
app.use('/api/states', stateRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT || 3000}`);
});
