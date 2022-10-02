module.exports = async (page, scenario) => {
  await page.locate(scenario.selector).fill(scenario.input)
}
