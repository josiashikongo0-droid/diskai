import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const globalForDb = globalThis as unknown as { waitlistPool?: Pool }

export const pool = globalForDb.waitlistPool ?? new Pool({ connectionString: process.env.DATABASE_URL })

if (process.env.NODE_ENV !== 'production') globalForDb.waitlistPool = pool

export const db = drizzle(pool)
