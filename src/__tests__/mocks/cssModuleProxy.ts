const proxy = new Proxy({}, {
	get: (_target, key) => key,
})

export default proxy
