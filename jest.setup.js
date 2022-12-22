// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
import { defaultFallbackInView } from "react-intersection-observer"

global.IntersectionObserver = jest.fn()
defaultFallbackInView(false)

HTMLDialogElement.prototype.show = jest.fn(function mock() {
  this.open = true
})

HTMLDialogElement.prototype.showModal = jest.fn(function mock() {
  this.open = true
})

HTMLDialogElement.prototype.close = jest.fn(function mock() {
  this.open = false
})
