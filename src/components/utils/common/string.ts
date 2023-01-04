export const isEmptyString = (value?: string | null) => {
  return !value || value.trim() === ""
}
