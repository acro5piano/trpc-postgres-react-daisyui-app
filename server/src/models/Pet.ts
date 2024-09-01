import { z } from 'zod'
import { MakeId, MakeTableWithRequiredKeys } from '../util/kysely-util'
import { PersonId } from './Person'
import { brandedUuid } from '../util/zod-util'

export const PetKindEnum = z.enum(['DOG', 'CAT'])
export type PetKindEnumType = z.infer<typeof PetKindEnum>

export type PetId = MakeId<'Pet'>

export const PetSchema = z.object({
  id: brandedUuid<PetId>(),
  personId: brandedUuid<PersonId>(),
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
  kind: PetKindEnum,
  createdAt: z.string().date(),
})
export type PetType = z.infer<typeof PetSchema>

export type PetTable = MakeTableWithRequiredKeys<PetType, 'kind'>
