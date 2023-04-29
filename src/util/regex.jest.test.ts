import { isOnlyAlphabetsAndNumberAndSpace, removeAllWhiteSpaces } from "./regex"

describe("regex", () => {
  describe("isOnlyAlphabetsAndNumberAndSpace", () => {
    it("should contain a-z and number", () => {
      expect(isOnlyAlphabetsAndNumberAndSpace("hi")).toBeTruthy()
      expect(isOnlyAlphabetsAndNumberAndSpace("01")).toBeTruthy()
      expect(
        isOnlyAlphabetsAndNumberAndSpace("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
      ).toBeTruthy()
      expect(isOnlyAlphabetsAndNumberAndSpace("hi 01    02")).toBeTruthy()

      expect(isOnlyAlphabetsAndNumberAndSpace("")).toBeTruthy()

      expect(isOnlyAlphabetsAndNumberAndSpace("hi@01")).toBeFalsy()
      expect(isOnlyAlphabetsAndNumberAndSpace("-- 01 --")).toBeFalsy()
    })
  })

  describe("removeAllWhiteSpaces", () => {
    it("should remove all white spaces", () => {
      expect(removeAllWhiteSpaces("ABC123")).toBe("ABC123")
      expect(removeAllWhiteSpaces("    ABC   123 ")).toBe("ABC123")
    })
  })
})
