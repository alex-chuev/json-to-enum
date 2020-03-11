import { JsonConfig } from '../types/JsonConfig'
import { MutableConfig } from '../types/MutableConfig'

export const jsonConfig: MutableConfig<JsonConfig> = Object.freeze({
  value: {
    jsonKeySeparator: '.',
    jsonFlattenArray: false,
  },
})
