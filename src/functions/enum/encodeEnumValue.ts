import { enumConfig } from '../../configs/enumConfig'
import { toString } from 'ramda'

export const encodeEnumValue = (value: string): string => {
  const { enumValueQuotes } = enumConfig.value

  return toString(value).replace(enumValueQuotes, `\\${enumValueQuotes}`)
}
