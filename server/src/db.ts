import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { PersonTable } from './models/Person'
import { PetTable } from './models/Pet'

type Database = {
  person: PersonTable
  pet: PetTable
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
