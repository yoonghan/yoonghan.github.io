import { isEmptyString } from "./string"

describe("string util", () => {
  it("should return true is string are empty", () => {
    expect(isEmptyString(undefined)).toBeTruthy()
    expect(isEmptyString(null)).toBeTruthy()
    expect(isEmptyString("")).toBeTruthy()
    expect(isEmptyString("   ")).toBeTruthy()
    expect(isEmptyString("a")).toBeFalsy()
  })
})
