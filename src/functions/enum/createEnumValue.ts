import { call, cond } from 'ramda'
import { enumConfig } from '../../configs/enumConfig'
import { EnumValue } from '../../enums/EnumValue'

export const createEnumValue = (entry: { value: string; key: string }): string | undefined => {
  const { enumValue } = enumConfig.value

  return cond([
    [() => enumValue === EnumValue.Key, entry => entry.key],
    [() => enumValue === EnumValue.Value, entry => entry.value],
  ])(entry)
}
