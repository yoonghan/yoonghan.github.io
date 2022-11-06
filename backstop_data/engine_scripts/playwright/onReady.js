module.exports = async (
  page,
  scenario,
  viewport,
  isReference,
  browserContext
) => {
  // eslint-disable-next-line no-console
  console.log("SCENARIO > " + scenario.label)
  await require("./customWalcron")(page, scenario, viewport)
  await require("./clickAndHoverHelper")(page, scenario, viewport)

  // add more ready handlers here...
}
