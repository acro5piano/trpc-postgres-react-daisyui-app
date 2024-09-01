import { z } from 'zod'

export const PersonInputSchema = z.object({
  nickname: z.string().min(3, 'Nickname length should be 3 or more.'),
})
export type PersonInputType = z.infer<typeof PersonInputSchema>
