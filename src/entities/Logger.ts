import chalk, { Chalk } from 'chalk'

export class Logger {
  static log(message: string, color: Chalk = chalk.black) {
    const time = new Date().toLocaleTimeString()

    console.log(color(`[${time}] ${message}`))
  }
}
