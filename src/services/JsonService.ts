import forEach from 'lodash/forEach'
import isPlainObject from 'lodash/isPlainObject'
import { JsonData } from '../interfaces/JsonData'

export class JsonService {
  static createJsonData(data: object): JsonData {
    const mutableEnumData: JsonData = []

    this.iterateOverObject(data, mutableEnumData)

    return mutableEnumData
  }

  private static iterateOverObject(data: any, mutableEnumData: JsonData, parentKeys: string[] = []): void {
    forEach(data, (value: any, key: string) => {
      const keys = parentKeys.concat(key)

      if (isPlainObject(value)) {
        return this.iterateOverObject(value, mutableEnumData, keys)
      } else {
        mutableEnumData.push({ keys, value })
      }
    })
  }
}
