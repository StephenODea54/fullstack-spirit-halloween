// Module Imports
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const cities = sqliteTable('cities', {
    internalId: integer('internal_id').primaryKey(),
    id: text('id').notNull().unique(),
    city: text('city').notNull().unique(),
});

export const states = sqliteTable('states', {
    internalId: integer('internal_id').primaryKey(),
    id: text('id').notNull().unique(),
    state: text('state').notNull().unique(),
});

export const zipCodes = sqliteTable('zip_codes', {
    internalId: integer('internal_id').primaryKey(),
    id: text('id').notNull().unique(),
    zip: integer('zip').notNull().unique(),
});

export const formerBusinesses = sqliteTable('former_businesses', {
    internalId: integer('internal_id').primaryKey(),
    id: text('id').notNull().unique(),
    formerBusiness: text('former_business').notNull().unique(),
});

export const locations = sqliteTable('location', {
    internalId: integer('internal_id').primaryKey(),
    id: text('id').notNull().unique(),
    address: text('city').notNull().unique(),
    cityId: integer('city_id')
        .notNull()
        .references(() => cities.internalId),
    stateId: integer('state_id')
        .notNull()
        .references(() => states.internalId),
    zipId: integer('zip_id')
        .notNull()
        .references(() => zipCodes.internalId),
    formerBusinessId: integer('former_business_id')
        .notNull()
        .references(() => formerBusinesses.internalId),
});
