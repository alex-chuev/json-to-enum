import { ParsedPath } from 'path'
import { EnumValue } from '../enums/EnumValue'
import { FilenameCase } from '../enums/FilenameCase'

export interface EnumConfig {
  enumNameCallback: (parsedPath: ParsedPath) => string
  enumFilenameCase: FilenameCase
  enumFilenameEnding: string
  enumValue: EnumValue
  enumTabs: boolean
  enumSpaces: number
  enumExportDefault: boolean
  enumValueQuotes: string
  jsonKeySeparator: string
}
