import { z } from 'zod'

export const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER'])
export type GenderEnumType = z.infer<typeof GenderEnum>

export const PersonInputSchema = z.object({
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
  gender: GenderEnum,
})
export type PersonInputType = z.infer<typeof PersonInputSchema>
