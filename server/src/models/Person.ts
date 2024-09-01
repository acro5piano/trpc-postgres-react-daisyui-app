import { z } from 'zod'
import { MakeId, MakeTable } from '../util/kysely-util'
import { brandedUuid } from '../util/zod-util'

export const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER'])
export type GenderEnumType = z.infer<typeof GenderEnum>

export type PersonId = MakeId<'Person'>

export const PersonSchema = z.object({
  id: brandedUuid<PersonId>(),
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
  gender: GenderEnum,
  createdAt: z.string().date(),
})
export type PersonType = z.infer<typeof PersonSchema>

export const PersonInputSchema = PersonSchema.pick({
  nickname: true,
  gender: true,
})
export type PersonInputType = z.infer<typeof PersonInputSchema>

export type PersonTable = MakeTable<PersonType>
