// Module Imports
import express from 'express';

// Router Imports
import locationRouter from '@/routes/locations.js';
import stateRouter from '@/routes/states.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/locations', locationRouter);
app.use('/api/states', stateRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
