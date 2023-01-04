import { isExternalLink } from "./isExternalLink"

describe("isExternalLink", () => {
  it("should return true for valid http", () => {
    expect(isExternalLink("http://www.walcron.com")).toBeTruthy()
    expect(isExternalLink("https://www.walcron.com")).toBeTruthy()
    expect(isExternalLink("//www.walcron.com")).toBeTruthy()
  })

  it("should return false non recognized url", () => {
    expect(isExternalLink("myownpage")).toBeFalsy()
    expect(isExternalLink("/page2")).toBeFalsy()
  })
})
