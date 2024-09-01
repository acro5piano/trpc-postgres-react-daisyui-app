import 'dotenv/config'

import { ColumnType, Kysely, PostgresDialect } from 'kysely'
import type Database from './__generated__/kanel/Database'
import { Pool } from 'pg'
import { GenderEnumType } from './models'

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})

declare module './__generated__/kanel/public/Person.ts' {
  export default interface PersonTable {
    hoge: string
    gender: ColumnType<
      GenderEnumType,
      GenderEnumType | undefined,
      GenderEnumType
    >
  }
}
