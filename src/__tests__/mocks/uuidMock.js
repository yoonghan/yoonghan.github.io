vi.mock("uuid", () => ({
	v4: () => "randomThatLooksFixed",
}))