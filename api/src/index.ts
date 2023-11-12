// App
import app from '@/app.js';

// Config
import { PORT } from '@/config/index.js';

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
