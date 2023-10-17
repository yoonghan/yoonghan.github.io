import { describe as describeMatcher } from "hamjest"
import {
  validEmail,
  emailMatcher,
  validInput,
  inputMatcher,
  lengthMatcher,
} from "./validator"

describe("user validator", () => {
  describe("validInput", () => {
    it("should pass when input is valid", () => {
      expect(validInput("ABC123")).toBe(true)
      expect(validInput("P@ssW0rd!@#$%^")).toBe(true)
    })

    it("should fail when trimmed input value is less than 6", () => {
      expect(validInput("")).toBe(false)
      expect(validInput("            ")).toBe(false)
      expect(validInput("12345")).toBe(false)
    })

    it("should fail when input characters are not accepted", () => {
      expect(validInput("~*")).toBe(false)
    })

    it("should fail when input is not undefined", () => {
      expect(validInput(undefined)).toBe(false)
    })

    it("should show valid description", () => {
      expect(describeMatcher(inputMatcher)).toBe(
        "(is not {} and a string matching /^[a-z|A-Z|0-9|!|\\$|@|?|#|%|\\^]+$/ and a collection or string with size a number greater than <5>)"
      )
    })
  })

  describe("validEmail", () => {
    it("should expect valid email", () => {
      expect(validEmail("ABC123")).toBe(false)
      expect(validEmail("test@email.com")).toBe(true)
    })

    it("should show valid description", () => {
      expect(describeMatcher(emailMatcher)).toBe(
        "a string matching /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/"
      )
    })
  })
})
