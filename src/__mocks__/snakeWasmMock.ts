import { readFileSync } from "fs"
import "./fetchMock"
import { fetchMock } from "./fetchMock"

// Read the .wasm file to memory
const file = readFileSync("./crate/pkg/snake_bg.wasm")
fetchMock.mockResolvedValue(file)
