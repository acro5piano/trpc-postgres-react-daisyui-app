import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('person')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('nickname', 'varchar', (col) => col.notNull().defaultTo(''))
    .addColumn('gender', 'varchar', (col) => col.notNull().defaultTo('OTHER'))
    .addColumn('createdAt', 'varchar', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('person').execute()
}
