jest.mock("@yoonghan/walcron-microfrontend-shared", () => {
  return {
    __esModule: true,
    reportWebVitals: (callback: any) => {
      callback({
        name: "CLS",
        delta: 1,
        id: "test",
        value: 2,
      })
    },
  }
})
