import { getFileExtension } from "./getFileExtension"

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
