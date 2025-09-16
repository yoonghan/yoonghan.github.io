import { toError } from "./errorHandler"

describe("toError", () => {
  it("should return the same error if it is already an Error object", () => {
    const error = new Error("test error")
    expect(toError(error)).toBe(error)
  })

  it("should convert a string to an Error object", () => {
    const errorMessage = "test error message"
    const error = toError(errorMessage)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(errorMessage)
  })

  it("should convert an object to an Error object with stringified message", () => {
    const errorObject = { a: 1, b: "test" }
    const error = toError(errorObject)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(JSON.stringify(errorObject))
  })

  it("should handle null by converting it to a string", () => {
    const error = toError(null)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe("null")
  })

  it("should handle undefined by converting it to a string", () => {
    const error = toError(undefined)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe("undefined")
  })

  it("should handle a number by converting it to a string", () => {
    const error = toError(123)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe("123")
  })
})
