// Module Imports
import { asc, desc, eq, like, sql } from 'drizzle-orm';

// DB Imports
import { db } from '@/db/db.js';
import * as schema from '@/db/schema.js';

// Types
import type { FormerBusiness } from '@/types/index.js';

const getBusinessNames = (businessName: string | undefined): { formerBusiness: string }[] => {
    const query = db
        .selectDistinct({ formerBusiness: schema.formerBusinesses.formerBusiness })
        .from(schema.formerBusinesses);

    if (businessName === undefined) {
        return query.orderBy(schema.formerBusinesses.formerBusiness).all();
    } else {
        return query
            .where(like(schema.formerBusinesses.formerBusiness, `${businessName}%`))
            .orderBy(schema.formerBusinesses.formerBusiness)
            .all();
    }
};

const getFormerBusinessCounts = (sort: 'ASC' | 'DESC' = 'DESC', limit: number = 10): FormerBusiness[] => {
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
    getBusinessNames,
    getFormerBusinessCounts,
    getHighestFormerBusiness,
};
