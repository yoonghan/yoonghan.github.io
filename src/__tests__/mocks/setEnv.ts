const defaultProcessEnv = { ...process.env }

export const setEnv = (environments: { [key: string]: string | undefined }) => {
	Object.keys(environments).forEach((key: string) => {
		if (environments[key] === undefined) {
			delete process.env[key]
		} else {
			process.env[key] = environments[key]
		}
	})
}

afterEach(() => {
	process.env = defaultProcessEnv
})