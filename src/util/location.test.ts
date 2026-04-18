import { redirectTo, reload, search } from "./location";

describe("location", () => {
	let consoleSpy: jest.SpyInstance;

	beforeAll(() => {
		consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterAll(() => {
		consoleSpy.mockRestore();
	});

	it("should run basic location function existance which should not be mocked", () => {
		expect(search()).toBe("");

		expect(redirectTo("http://www.walcron.com")).toBeUndefined();

		expect(reload()).toBeUndefined();
	});
});
