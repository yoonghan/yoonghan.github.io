class World {}

jest.mock("snake-game/snake", () => ({
  ...jest.mock("snake-game/snake"),
  World: new World(),
}))
