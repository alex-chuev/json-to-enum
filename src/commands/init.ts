import { Command } from '../enums/Command'
import { Arguments, Options } from 'yargs'
import { writeFileSync } from 'fs'
import { FilenameCase } from '../enums/FilenameCase'
import { EnumValue } from '../enums/EnumValue'

export interface Args {
  path: string
}

export const command: string = Command.Init
export const describe: string = 'Creates default configuration file'

export const builder: { [key: string]: Options } = {
  path: {
    alias: 'p',
    demandOption: true,
    default: 'json-to-enum.js',
  },
}

export function handler(args: Arguments<Args>): void {
  const content = `const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');

module.exports = {
  input: 'src/**/*.json',
  outputFolderCallback: path => path.dir,
  outputFolder: '.', // will be ignored because outputFolderCallback is specified
  enumNameCallback: path => upperFirst(camelCase(path.base)),
  enumFilenameCase: '${FilenameCase.Kebab}',
  enumFilenameEnding: '.ts',
  enumValue: '${EnumValue.Path}',
  enumValueQuotes: "'",
  enumTabs: false,
  enumSpaces: 2,
  enumExportDefault: true,
  jsonKeySeparator: '.',
};
`

  writeFileSync(args.path, content, 'utf-8')
}
