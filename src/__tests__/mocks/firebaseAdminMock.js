import stream from "stream"

const fileReturnedMock = jest.fn()
const storeCollectionGet = jest.fn()

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

const createStream = () => {
  const streamData = new stream.Writable()
  streamData._write = function (chunk, encoding, done) {
    done()
  }
  return streamData
}

jest.mock("firebase-admin/auth", () => ({
  ...jest.mock("firebase-admin/auth"),
  getAuth: () => ({
    createUser: (credentialOptions) => ({ uid: credentialOptions.uid }),
  }),
}))

jest.mock("firebase-admin", () => ({
  ...jest.mock("firebase-admin"),
  apps: [], //to ensure only firebase is initialize once.
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),

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
}))

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

export { setMockFileReturn, setStoreCollectionGetReturn, sampleFirebaseConfig }
