module.exports = async (
	_page,
	scenario,
	_viewport,
	_isReference,
	browserContext,
) => {
	await require("./loadCookies")(browserContext, scenario);
};
