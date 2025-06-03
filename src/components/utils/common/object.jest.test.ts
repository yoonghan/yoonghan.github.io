import { hasEmptyValueInObject } from "./object"

describe("objectUtil", () => {
  it("should check if object has any empty value", () => {
    expect(
      hasEmptyValueInObject({ key1: "hello", key2: "", key3: "world" }),
    ).toBeTruthy()
    expect(hasEmptyValueInObject({ key1: null, key2: "world" })).toBeTruthy()
    expect(
      hasEmptyValueInObject({ key1: undefined, key2: "world" }),
    ).toBeTruthy()

    expect(hasEmptyValueInObject({ key1: "hello", key2: "world" })).toBeFalsy()
    expect(hasEmptyValueInObject({})).toBeFalsy()
  })
})
