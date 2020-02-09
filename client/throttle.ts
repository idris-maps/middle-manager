type OnTimeout = (value: number) => void

export default (time: number = 500, onTimeout: OnTimeout) => {
  let prev = 0
  let f: OnTimeout = onTimeout
  let timeout
  return {
    onChange: (value: number) => {
      console.log('change',value)
      if (value !== prev) {
        prev = value
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => f(Math.round(value)), time)
      }
    }
  }
}
