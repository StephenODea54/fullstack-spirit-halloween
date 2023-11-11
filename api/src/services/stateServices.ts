// Module Imports
import { sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

const getTotalStates = (): { totalStates: number } => {
    const result = db
        .select({ totalStates: sql<number>`count(*)` })
        .from(schema.states)
        .all();
    return result[0];
};

export default {
    getTotalStates,
};
