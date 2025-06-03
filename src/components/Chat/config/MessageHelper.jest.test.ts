import { isALink } from "./MessageHelper"

describe("MessageHelper", () => {
  describe("isALink", () => {
    it("should return TRUE if the message is a link", () => {
      expect(isALink("http://www.walcron.com")).toBeTruthy()
      expect(
        isALink("http://www.walcron.com/about%20us?param1=Hello%20x"),
      ).toBeTruthy()
    })

    it("should return FALSE if the message is a link", () => {
      expect(isALink("Bingo was his name")).toBeFalsy()
      expect(isALink("http://www.walcron.com/i am a space")).toBeFalsy()
    })
  })
})
