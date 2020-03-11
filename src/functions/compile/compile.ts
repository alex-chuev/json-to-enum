import { join, parse } from 'path'
import { writeFileSync } from 'fs'
import { createEnumFile } from '../../entities/EnumBuilder'
import { log } from '../utils/log'
import { LogType } from '../../enums/LogType'
import { compilerConfig } from '../../configs/compilerConfig'
import { pipe, tap } from 'ramda'
import { EnumFile } from '../../types/EnumFile'
import { FilePath } from '../../types'
import { readFile } from '../file/readFile'
import { parseJson } from '../json/parseJson'
import { flattenJson } from '../json/flattenJson'
import { saveEnumFile } from '../file/saveEnumFile'

export const compile: (path: FilePath) => void = pipe(
  tap((file: FilePath) => log(`File ${file} is being processed`)),
  readFile,
  parseJson,
  flattenJson,
  createEnumFile,
  tap(saveEnumFile),
  tap((file: EnumFile) => log(`File ${file.path} has been updated`, LogType.Success))
)
