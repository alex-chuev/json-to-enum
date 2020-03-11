import { EnumConfig } from '../types/EnumConfig'
import { ParsedPath } from 'path'
import { FilenameCase } from '../enums/FilenameCase'
import { EnumValue } from '../enums/EnumValue'
import { MutableConfig } from '../types/MutableConfig'

function enumNameCallback(path: ParsedPath) {
  return path.name
}
enumNameCallback.toString = () => 'path => path.name'

export const enumConfig: MutableConfig<EnumConfig> = Object.freeze({
  value: {
    enumNameCallback,
    enumFilenameCase: FilenameCase.Kebab,
    enumFilenameEnding: '.ts',
    enumValue: EnumValue.Default,
    enumTabs: false,
    enumSpaces: 2,
    enumExportDefault: true,
    enumValueQuotes: "'",
    jsonKeySeparator: '.',
    jsonFlattenArray: false,
  },
})
