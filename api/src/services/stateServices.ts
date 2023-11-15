// Module Imports
import { like, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

const getStateNames = (stateName: string): { state: string }[] => {
    const results = db
        .selectDistinct({ state: schema.states.state })
        .from(schema.states)
        .where(like(schema.states.state, `${stateName}%`))
        .orderBy(schema.states.state)
        .all();

    return results;
};

const getTotalStates = (): { totalStates: number } => {
    const result = db
        .select({ totalStates: sql<number>`COUNT(*)` })
        .from(schema.states)
        .all();
    return result[0];
};

export default {
    getStateNames,
    getTotalStates,
};
