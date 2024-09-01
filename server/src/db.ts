import { Kysely, PostgresDialect } from 'kysely'
import type Database from './__generated__/kanel/Database'
import { Pool } from 'pg'

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
