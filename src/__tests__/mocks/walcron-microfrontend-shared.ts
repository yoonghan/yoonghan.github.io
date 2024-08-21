jest.mock("@yoonghan/walcron-microfrontend-shared", () => {
  return {
    __esModule: true,
    reportWebVitals: (callback: any) => {
      callback({
        name: "CLP",
        delta: 1,
        id: "test",
      })
    },
  }
})
