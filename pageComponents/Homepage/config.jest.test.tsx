/** Need to validate that the links are equivalent to number of sections */

import { generateSections, generatedLinks } from "./config"

describe("config", () => {
  it("should have the right format for the first link", () => {
    expect(generatedLinks.length).toBeGreaterThan(0)
    expect(generatedLinks[0]).toStrictEqual({
      id: "1",
      desc: "Test Driven Development",
      link: 1,
    })
  })

  it("should have same length as sections", () => {
    const sectionsLength = generateSections({}, null as any, null as any).length
    const linksLength = generatedLinks.length
    const sectionWithNavigatorOrLink = 1
    expect(linksLength).toBe(sectionsLength - sectionWithNavigatorOrLink)
  })
})
