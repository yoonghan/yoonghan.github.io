const { fileReturnedMock, storeCollectionGet, createStream } = vi.hoisted(() => {
	const stream = require("node:stream")
	const fileReturnedMock = vi.fn()
	const storeCollectionGet = vi.fn()
	const createStream = () => {
		const streamData = new stream.Writable()
		streamData._write = (_chunk, _encoding, done) => {
			done()
		}
		return streamData
	}
	return { fileReturnedMock, storeCollectionGet, createStream }
})

const sampleFirebaseConfig = {
	FIREBASE_BUCKET: "SampleBucket",
	FIREBASE_PROJECT_ID: "SampleProjectId",
	FIREBASE_PRIVATE_KEY_ID: "SamplePrivateKeyId",
	FIREBASE_PRIVATE_KEY: "SamplePrivateKey",
	FIREBASE_CLIENT_EMAIL: "SampleClientEmail",
	FIREBASE_CLIENT_ID: "SampleClientId",
	FIREBASE_CLIENT_X509_CERT_URL: "SampleClientX509Cert",
	FIREBASE_DATABASE_URL: "SampleDatabaseUrl",
}

vi.mock("firebase-admin/auth", () => ({
	getAuth: () => ({
		createUser: (credentialOptions) => ({ uid: credentialOptions.uid }),
	}),
}))

vi.mock("firebase-admin", () => {
	const adminMock = {
		apps: [], //to ensure only firebase is initialize once.
		credential: {
			cert: vi.fn(),
		},
		initializeApp: vi.fn(),

		storage: () => ({
			bucket: () => ({
				file: () => ({
					createWriteStream: createStream,
					get: fileReturnedMock,
				}),
			}),
		}),
		firestore: () => ({
			collection: () => ({
				doc: () => ({
					set: () => {},
					get: storeCollectionGet,
				}),
				get: () => ({
					docs: [
						{
							id: 1,
							data: () => ({
								source: "Cron",
								method: "GET",
								createdAt: "2024-12-01T01:01:01.293Z",
							}),
						},
					],
				}),
			}),
		}),
	}
	return {
		...adminMock,
		default: adminMock,
	}
})

const setStoreCollectionGetReturn = (toFail) => {
	if (toFail) {
		storeCollectionGet.mockImplementation(() => ({
			id: 3,
			data: () => undefined,
		}))
	} else
		storeCollectionGet.mockImplementationOnce(() => ({
			id: 2,
			data: () => ({
				source: "Cron",
				method: "GET",
				createdAt: "2024-09-01T01:01:01.293Z",
			}),
		}))
}

const setMockFileReturn = (toFail) => {
	if (toFail) {
		fileReturnedMock.mockImplementation(() => undefined)
	} else {
		fileReturnedMock.mockImplementation(() => [
			{
				metadata: {
					bucket: "bucket1",
					name: "name1",
				},
			},
		])
	}
}

export { sampleFirebaseConfig, setMockFileReturn, setStoreCollectionGetReturn }