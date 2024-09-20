function isOnlyAlphabetsAndNumberAndSpace(input: string) {
  const regex = /^[a-zA-Z0-9 ]*$/
  return input.match(regex)
}

function removeAllWhiteSpaces(input: string) {
  return input.replace(/\s/g, "")
}

function capitalizeFirstWord(str: string) {
  return str.replace(/(?:^\w)/, function (word) {
    return word.toUpperCase()
  })
}

export {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
  capitalizeFirstWord,
}
