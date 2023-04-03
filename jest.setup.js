// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
import { defaultFallbackInView } from "react-intersection-observer"
import { TextDecoder, TextEncoder } from "util"

global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder
global.IntersectionObserver = jest.fn()
defaultFallbackInView(false)

function addEscapeKeyListenerToDocument(elem) {
  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Escape" || e.key === "esc") {
      elem.close()
    }
  })
}

HTMLDialogElement.prototype.show = jest.fn(function mock() {
  this.open = true
  addEscapeKeyListenerToDocument(this)
})

HTMLDialogElement.prototype.showModal = jest.fn(function mock() {
  this.open = true
  addEscapeKeyListenerToDocument(this)
})

HTMLDialogElement.prototype.close = jest.fn(function mock() {
  this.open = false
  const evt = new Event("close", { bubbles: true, cancelable: false })
  this.dispatchEvent(evt)
})
