import { enumConfig } from '../../configs/enumConfig'

export const createEnumIndent = (): string => {
  const { enumTabs, enumSpaces } = enumConfig.value

  return enumTabs ? '\t' : ' '.repeat(enumSpaces)
}
