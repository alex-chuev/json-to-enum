import { EnumConfig } from './EnumConfig'
import { CompilerConfig } from './CompilerConfig'
import { JsonConfig } from '../helpers/createFlatJson'

export type CompileConfig = EnumConfig &
  CompilerConfig &
  JsonConfig & {
    watch: boolean
    silent: boolean
    config: string
  }
