/**
 * Storage helpers.
 *
 * Every write goes through the async `wx.setStorage` API. The synchronous
 * variants block the render thread, which is visible as input lag on the
 * publish page where a draft is saved on each keystroke.
 */

/** Read and parse a JSON value. Resolves to null when missing or corrupt. */
export function readStorage<T>(key: string): Promise<T | null> {
  return new Promise<T | null>(resolve => {
    wx.getStorage({
      key,
      success: res => {
        try {
          resolve(res.data as T)
        } catch {
          resolve(null)
        }
      },
      fail: () => resolve(null)
    })
  })
}

/** Serialise and write a value. Failures are swallowed — storage is a cache. */
export function writeStorage(key: string, value: unknown): Promise<void> {
  return new Promise<void>(resolve => {
    wx.setStorage({
      key,
      data: value,
      success: () => resolve(),
      fail: () => resolve()
    })
  })
}

export function removeStorage(key: string): Promise<void> {
  return new Promise<void>(resolve => {
    wx.removeStorage({
      key,
      success: () => resolve(),
      fail: () => resolve()
    })
  })
}

/**
 * Trailing-edge debounce that also exposes `flush` so a pending write can be
 * forced out before the page unloads.
 */
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number
): { (...args: A): void; flush: () => void } {
  let timer: number | null = null
  let lastArgs: A | null = null

  const invoke = (): void => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    if (lastArgs) {
      const args = lastArgs
      lastArgs = null
      fn(...args)
    }
  }

  const debounced = (...args: A): void => {
    lastArgs = args
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(invoke, wait) as unknown as number
  }

  debounced.flush = invoke

  return debounced
}
