// Module Imports
import { desc, eq, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

const getHighestFormerBusiness = (): { formerBusiness: string; totalLocations: number } => {
    const result = db
        .select({
            formerBusiness: schema.formerBusinesses.formerBusiness,
            totalLocations: sql<number>`COUNT(locations.former_business_id)`,
        })
        .from(schema.locations)
        .leftJoin(
            schema.formerBusinesses,
            eq(schema.locations.formerBusinessId, schema.formerBusinesses.internalId),
        )
        .groupBy(schema.formerBusinesses.formerBusiness)
        .orderBy(desc(sql<number>`COUNT(locations.former_business_id)`))
        .limit(1)
        .all();

    return result[0];
};

export default {
    getHighestFormerBusiness,
};
