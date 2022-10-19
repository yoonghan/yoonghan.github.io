import dynamic from "next/dynamic"

const ScrollToTop = dynamic(() => import("./ScrollToTopNoSSR"), {
  ssr: false,
  loading: () => <div className="header">Initializing...</div>,
})

export default ScrollToTop
