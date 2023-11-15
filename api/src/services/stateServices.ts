// Module Imports
import { sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

// Types
import { GetStateCountsReturnType, GetStatesReturnType } from '@/types/index.js';

const getStates = (): GetStatesReturnType[] => {
    const results = db
        .selectDistinct({ id: schema.states.state, state: schema.states.state })
        .from(schema.states)
        .orderBy(schema.states.state)
        .all();

    return results;
};

const getStateCounts = (): GetStateCountsReturnType => {
    const result = db
        .select({ totalStates: sql<number>`COUNT(*)` })
        .from(schema.states)
        .all();
    return result[0];
};

export default {
    getStates,
    getStateCounts,
};
