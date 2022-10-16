global.window = Object.create(window)
Object.defineProperty(window, "location", {
  value: {
    href: "",
  },
})

afterEach(() => {
  jest.restoreAllMocks()
})

export const spyAsIPad = () => {
  jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue("iPad")
}

export const setServiceNavigator = () => {
  Object.defineProperty(window.navigator, "serviceWorker", {
    value: {
      getRegistration: () => Promise.resolve(true),
    },
  })
}

export const spyOnReferrer = (location) => {
  jest.spyOn(document, "referrer", "get").mockReturnValue(location)
}

export const setShareNavigator = () => {
  Object.defineProperty(window.navigator, "share", {
    value: () => {},
    writable: true,
  })
}
