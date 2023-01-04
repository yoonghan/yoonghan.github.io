const onActionMock = jest.fn()
const parseMock = jest.fn()

export const setActionWithError = (toFail) => {
  if (toFail) {
    onActionMock.mockImplementation(function (action, callback) {
      switch (action) {
        case "error":
          callback({ message: "mocked error" })
          break
      }
      return this
    })
  } else {
    onActionMock.mockImplementation(function (action, callback) {
      switch (action) {
        case "error":
          break
        case "finish":
          callback()
          break
      }
      return this
    })
  }
}

export const setParseMock = (toFail) => {
  if (toFail) {
    parseMock.mockImplementation(function () {
      this.onPart({
        originalFileName: "mock.jpg",
        mimetype: "image/jpeg",
      })
    })
  } else {
    parseMock.mockImplementation(function () {
      this.onPart({
        originalFilename: "mock.jpg",
        mimetype: "image/jpeg",
        pipe: function () {
          return this
        },
        on: onActionMock,
      })
    })
  }
}

const FakeFormidable = (props) => {
  return {
    onPart: jest.fn(),
    parse: parseMock,
  }
}

jest.mock("formidable", () => {
  return FakeFormidable
})
