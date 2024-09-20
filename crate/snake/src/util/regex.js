function isOnlyAlphabetsAndNumberAndSpace(input) {
  const regex = /^[a-zA-Z0-9 ]*$/
  return input.match(regex)
}

function removeAllWhiteSpaces(input) {
  return input.replace(/\s/g, "")
}

function capitalizeFirstWord(str) {
  return str.replace(/(?:^\w)/, function (word) {
    return word.toUpperCase()
  })
}

export {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
  capitalizeFirstWord,
}
