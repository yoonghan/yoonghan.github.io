"use client"

import dynamic from "next/dynamic"
import * as React from "react"

const SocialFabNoSSRComponent = dynamic(() => import("./SocialFabNoSSR"), {
	ssr: false,
})

const SocialFab = () => {
	return <SocialFabNoSSRComponent />
}

export default React.memo(SocialFab)