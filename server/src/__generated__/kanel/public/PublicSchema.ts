import type { default as KyselyMigrationTable } from './KyselyMigration';
import type { default as KyselyMigrationLockTable } from './KyselyMigrationLock';
import type { default as PersonTable } from './Person';

export default interface PublicSchema {
  kyselyMigration: KyselyMigrationTable;

  kyselyMigrationLock: KyselyMigrationLockTable;

  person: PersonTable;
}