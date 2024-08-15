"use client"

import * as React from "react"
import dynamic from "next/dynamic"

const SocialFabNoSSRComponent = dynamic(() => import("./SocialFabNoSSR"), {
  ssr: false,
})

const SocialFab = () => {
  return <SocialFabNoSSRComponent />
}

export default React.memo(SocialFab)
