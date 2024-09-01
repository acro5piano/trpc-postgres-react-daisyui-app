import { Generated } from 'kysely'
import { z } from 'zod'

export const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER'])
export type GenderEnumType = z.infer<typeof GenderEnum>

type MakeTable<T extends object, RequiredKeys extends keyof T> = {
  [k in keyof Omit<T, RequiredKeys>]: Generated<T[k]>
} & {
  [k in keyof Pick<T, RequiredKeys>]: T[k]
}

//--------------- Person
export type PersonId = string & { __brand?: 'Person' }

export const PersonSchema = z.object({
  id: z.custom<PersonId>(),
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
  gender: GenderEnum,
  createdAt: z.string().date(),
})
export type PersonType = z.infer<typeof PersonSchema>

export type PersonTable = {
  [k in keyof PersonType]: Generated<PersonType[k]>
}

export const PersonInputSchema = PersonSchema.pick({
  nickname: true,
  gender: true,
})
export type PersonInputType = z.infer<typeof PersonInputSchema>

//--------------- Pet
export type PetId = string & { __brand?: 'Pet' }

export const PetSchema = z.object({
  id: z.custom<PetId>(),
  personId: z.custom<PersonId>(),
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
  createdAt: z.string().date(),
})
export type PetType = z.infer<typeof PetSchema>

export type PetTable = MakeTable<PetType, 'personId'>
