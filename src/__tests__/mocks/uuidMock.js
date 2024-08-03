const uuid = {
  v4: () => "randomThatLooksFixed",
}

jest.mock("uuid", () => uuid)
