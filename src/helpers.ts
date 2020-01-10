import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export function upperCamelCase(value: string): string {
  return upperFirst(camelCase(value))
}
