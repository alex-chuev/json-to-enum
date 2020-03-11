import { CompileConfig } from '../../types/CompileConfig'
import { Arguments } from 'yargs'
import { existsSync } from 'fs'
import { EnumConfig } from '../../types/EnumConfig'
import { CompilerConfig } from '../../types/CompilerConfig'
import { resolve } from 'path'
import defaults from 'lodash/defaults'
import { FilenameCase } from '../../enums/FilenameCase'
import { EnumValue } from '../../enums/EnumValue'

export function mutateConfig(args: Arguments<CompileConfig>): CompileConfig {
  if (existsSync(args.config)) {
    try {
      const configFromFile: Partial<EnumConfig & CompilerConfig> = require(resolve(args.config))

      args = defaults(args, configFromFile, {
        watch: false,
        silent: false,
        enumFilenameCase: FilenameCase.Kebab,
        enumFilenameEnding: '.ts',
        enumValue: EnumValue.Default,
        enumTabs: false,
        enumSpaces: 2,
        enumExportDefault: true,
        enumValueQuotes: "'",
        jsonKeySeparator: '.',
        jsonFlattenArray: false,
      })
    } catch (e) {}
  }
}
