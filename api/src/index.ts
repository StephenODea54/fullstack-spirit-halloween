// Module Imports
import express from 'express';

// Router Imports
import locationRouter from '@/routes/locations.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/locations', locationRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
