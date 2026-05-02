afterEach(() => {
	vi.restoreAllMocks()
})

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