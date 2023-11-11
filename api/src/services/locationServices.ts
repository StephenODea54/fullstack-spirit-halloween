// Module Imports
import { eq } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

// Types
import type { Location } from '@/types/index.js';

const getLocations = async (): Promise<Location[]> => {
    const locations = await db
        .select({
            id: schema.locations.id,
            address: schema.locations.address,
            city: schema.cities.city,
            state: schema.states.state,
            zip: schema.zipCodes.zip,
            formerBusiness: schema.formerBusinesses.formerBusiness,
        })
        .from(schema.locations)
        .leftJoin(schema.cities, eq(schema.locations.cityId, schema.cities.internalId))
        .leftJoin(schema.states, eq(schema.locations.stateId, schema.states.internalId))
        .leftJoin(schema.zipCodes, eq(schema.locations.zipId, schema.zipCodes.internalId))
        .leftJoin(
            schema.formerBusinesses,
            eq(schema.locations.formerBusinessId, schema.formerBusinesses.internalId),
        );

    return locations;
};

export default {
    getLocations,
};
