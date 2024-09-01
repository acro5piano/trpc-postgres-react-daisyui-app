import { z } from 'zod'

const uuidValidate = z.string().uuid()

export function customUuid<T>() {
  return z.custom<T>(
    (val) => uuidValidate.safeParse(val).success,
    'Invalid UUID',
  )
}
