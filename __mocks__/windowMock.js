global.window = Object.create(window)
Object.defineProperty(window, "location", {
  value: {
    href: "",
  },
})
