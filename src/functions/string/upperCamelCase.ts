import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { compose } from 'lodash/fp'

export const upperCamelCase: (name: string) => string = compose(upperFirst, camelCase)
