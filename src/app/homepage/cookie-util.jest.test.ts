import "../../__mocks__/localStorageMock"
import { getTermsRead } from "./cookie-util"

describe("Cookie Util", () => {
  it("should update localstorage when accessed", () => {
    expect(localStorage.getItem("termsRead")).toBeUndefined
    expect(getTermsRead()).toBeFalsy()
    expect(localStorage.getItem("termsRead")).toBeTruthy()
    expect(getTermsRead()).toBeTruthy()
  })

})
