module.exports = async (page, scenario, viewport) => {
  const haveCustomHeaders = scenario.haveCustomHeaders ?? true

  if (haveCustomHeaders) {
    if (viewport.width > 480) await page.waitForSelector("text=walcron@tm$")
  }
}
