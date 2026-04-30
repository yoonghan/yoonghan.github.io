export const fetchMock = vi.fn()
fetchMock.mockResolvedValue({
	ok: true,
	status: 200,
	json: () => Promise.resolve({}),
	headers: {
		get: () => null,
	},
})

global.fetch = fetchMock