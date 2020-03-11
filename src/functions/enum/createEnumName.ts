import { enumConfig } from '../../configs/enumConfig'
import { FilePath } from '../../types'
import { parse, ParsedPath } from 'path'
import { upperCamelCase } from '../string/upperCamelCase'
import { pipe } from 'ramda'

const createName = (path: ParsedPath): string => {
  const { enumNameCallback } = enumConfig.value

  return enumNameCallback ? enumNameCallback(path) : upperCamelCase(path.name)
}

export const createEnumName: (file: FilePath) => string = pipe(parse, createName)
