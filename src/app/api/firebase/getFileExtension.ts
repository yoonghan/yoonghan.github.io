export const getFileExtension = (filename: string) => {
  const idxWithDotIncluded = filename.lastIndexOf(".")
  if (idxWithDotIncluded === -1 || idxWithDotIncluded === filename.length - 1) {
    return ""
  } else {
    return filename.substring(idxWithDotIncluded)
  }
}
