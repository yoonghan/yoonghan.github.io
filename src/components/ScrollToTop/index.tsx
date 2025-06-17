import dynamic from "next/dynamic"

/** Unique to nodeJS, this informs the whole code is client side and will load after codes have been accessed. */

const ScrollToTop = dynamic(() => import("./ScrollToTopNoSSR"))

export default ScrollToTop
