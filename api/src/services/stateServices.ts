// Module Imports
import { desc, eq, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

// Types
import { GetStatesReturnType } from '@/types/index.js';

const getStates = (): GetStatesReturnType[] => {
    const results = db
        .selectDistinct({ id: schema.states.state, state: schema.states.state })
        .from(schema.states)
        .orderBy(schema.states.state)
        .all();

    return results;
};

export default {
    getStates,
};
