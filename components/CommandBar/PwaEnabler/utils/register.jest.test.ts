import { register, unregister } from "./register"
import { setServiceNavigator } from "../../../../__mocks__/windowMock"
import { waitFor } from "@testing-library/react"

/* 
Unfortunately these test is just to make sure it exist and can't be properly tested
Sample to override mock.
jest.spyOn(window.navigator.serviceWorker, "register").mockImplementation(
      (_swPath, _options) =>
        new Promise((resolve, _reject) => {
          mockJs()
          resolve("registered" as any)
        })
    )
*/
describe("register", () => {
  beforeAll(() => {
    setServiceNavigator()
  })

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  it("should be able to unregister", async () => {
    expect(await window.navigator.serviceWorker.getRegistration()).toBe(true)
    unregister()
    await waitFor(async () => {
      expect(await window.navigator.serviceWorker.getRegistration()).toBe(false)
    })
  })

  it("should be able to register", async () => {
    unregister()
    await waitFor(async () => {
      expect(await window.navigator.serviceWorker.getRegistration()).toBe(false)
    })
    register()
    await waitFor(async () => {
      expect(await window.navigator.serviceWorker.getRegistration()).toBe(true)
    })
  })

  it("should be able to reject registration", async () => {
    const warnFn = jest.fn()
    jest.spyOn(console, "warn").mockImplementation(warnFn)
    jest
      .spyOn(window.navigator.serviceWorker, "register")
      .mockRejectedValue("reject")
    register()
    await waitFor(() => {
      expect(warnFn).toHaveBeenCalledWith("SW registration failed: ", "reject")
    })
  })
})
