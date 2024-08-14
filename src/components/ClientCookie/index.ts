"use client"

import dynamic from "next/dynamic"

const ScrollToTop = dynamic(() => import("./ClientCookieNoSSR"), {
  ssr: false,
})

export default ScrollToTop
