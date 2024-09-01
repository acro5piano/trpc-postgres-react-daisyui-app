import type { PersonId } from './__generated__/kanel/public/Person'
import type { GenderEnumType } from './models'
import { db } from './db'

export async function updatePersonGenderService(
  personId: PersonId,
  newGender: GenderEnumType,
) {
  const person = await db
    .selectFrom('person')
    .selectAll()
    .where('id', '=', personId)
    .executeTakeFirstOrThrow()
  if (person.gender === newGender) {
    throw new Error('Gender is not changed!')
  }

  // @ts-expect-error
  person.gender === '__INVALID__'
  // TODO
}
