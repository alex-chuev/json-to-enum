import { MutableConfig } from '../types/MutableConfig'
import { LogConfig } from '../types/LogConfig'

export const logConfig: MutableConfig<LogConfig> = Object.freeze({
  value: {
    silent: false,
  },
})
