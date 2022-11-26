global.window = Object.create(window)
Object.defineProperty(window, "location", {
  value: {
    href: "",
  },
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

export const setShareNavigator = () => {
  Object.defineProperty(window.navigator, "share", {
    value: () => {},
    writable: true,
  })
}
