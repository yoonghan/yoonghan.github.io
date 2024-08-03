import stream from "stream"
const fileReturnedMock = jest.fn()

export const sampleFirebaseConfig = {
  FIREBASE_BUCKET: "SampleBucket",
  FIREBASE_PROJECT_ID: "SampleProjectId",
  FIREBASE_PRIVATE_KEY_ID: "SamplePrivateKeyId",
  FIREBASE_PRIVATE_KEY: "SamplePrivateKey",
  FIREBASE_CLIENT_EMAIL: "SampleClientEmail",
  FIREBASE_CLIENT_ID: "SampleClientId",
  FIREBASE_CLIENT_X509_CERT_URL: "SampleClientX509Cert",
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
  firestore: jest.fn(),
  storage: () => ({
    bucket: () => ({
      file: () => ({
        createWriteStream: createStream,
        get: fileReturnedMock,
      }),
    }),
  }),
}))

export const setMockFileReturn = (toFail) => {
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
