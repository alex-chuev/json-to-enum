import flatten from 'flat'
import { JsonObject } from '../../types'
import { FlatJson } from '../../types/FlatJson'
import { jsonConfig } from '../../configs/jsonConfig'

export const flattenJson = (object: JsonObject): FlatJson => {
  const { jsonKeySeparator: delimiter, jsonFlattenArray: unsafe } = jsonConfig.value

  return flatten(object, { delimiter, safe: !unsafe })
}
