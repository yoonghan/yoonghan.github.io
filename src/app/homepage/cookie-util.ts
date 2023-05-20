"use client"

export const getTermsRead = () => {
  if (typeof window !== "undefined") {
    const localStorageTermsRead = localStorage.getItem("termsRead")
    if (!localStorageTermsRead) {
      localStorage.setItem("termsRead", "true")
    }
    return !!localStorageTermsRead
  }

  //ignore this line, jest can't change window to undefined.
  /* istanbul ignore next */
  return false
}
