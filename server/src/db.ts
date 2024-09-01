import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { eq, sql } from 'drizzle-orm'

export const sqlite = new Database('./local.db')
export const db = drizzle(sqlite)

export const person = sqliteTable('person', {
  id: text('id')
    .primaryKey()
    .default(sql`(lower(hex(randomblob(8))))`),
  nickname: text('nickname').notNull().default(''),
})

export const child = sqliteTable('child', {
  id: text('id')
    .primaryKey()
    .default(sql`(lower(hex(randomblob(8))))`),
  nickname: text('nickname').notNull().default(''),
})

db.select()
  .from(person)
  .execute()
  .then(async (p) => {
    const c = await db
      .select()
      .from(child)
      .where(eq(child.id, 'hogehoge'))
      .execute()
    const person = p[0]
    const cc = c[0]
    // @ts-expect-error
    person.id === cc.id
  })

// export async function migrateUp() {
//   await db.schema
//     .createTable('person')
//     .ifNotExists()
//     .addColumn('id', 'uuid', (col) =>
//       col.notNull().defaultTo(sql`(lower(hex(randomblob(8))))`),
//     )
//     .addColumn('nickname', 'varchar', (col) => col.notNull().defaultTo(''))
//     .addColumn('gender', 'varchar', (col) => col.notNull().defaultTo('OTHER'))
//     .addColumn('createdAt', 'varchar', (col) =>
//       col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
//     )
//     .execute()
// }
