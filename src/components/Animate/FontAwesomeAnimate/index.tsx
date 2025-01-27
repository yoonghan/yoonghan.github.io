"use client"

import { ReactNode } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

function FontAwesomeAnimate({
  children,
  title,
  className,
  faIcon,
}: {
  children: ReactNode
  title: string
  className?: string
  faIcon: IconDefinition
}) {
  const { isAnimatable } = useDisableAnimation()

  return (
    <div className={`${className || ""}`} title={title}>
      <FontAwesomeIcon icon={faIcon} size={"2xl"} bounce={!!isAnimatable} />
      {children}
      <div></div>
    </div>
  )
}

export default FontAwesomeAnimate
