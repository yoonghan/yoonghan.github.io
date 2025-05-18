export function calculatePercentageChange(
  currentPos: number,
  windowHeight: number
) {
  const reachPointPercentage = currentPos / windowHeight

  const adjustedReachPointPercentage =
    reachPointPercentage > 1 ? 1 : reachPointPercentage

  const roundedReachPointPercentage =
    Math.round((adjustedReachPointPercentage + Number.EPSILON) * 10) / 10

  return roundedReachPointPercentage
}

export function activeWindowIndex(currentPos: number, windowHeight: number) {
  return Math.floor(currentPos / windowHeight)
}

export function updateElem(
  elems: HTMLDivElement[] | undefined,
  activeWindowIndex: number,
  percentageChanged: number
) {
  if (!elems) {
    return
  }

  elems.forEach((elem, index) => {
    const octalChange = Math.pow(percentageChanged, 8)
    if (index === activeWindowIndex) {
      const increase = 1 - octalChange
      elem.style.opacity = `${increase.toFixed(2)}`
      elem.style.zIndex = `${Math.ceil(increase * 10)}`
    } else if (index === activeWindowIndex + 1) {
      elem.style.opacity = `${octalChange.toFixed(2)}`
      elem.style.zIndex = `${Math.ceil(octalChange * 10)}`
    } else {
      // the magic that makes skipped value worked!
      elem.style.opacity = "0"
      elem.style.zIndex = ""
    }
  })
}
