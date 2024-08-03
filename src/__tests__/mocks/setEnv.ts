const defaultProcessEnv = { ...process.env }

export const setEnv = (environments: { [key: string]: string }) => {
  Object.keys(environments).forEach((key: string) => {
    process.env[key] = environments[key]
  })
}

afterEach(() => {
  process.env = defaultProcessEnv
})
