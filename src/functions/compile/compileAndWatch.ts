import { compilerConfig } from '../../configs/compilerConfig'
import { watch, WatchOptions } from 'chokidar'
import { compile } from './compile'

export function compileAndWatch() {
  const { input } = compilerConfig.value

  if (input) {
    // Even is the watching is disabled, chokidar will call the compile function for all
    // matched files because all of them will be initially added into its internal cache
    watch(input, createWatchOptions(compilerConfig.value))
      .on('add', compile)
      .on('change', compile)
  }
}

function createWatchOptions(): WatchOptions {
  return {
    persistent: compilerConfig.value.watch,
  }
}
