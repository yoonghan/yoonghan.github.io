const { NextRequestMock, NextResponseMock } = vi.hoisted(() => {
	const { IncomingMessage } = require("node:http")
	const { Socket } = require("node:net")

	class NextRequestMock extends IncomingMessage {
		public cookies: Partial<{
			[key: string]: string
		}> = {}
		public body: any
		public url: any
		public nextUrl: URL

		constructor(url: URL | string, options?: RequestInit) {
			super(new Socket())

			if (options) {
				this.method = options.method
				this.body = options.body
			}
			this.url = url
			this.nextUrl = new URL(url.toString())
		}

		public formData = () => {
			if (this.body instanceof FormData) {
				return new Promise((resolve) => resolve(this.body))
			}
			return undefined
		}

		public json = async () => {
			if (this.body instanceof String || typeof this.body === "string") {
				return new Promise((resolve) =>
					resolve(JSON.parse(this.body as string)),
				)
			}
			return undefined
		}
	}

	class NextResponseMock extends Response {
		public body: any

		send(_body: string) { }

		setHeader(_name: string, _value: string | number | readonly string[]) { }

		static readonly json = (body: any, init?: ResponseInit) => {
			return new NextResponseMock(JSON.stringify(body), init)
		}
	}

	return { NextRequestMock, NextResponseMock }
})

vi.mock("next/server", async (importActual) => {
	const actual = await importActual<any>()
	return {
		...actual,
		NextRequest: NextRequestMock,
		NextResponse: NextResponseMock,
	}
})

vi.mock("next/dist/server/web/spec-extension/request", async (importActual) => {
	const actual = await importActual<any>()
	return {
		...actual,
		NextRequest: NextRequestMock,
	}
})

vi.mock("next/dist/server/web/spec-extension/response", async (importActual) => {
	const actual = await importActual<any>()
	return {
		...actual,
		NextResponse: NextResponseMock,
	}
})