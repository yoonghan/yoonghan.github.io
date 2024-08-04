global.window ??= Object.create(window)
const windowLocation = window.location
Object.defineProperty(window, "location", {
  value: { ...windowLocation, reload: () => {} },
})

afterEach(() => {
  jest.restoreAllMocks()
})

export const spyAsAndroid = () => {
  jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue("Android")
}

export const spyAsIPad = () => {
  jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue("iPad")
}

export const setServiceNavigator = () => {
  Object.defineProperty(window.navigator, "serviceWorker", {
    value: {
      getRegistration: () => Promise.resolve(true),
      ready: new Promise((registration) => {
        registration({
          unregister: () => {
            jest
              .spyOn(window.navigator.serviceWorker, "getRegistration")
              .mockResolvedValue(false)
          },
          addEventListener: (event, callback) => {
            switch (event) {
              case "updatefound":
              case "offline":
                return callback()
            }
          },
          installing: {
            state: "installed",
            addEventListener: (event, callback) => {
              switch (event) {
                case "statechange":
                  callback()
              }
            },
          },
        })
      }),
      register: (_swPath, _options) =>
        new Promise((resolve, _reject) => {
          jest
            .spyOn(window.navigator.serviceWorker, "getRegistration")
            .mockResolvedValue(true)
          resolve("registered")
        }),
    },
  })
}

export const spyOnReferrer = (location) => {
  jest.spyOn(document, "referrer", "get").mockReturnValue(location)
}

export const spyOnScrollTo = () => {
  const scrollToSpy = jest.fn()
  global.window.scrollTo = scrollToSpy
  return scrollToSpy
}

export const spyOnReload = () => {
  const reloadSpy = jest.fn()
  window.location.reload = reloadSpy
  return reloadSpy
}

export const setShareNavigator = () => {
  Object.defineProperty(window.navigator, "share", {
    value: () => {},
    writable: true,
  })
}

export const setVideo = () => {
  const oldMedia = window.navigator.mediaDevices
  Object.defineProperty(window.navigator, "mediaDevices", {
    value: {
      getUserMedia: () =>
        new Promise((resolve) => {
          resolve({ one: 1 })
        }),
    },
  })
  return () => {
    Object.defineProperty(window.navigator, "mediaDevices", { ...oldMedia })
  }
}
