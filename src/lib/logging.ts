/**
 * デバッグログ用関数
 */

/* eslint-disable no-console */

export const ConsoleLog = (...arg: any[]) => {
  if(process.env.NODE_ENV === 'development') {
    console.log(...arg)
  }
}

export const ConsoleError = (...arg: any[]) => {
  if(process.env.NODE_ENV === 'development') {
    console.error(...arg)
  }
}