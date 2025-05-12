import { rnd } from "./random"

describe("random", () => {
  it("should contain within 0 to the max value", () => {
    const max = 2
    for (let loop = 0; loop < 10; loop++) {
      const randomNumber = rnd(max)
      expect(randomNumber).toBeLessThanOrEqual(max)
      expect(randomNumber).toBeGreaterThanOrEqual(0)
    }
  })
})
