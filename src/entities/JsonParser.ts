import forEach from 'lodash/forEach'
import isPlainObject from 'lodash/isPlainObject'
import { JsonItem } from '../interfaces/JsonItem'
import { readFileSync } from 'fs'
import json5 from 'json5'

export class JsonParser {
  items: JsonItem[] = []

  constructor(private filepath: string) {
    this.collectItemsRecursively(this.getDataFromFile())
  }

  private getDataFromFile(): any {
    try {
      const content = readFileSync(this.filepath, 'utf-8')
      return json5.parse(content)
    } catch (e) {
      return null
    }
  }

  private collectItemsRecursively(data: any, parentKeys: string[] = []): void {
    forEach(data, (value: any, key: string) => {
      const keys = parentKeys.concat(key)

      if (isPlainObject(value)) {
        this.collectItemsRecursively(value, keys)
      } else {
        this.addItem({ keys, value })
      }
    })
  }

  private addItem(item: JsonItem): void {
    this.items.push(item)
  }
}
