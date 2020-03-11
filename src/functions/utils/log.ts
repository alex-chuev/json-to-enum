import chalk, { Chalk } from 'chalk'
import { logConfig } from '../../configs/logConfig'
import { LogType } from '../../enums/LogType'

function getColor(type: LogType): Chalk {
  return {
    [LogType.Default]: chalk.black,
    [LogType.Success]: chalk.green,
    [LogType.Warning]: chalk.yellow,
  }[type]
}

export function log(message: string, type: LogType = LogType.Default): void {
  const { silent } = logConfig.value

  if (silent) {
    return
  }

  const time = new Date().toLocaleTimeString()

  console.log(getColor(type)(`[${time}] ${message}`))
}
