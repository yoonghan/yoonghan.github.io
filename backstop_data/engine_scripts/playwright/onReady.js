module.exports = async (page, scenario, viewport) => {
	await require("./customWalcron")(page, scenario, viewport);
	await require("./clickAndHoverHelper")(page, scenario, viewport);

	// add more ready handlers here...
};
