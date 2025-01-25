jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return new URLSearchParams("")
  },
}))
