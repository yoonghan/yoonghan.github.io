import menuItems from "./menuItems"

describe("menu items", () => {
  it("should contain list of menus", () => {
    expect(menuItems).toStrictEqual([
      { label: "About Us", url: "/about" },
      { label: "History", url: "/history" },
      {
        items: [
          { label: "Microfrontend", url: "/projects/microfrontend" },
          { label: "WebRtc", url: "/projects/webrtc" },
          { label: "Chat", url: "/projects/messenger" },
          { label: "Game", url: "/projects/game-snake" },
          { label: "Lessons", url: "/projects/lessons" },
          { label: "Learning", url: "/projects/learning" },
          { label: "Checklist", url: "/projects/checklist" },
          { label: "No Javascript", url: "/projects/javascript-free" },
        ],
        label: "Projects",
        url: "/projects",
      },
      {
        items: [
          { label: "Performance", url: "/experiments/performance" },
          {
            label: "Accessibility (WCAG)",
            url: "/experiments/aria",
          },
          { label: "Storybook", url: "/experiments/storybook" },
        ],
        label: "Experiments",
        url: "/experiments",
      },
    ])
  })
})
