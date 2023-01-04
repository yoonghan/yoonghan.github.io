const fileReturnedMock = jest.fn()

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
        createWriteStream: jest.fn(),
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
