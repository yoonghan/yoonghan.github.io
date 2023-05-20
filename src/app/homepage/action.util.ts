"use client"

export const getTermsRead = () => {
  const localStorageTermsRead = localStorage.getItem("termsRead")
  if (!localStorageTermsRead) {
    localStorage.setItem("termsRead", "true")
  }
  return !!localStorageTermsRead
}
