import "isomorphic-fetch"
import "@testing-library/jest-dom"
import { TextDecoder, TextEncoder } from "node:util"
import { defaultFallbackInView } from "react-intersection-observer"
import { vi } from "vitest"
import "react-intersection-observer/test-utils"
import React from "react"

global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder
global.IntersectionObserver = vi.fn()
defaultFallbackInView(false)

function addEscapeKeyListenerToDocument(elem: HTMLDialogElement) {
	document.body.addEventListener("keyup", (e) => {
		if (e.key === "Escape" || e.key === "esc") {
			elem.close()
		}
	})
}

// @ts-ignore
HTMLDialogElement.prototype.show = vi.fn(function mock(this: HTMLDialogElement) {
	this.open = true
	addEscapeKeyListenerToDocument(this)
})

// @ts-ignore
HTMLDialogElement.prototype.showModal = vi.fn(function mock(
	this: HTMLDialogElement,
) {
	this.open = true
	addEscapeKeyListenerToDocument(this)
})

// @ts-ignore
HTMLDialogElement.prototype.close = vi.fn(function mock(this: HTMLDialogElement) {
	this.open = false
	const evt = new Event("close", { bubbles: true, cancelable: false })
	this.dispatchEvent(evt)
})

// @ts-ignore
window.scrollTo = (_x: number, y: number) => {
	document.documentElement.scrollTop = y
	// @ts-ignore
	window.scrollY = y
}

vi.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		const { src, ...rest } = props
		const finalSrc = typeof src === "string" ? src : src.src
		return React.createElement("img", { ...rest, src: finalSrc })
	},
}))
