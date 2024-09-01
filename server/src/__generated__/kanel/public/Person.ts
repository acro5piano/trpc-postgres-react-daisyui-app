import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.person */
export type PersonId = string & { __brand?: 'PersonId' };

/** Represents the table public.person */
export default interface PersonTable {
  id: ColumnType<PersonId, PersonId | undefined, PersonId>;

  nickname: ColumnType<string, string | undefined, string>;

  gender: ColumnType<string, string | undefined, string>;

  createdAt: ColumnType<string, string | undefined, string>;
}

export type Person = Selectable<PersonTable>;

export type NewPerson = Insertable<PersonTable>;

export type PersonUpdate = Updateable<PersonTable>;