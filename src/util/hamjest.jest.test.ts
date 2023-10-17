import {
  is,
  greaterThan,
  Description,
  describe as describeMatcher,
} from "hamjest"

describe("Test hamjest", () => {
  it("should describe as text", () => {
    var describe = new Description()
    var matcher = is(greaterThan(10))
    matcher.describeTo(describe)
    expect(describe.get()).toBe("is a number greater than <10>")
    expect(describeMatcher(matcher)).toBe("is a number greater than <10>")
  })
})
