import "../../__mocks__/formidableMock"
import "../../__mocks__/uuidMock"
import "../../__mocks__/firebaseAdminMock"
import firebase, { config, getFileExtension } from "@/pages/api/firebase"
import { mockResponse } from "../../__mocks__/apiMock"
import { setEnv } from "../../__mocks__/setEnv"
import {
  setActionWithError,
  setParseMock,
} from "../../__mocks__/formidableMock"
import { setMockFileReturn } from "../../__mocks__/firebaseAdminMock"

describe("firebase", () => {
  it("should return error if request are not POST", async () => {
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    firebase(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(405)
    expect(jsonFn).toBeCalledWith({
      error: "Method null not recognized.",
    })
  })

  it("should get error without environment set", async () => {
    const setHeaderFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const { nextRequest, nextResponse } = mockResponse(
      setHeaderFn,
      statusFn,
      jsonFn
    )
    nextRequest.method = "POST"
    nextRequest.body = {}
    const resp = await firebase(nextRequest, nextResponse)
    expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
    expect(statusFn).toBeCalledWith(500)
    expect(jsonFn).toBeCalledWith({
      error: "One of the Firebase key was not initialized.",
    })
  })

  it("should use nodejs runtime and accept forms", () => {
    expect(config).toStrictEqual({
      runtime: "nodejs",
      api: {
        bodyParser: false,
      },
    })
  })

  describe("getFileExtension", () => {
    it("should get file extension correctly", () => {
      expect(getFileExtension("abc.txt")).toBe(".txt")
      expect(getFileExtension("abc.ext1.txt")).toBe(".txt")
      expect(getFileExtension("abc.ext1.jpg")).toBe(".jpg")
    })

    it("should return no extension if file has no file extension", () => {
      expect(getFileExtension("abc")).toBe("")
      expect(getFileExtension("abc/txt")).toBe("")
      expect(getFileExtension("abc.")).toBe("")
    })
  })

  describe("with firebase env", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    beforeEach(() => {
      setEnv({
        FIREBASE_BUCKET: "SampleBucket",
        FIREBASE_PROJECT_ID: "SampleProjectId",
        FIREBASE_PRIVATE_KEY_ID: "SamplePrivateKeyId",
        FIREBASE_PRIVATE_KEY: "SamplePrivateKey",
        FIREBASE_CLIENT_EMAIL: "SampleClientEmail",
        FIREBASE_CLIENT_ID: "SampleClientId",
        FIREBASE_CLIENT_X509_CERT_URL: "SampleClientX509Cert",
      })
    })

    it("should fail with form submitted is missing file", async () => {
      const setHeaderFn = jest.fn()
      const statusFn = jest.fn()
      const jsonFn = jest.fn()
      const { nextRequest, nextResponse } = mockResponse(
        setHeaderFn,
        statusFn,
        jsonFn
      )
      nextRequest.method = "POST"
      nextRequest.body = {}
      setParseMock(true)
      await firebase(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(500)
      expect(jsonFn).toBeCalledWith({
        error: "File provided has issues.",
      })
    })

    it("should fail on file upload error", async () => {
      const setHeaderFn = jest.fn()
      const statusFn = jest.fn()
      const jsonFn = jest.fn()
      const { nextRequest, nextResponse } = mockResponse(
        setHeaderFn,
        statusFn,
        jsonFn
      )
      nextRequest.method = "POST"
      nextRequest.body = {}
      setParseMock(false)
      setActionWithError(true)
      await firebase(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(500)
      expect(jsonFn).toBeCalledWith({
        error: "File stream failed. mocked error",
      })
    })

    it("should fail on getting file", async () => {
      const setHeaderFn = jest.fn()
      const statusFn = jest.fn()
      const jsonFn = jest.fn()
      const { nextRequest, nextResponse } = mockResponse(
        setHeaderFn,
        statusFn,
        jsonFn
      )
      nextRequest.method = "POST"
      nextRequest.body = {}
      setParseMock(false)
      setActionWithError(false)
      setMockFileReturn(true)
      await firebase(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(500)
      expect(jsonFn).toBeCalledWith({
        error:
          "File not downloadable. Cannot read properties of undefined (reading '0')",
      })
    })

    it("should be able to get the file successfully", async () => {
      const setHeaderFn = jest.fn()
      const statusFn = jest.fn()
      const jsonFn = jest.fn()
      const { nextRequest, nextResponse } = mockResponse(
        setHeaderFn,
        statusFn,
        jsonFn
      )
      nextRequest.method = "POST"
      nextRequest.body = {}
      setParseMock(false)
      setActionWithError(false)
      setMockFileReturn(false)
      await firebase(nextRequest, nextResponse)
      expect(setHeaderFn).toBeCalledWith("Content-Type", "application/json")
      expect(statusFn).toBeCalledWith(200)
      expect(jsonFn).toBeCalledWith({
        data: "https://firebasestorage.googleapis.com/v0/b/bucket1/o/name1?alt=media&token=randomThatLooksFixed",
        status: "ok",
      })
    })
  })
})
