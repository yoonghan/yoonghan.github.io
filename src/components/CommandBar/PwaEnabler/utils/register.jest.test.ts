import { register, unregister } from "./register"
import { setServiceNavigator } from "@/__tests__/mocks/windowMock"
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
    const registered = register()
    expect(registered).toBeTruthy()
    expect(await window.navigator.serviceWorker.getRegistration()).toBe(true)
  })

  it("should be able to reject registration", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {})
    jest
      .spyOn(window.navigator.serviceWorker, "register")
      .mockRejectedValue("reject")
    const registered = await register()
    expect(registered).toBeFalsy()
    spy.mockClear()
  })
})
