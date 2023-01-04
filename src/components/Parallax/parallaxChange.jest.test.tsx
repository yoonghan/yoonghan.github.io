import {
  calculatePercentageChange,
  activeWindowIndex,
  updateElem,
} from "./parallaxChange"

describe("parallaxChange", () => {
  describe("calculatePercentageChange", () => {
    it("should return no change if pos=0", () => {
      expect(calculatePercentageChange(0, 100)).toBe(0)
    })

    it("should return 1/2 change if pos=50", () => {
      expect(calculatePercentageChange(50, 100)).toBe(0.5)
    })

    it("should return 1 change if pos=10", () => {
      expect(calculatePercentageChange(100, 100)).toBe(1)
    })

    it("should return max of 1 change if pos is over", () => {
      expect(calculatePercentageChange(110, 100)).toBe(1)
    })
  })

  describe("activeWindowIndex", () => {
    it("should 0 if pos < windowHeight", () => {
      expect(activeWindowIndex(0, 100)).toBe(0)
    })

    it("should 1 if pos > windowHeight", () => {
      expect(activeWindowIndex(101, 100)).toBe(1)
    })

    it("should return 2 if pos is twice of windowHeight", () => {
      expect(activeWindowIndex(201, 100)).toBe(2)
    })
  })

  describe("updateElem", () => {
    var elems: HTMLDivElement[]

    beforeEach(() => {
      elems = [
        document.createElement("div"),
        document.createElement("div"),
        document.createElement("div"),
      ]
    })

    it("should get opacity adjusted when current elem=0, and percentage = 0.9", () => {
      updateElem(elems, 0, 0.9)
      expect(elems[0].style.opacity).toBe("0.57")
      expect(elems[1].style.opacity).toBe("0.43")
      expect(elems[2].style.opacity).toBe("0")

      expect(elems[0].style.zIndex).toBe("6")
      expect(elems[1].style.zIndex).toBe("5")
      expect(elems[2].style.zIndex).toBe("")
    })

    it("should get opacity adjusted when current elem=1, and percentage = 0.9", () => {
      updateElem(elems, 1, 0.5)
      expect(elems[0].style.opacity).toBe("0")
      expect(elems[1].style.opacity).toBe("1")
      expect(elems[2].style.opacity).toBe("0")

      expect(elems[0].style.zIndex).toBe("")
      expect(elems[1].style.zIndex).toBe("10")
      expect(elems[2].style.zIndex).toBe("1")
    })

    it("should get opacity adjusted when current elem=2, and percentage = 0", () => {
      updateElem(elems, 2, 0)
      expect(elems[0].style.opacity).toBe("0")
      expect(elems[1].style.opacity).toBe("0")
      expect(elems[2].style.opacity).toBe("1")

      expect(elems[0].style.zIndex).toBe("")
      expect(elems[1].style.zIndex).toBe("")
      expect(elems[2].style.zIndex).toBe("10")
    })

    it("should be able to handle undefined", () => {
      expect(updateElem(undefined, 2, 0)).toBeUndefined()
    })
  })
})
