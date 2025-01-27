"use client"

import { ReactNode } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SpinGear({
  children,
  title,
  className,
}: {
  children: ReactNode
  title: string
  className?: string
}) {
  const { isAnimatable } = useDisableAnimation()

  return (
    <div className={`${className || ""}`} title={title}>
      <FontAwesomeIcon icon={faCog} size={"2xl"} spin={!!isAnimatable} />
      {children}
      <div></div>
    </div>
  )
}

export default SpinGear
