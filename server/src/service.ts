import type { PersonId, GenderEnumType, PetId } from './models'
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

  person.gender

  // @ts-expect-error
  person.gender === '__INVALID__'
  // TODO
}

declare const a: PetId
// @ts-expect-error
updatePersonGenderService(a, 'MALE')
