import { z } from 'zod'
import { MakeId, MakeTableWithRequiredKeys } from '../util/kysely-util'
import { PersonId } from './Person'

export const PetKindEnum = z.enum(['DOG', 'CAT'])
export type PetKindEnumType = z.infer<typeof PetKindEnum>

export type PetId = MakeId<'Pet'>

export const PersonSchema = z.object({
  id: z.custom<PetId>(),
  personId: z.custom<PersonId>(),
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
  kind: PetKindEnum,
  createdAt: z.string().date(),
})
export type PetType = z.infer<typeof PersonSchema>

export type PetTable = MakeTableWithRequiredKeys<PetType, 'kind'>
