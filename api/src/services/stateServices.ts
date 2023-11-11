// Module Imports
import { asc, desc, eq, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

// Types
import type { State } from '@/types/index.js';

const getStateCounts = (sort: 'ASC' | 'DESC' = 'DESC', limit: number = 10): State[] => {
    const results = db
        .select({
            id: schema.states.id,
            state: schema.states.state,
            totalLocations: sql<number>`COUNT(locations.state_id)`,
        })
        .from(schema.locations)
        .leftJoin(schema.states, eq(schema.locations.stateId, schema.states.internalId))
        .groupBy(schema.states.id, schema.states.state)
        .orderBy(
            sort === 'DESC'
                ? desc(sql<number>`COUNT(locations.state_id)`)
                : asc(sql<number>`COUNT(locations.state_id)`),
        )
        .limit(limit)
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
    getStateCounts,
    getTotalStates,
};
