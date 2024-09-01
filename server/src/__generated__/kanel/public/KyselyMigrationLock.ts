import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.kysely_migration_lock */
export type KyselyMigrationLockId = string & { __brand?: 'KyselyMigrationLockId' };

/** Represents the table public.kysely_migration_lock */
export default interface KyselyMigrationLockTable {
  id: ColumnType<KyselyMigrationLockId, KyselyMigrationLockId, KyselyMigrationLockId>;

  isLocked: ColumnType<number, number | undefined, number>;
}

export type KyselyMigrationLock = Selectable<KyselyMigrationLockTable>;

export type NewKyselyMigrationLock = Insertable<KyselyMigrationLockTable>;

export type KyselyMigrationLockUpdate = Updateable<KyselyMigrationLockTable>;