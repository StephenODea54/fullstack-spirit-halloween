// Module Imports
import { asc, desc, eq, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

// Types
import type {
    GetBusinessCountsReturnType,
    GetBusinessMaxReturnType,
    GetBusinessReturnType,
} from '@/types/index.js';

const getBusinesses = (): GetBusinessReturnType[] => {
    const results = db
        .selectDistinct({
            id: schema.formerBusinesses.id,
            formerBusiness: schema.formerBusinesses.formerBusiness,
        })
        .from(schema.formerBusinesses)
        .orderBy(schema.formerBusinesses.formerBusiness)
        .all();

    return results;
};

const getBusinessCounts = (
    sort: 'ASC' | 'DESC' = 'DESC',
    limit: number = 10,
): GetBusinessCountsReturnType[] => {
    const results = db
        .select({
            id: schema.formerBusinesses.id,
            formerBusiness: schema.formerBusinesses.formerBusiness,
            totalLocations: sql<number>`COUNT(locations.former_business_id)`,
        })
        .from(schema.locations)
        .leftJoin(
            schema.formerBusinesses,
            eq(schema.locations.formerBusinessId, schema.formerBusinesses.internalId),
        )
        .groupBy(schema.formerBusinesses.id, schema.formerBusinesses.formerBusiness)
        .orderBy(
            sort === 'DESC'
                ? desc(sql<number>`COUNT(locations.former_business_id)`)
                : asc(sql<number>`COUNT(locations.former_business_id)`),
        )
        .limit(limit)
        .all();

    return results;
};

const getBusinessMax = (): GetBusinessMaxReturnType => {
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
    getBusinesses,
    getBusinessCounts,
    getBusinessMax,
};
