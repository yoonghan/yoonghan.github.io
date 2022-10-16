export const isSafariBrowser = () => {
  return (
    /constructor/i.test(window["HTMLElement" as any] as any) ||
    ((p): boolean => p?.toString() === "[object SafariRemoteNotification]")(
      !window["safari" as any] ||
        (window["safari" as any] as any).pushNotification
    )
  )
}

export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

export const isMacOrIOS = () => isSafariBrowser() || isIOS()
