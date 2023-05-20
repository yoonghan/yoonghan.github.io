"use client"

export const KEY = "termsRead"

export const getTermsRead = () => {
  const localStorageTermsRead = localStorage.getItem(KEY)
  if (!localStorageTermsRead) {
    localStorage.setItem(KEY, "true")
  }
  return !!localStorageTermsRead
}
