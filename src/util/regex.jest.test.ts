import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
  capitalizeFirstWord,
} from "./regex"

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

  describe("capitalizeFirstWord", () => {
    it("should capitalize first word", () => {
      expect(capitalizeFirstWord("ABC123")).toBe("ABC123")
      expect(capitalizeFirstWord("abc123")).toBe("Abc123")
      expect(capitalizeFirstWord("johnny depp")).toBe("Johnny depp")
    })
  })
})
