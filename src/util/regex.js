function isOnlyAlphabetsAndNumberAndSpace(input) {
	const regex = /^[a-zA-Z0-9 ]*$/
	return input.match(regex)
}

function removeAllWhiteSpaces(input) {
	return input.replaceAll(/\s/g, "")
}

function capitalizeFirstWord(str) {
	return str.replace(/(?:^\w)/, (word) => word.toUpperCase())
}

export {
	capitalizeFirstWord,
	isOnlyAlphabetsAndNumberAndSpace,
	removeAllWhiteSpaces,
}