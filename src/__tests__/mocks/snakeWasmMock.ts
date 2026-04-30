import { readFileSync } from "node:fs"
import "./fetchMock"
import { fetchMock } from "./fetchMock"

// Read the .wasm file to memory
const file = readFileSync("./crate/snake/pkg/snake_bg.wasm")
const arrayBuffer = file.buffer.slice(
	file.byteOffset,
	file.byteOffset + file.byteLength,
)
fetchMock.mockResolvedValue(
	new Response(arrayBuffer, {
		status: 200,
		headers: { "Content-Type": "application/wasm" },
	}),
)

export const mockRandom = vi.fn()
mockRandom.mockReturnValue(1)

vi.mock("@/util/random", () => {
	return {
		__esModule: true,
		rnd: mockRandom,
	}
})