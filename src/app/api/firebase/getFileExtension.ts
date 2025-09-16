export const getFileExtension = (filename: string) => {
  const idxWithDotIncluded = filename.lastIndexOf(".")
  if (idxWithDotIncluded === -1 || filename.endsWith(".")) {
    return ""
  } else {
    return filename.substring(idxWithDotIncluded)
  }
}
