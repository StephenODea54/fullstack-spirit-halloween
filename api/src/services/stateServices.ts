// Module Imports
import { like, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

const getStateNames = (stateName?: string): { state: string }[] => {
    const query = db.selectDistinct({ state: schema.states.state }).from(schema.states);

    if (stateName === undefined) {
        return query.orderBy(schema.states.state).all();
    } else {
        return query
            .where(like(schema.states.state, `${stateName}%`))
            .orderBy(schema.states.state)
            .all();
    }
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
