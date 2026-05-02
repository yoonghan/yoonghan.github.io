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

vi.mock("pusher-js", () => {
	class MockChannel {
		callbacks: Record<string, Function[]> = {}
		bind = vi.fn((event: string, cb: Function) => {
			this.callbacks[event] = this.callbacks[event] || []
			this.callbacks[event].push(cb)
		})
		unbind = vi.fn((event: string) => {
			delete this.callbacks[event]
		})
		emit = vi.fn((event: string, data?: any) => {
			this.callbacks[event]?.forEach((cb) => cb(data))
		})
		trigger = vi.fn((_event: string, _data: any) => {
			return false
		})
	}

	class MockConnection {
		callbacks: Record<string, Function[]> = {}
		bind = vi.fn((event: string, cb: Function) => {
			this.callbacks[event] = this.callbacks[event] || []
			this.callbacks[event].push(cb)
		})
		emit = vi.fn((event: string, data?: any) => {
			this.callbacks[event]?.forEach((cb) => cb(data))
		})
	}

	class MockPusher {
		connection = new MockConnection()
		channels: Record<string, MockChannel> = {}
		subscribe = vi.fn((name: string) => {
			this.channels[name] = this.channels[name] || new MockChannel()
			return this.channels[name]
		})
		unsubscribe = vi.fn((name: string) => {
			delete this.channels[name]
		})
		disconnect = vi.fn(() => {
			this.connection.emit("disconnected")
		})
	}

	return {
		default: MockPusher,
	}
})
