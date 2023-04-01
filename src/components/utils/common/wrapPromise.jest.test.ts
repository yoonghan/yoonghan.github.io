import wrapPromise from "./wrapPromise"

describe("wrapPromise", () => {
  it("should intentionally throw promise on first read", () => {
    const promise = Promise.resolve(() => {})
    const wrapper = wrapPromise(promise)
    try {
      wrapper.read()
    } catch (goodError) {
      expect(goodError).toStrictEqual(promise)
    }
  })

  it("should return success on next read", async () => {
    const goodMessage = "I succeeded"
    const promise = Promise.resolve(goodMessage)
    const wrapper = wrapPromise(promise)
    try {
      wrapper.read()
    } catch (goodError) {
      await goodError
      expect(wrapper.read()).toBe(goodMessage)
    }
  })

  it("should throw reject after next read", async () => {
    const errorMessage = "I fail"
    const promise = Promise.reject(errorMessage)
    const wrapper = wrapPromise(promise)
    try {
      wrapper.read()
    } catch (goodError) {
      await goodError
      try {
        wrapper.read()
      } catch (badError) {
        expect(badError).toStrictEqual(errorMessage)
      }
    }
  })
})
