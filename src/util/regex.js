function isOnlyAlphabetsAndNumberAndSpace(input) {
  const regex = /^[a-zA-Z0-9 ]*$/
  return input.match(regex)
}

function removeAllWhiteSpaces(input) {
  return input.replace(/\s/g, "")
}

module.exports = { isOnlyAlphabetsAndNumberAndSpace, removeAllWhiteSpaces }
