import "@/__tests__/mocks/apiMockNext13"
import "@/__tests__/mocks/uuidMock"
import "@/__tests__/mocks/firebaseAdminMock"
import { setEnv } from "@/__tests__/mocks/setEnv"
import {
  sampleFirebaseConfig,
  setMockFileReturn,
} from "@/__tests__/mocks/firebaseAdminMock"
import { POST } from "@/app/api/firebase/route"
import { NextRequest } from "next/server"
import { Blob } from "node:buffer"

describe("firebase", () => {
  const mockRequest = (form = new FormData()) => {
    return new NextRequest("http://walcron.com", {
      method: "POST",
      body: form,
    })
  }

  it("should get error without environment set", async () => {
    const response = await POST(mockRequest())
    expect(response.status).toBe(405)
    expect(await response.json()).toStrictEqual({
      error: "One of the Firebase key was not initialized.",
    })
  })

  describe("with firebase env", () => {
    const createFormDataWithFile = () => {
      const textFileBlob = new Blob(["I am a blob in a file"], {
        type: "text/plain",
      })
      const formData = new FormData()
      // formData.append("file", textFileBlob as any)
      jest.spyOn(formData, "get").mockReturnValue(textFileBlob as any)
      return formData
    }

    afterEach(() => {
      jest.clearAllMocks()
    })

    beforeEach(() => {
      setEnv(sampleFirebaseConfig)
    })

    it("should fail with form submitted is missing file", async () => {
      const response = await POST(mockRequest())
      expect(response.status).toBe(405)
      expect(await response.json()).toStrictEqual({
        error: "No file to process",
      })
    })

    it("should fail when file uploaded is not readable", async () => {
      const formData = new FormData()
      formData.append("file", "not a blob")
      const response = await POST(mockRequest(formData))
      expect(response.status).toBe(405)
      expect(await response.json()).toStrictEqual({
        error: "File uploaded is not a valid",
      })
    })

    it("should fail if file can be uploaded but have issues", async () => {
      setMockFileReturn(true)
      const response = await POST(mockRequest(createFormDataWithFile()))
      expect(response.status).toBe(405)
      expect((await response.json()).error).toContain("File not downloadable.")
    })

    it("should return a downloadable file from google cloud", async () => {
      setMockFileReturn(false)
      const response = await POST(mockRequest(createFormDataWithFile()))
      expect(response.status).toBe(200)
      expect(await response.json()).toStrictEqual({
        data: "https://firebasestorage.googleapis.com/v0/b/bucket1/o/name1?alt=media&token=randomThatLooksFixed",
        status: "ok",
      })
    })
  })
})
