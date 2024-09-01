import type { PersonId, GenderEnumType } from './models/Person'
import { db } from './db'

// To check strict typecheck is working!
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

  const pet = await db
    .selectFrom('pet')
    .selectAll()
    .where('personId', '=', person.id)
    .executeTakeFirst()
  if (pet) {
    await db
      .selectFrom('pet')
      .selectAll()
      // @ts-expect-error
      .where('personId', '=', pet.id)
      .executeTakeFirst()
    // @ts-expect-error
    updatePersonGenderService(pet.id, 'MALE')
    updatePersonGenderService(pet.personId, 'MALE')
  }

  person.gender

  // @ts-expect-error
  person.gender === '__INVALID__'
  // TODO
}
