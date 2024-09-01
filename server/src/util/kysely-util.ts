import { Generated } from 'kysely'

export type MakeTable<T extends object> = {
  [k in keyof T]: Generated<T[k]>
}

export type MakeTableWithRequiredKeys<
  T extends object,
  RequiredKeys extends keyof T,
> = {
  [k in keyof Omit<T, RequiredKeys>]: Generated<T[k]>
} & {
  [k in keyof Pick<T, RequiredKeys>]: T[k]
}

export type MakeId<Brand extends string> = string & { __brand?: Brand }
