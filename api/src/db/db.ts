// Module Imports
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('../api/database.db');
export const db = drizzle(sqlite);
