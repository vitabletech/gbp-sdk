import { Logger } from '../types';

export class SilentLogger implements Logger {
  debug() {}
  info() {}
  warn() {}
  error() {}
}

export class ConsoleLogger implements Logger {
  debug(message: string, ...args: any[]) {
    console.debug(`[GBP SDK DEBUG] ${message}`, ...args);
  }
  info(message: string, ...args: any[]) {
    console.info(`[GBP SDK INFO] ${message}`, ...args);
  }
  warn(message: string, ...args: any[]) {
    console.warn(`[GBP SDK WARN] ${message}`, ...args);
  }
  error(message: string, ...args: any[]) {
    console.error(`[GBP SDK ERROR] ${message}`, ...args);
  }
}
