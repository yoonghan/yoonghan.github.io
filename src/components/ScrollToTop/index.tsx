import dynamic from "next/dynamic"

const ScrollToTop = dynamic(() => import("./ScrollToTopNoSSR"), {
  ssr: false,
})

export default ScrollToTop
