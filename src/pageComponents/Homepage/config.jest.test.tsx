/** Need to validate that the links are equivalent to number of sections */

import {
  generateSections,
  generatedLinks,
  siteDevelopmentSections,
  reverseDisplayForEvenSection,
} from "./config"

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

  it("should add reverse style for odd section", () => {
    expect(reverseDisplayForEvenSection(0, { reverse: "1" })).toBe("")
    expect(reverseDisplayForEvenSection(1, { reverse: "1" })).toBe("1")
    expect(reverseDisplayForEvenSection(2, { reverse: "1" })).toBe("")
  })

  it("should have right length for siteDevelopmentSections", () => {
    expect(siteDevelopmentSections).toHaveLength(8)
  })
})
