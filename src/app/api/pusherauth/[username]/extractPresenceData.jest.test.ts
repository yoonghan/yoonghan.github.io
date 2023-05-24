import { extractPresenceData } from "./extractPresenceData"

describe("extractPresenceData", () => {
  describe("presence data", () => {
    it("should test user name capitalized", () => {
      const response = extractPresenceData("mary Jane  ")
      expect(response).toStrictEqual({
        user_id: "maryjane",
        user_info: { name: "Mary Jane" },
      })
    })

    it("should return null if data is not string and non alphanumeric", () => {
      expect(extractPresenceData("")).toBeNull()
      expect(extractPresenceData("   ")).toBeNull()
      expect(extractPresenceData(["han"])).toBeNull()
      expect(extractPresenceData(undefined)).toBeNull()
      expect(extractPresenceData("han-")).toBeNull()
    })
  })
})
