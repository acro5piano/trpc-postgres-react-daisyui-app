import { z } from 'zod'

const uuidValidate = z.string().uuid()

export function brandedUuid<T extends string>() {
  return z.custom<T>(
    (val) => uuidValidate.safeParse(val).success,
    'Invalid UUID',
  )
}
