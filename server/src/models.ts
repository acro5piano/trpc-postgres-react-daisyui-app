import { z } from 'zod'

export const PersonSchema = z.object({
  nickname: z.string().min(0),
})
