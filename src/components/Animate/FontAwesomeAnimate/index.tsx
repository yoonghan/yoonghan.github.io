"use client"

import { ReactNode } from "react"
import { useDisableAnimation } from "../../utils/hooks/disableAnimation/useDisableAnimation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export type SupportedAnimation = "bounce" | "shake" | "spin"

function canAnimate(
  isAnimatable: boolean,
  animationType: SupportedAnimation,
  expectedAnimationType: SupportedAnimation
) {
  return !!isAnimatable && animationType === expectedAnimationType
}

function FontAwesomeAnimate({
  children,
  title,
  className,
  faIcon,
  animate,
  color,
}: Readonly<{
  children: ReactNode
  title: string
  className?: string
  faIcon: IconDefinition
  animate: SupportedAnimation
  color?: string
}>) {
  const { isAnimatable } = useDisableAnimation()

  return (
    <div className={`${className ?? ""}`} title={title}>
      <FontAwesomeIcon
        icon={faIcon}
        size={"2xl"}
        bounce={canAnimate(isAnimatable, animate, "bounce")}
        shake={canAnimate(isAnimatable, animate, "shake")}
        spin={canAnimate(isAnimatable, animate, "spin")}
        color={color}
      />
      {children}
      <div></div>
    </div>
  )
}

export default FontAwesomeAnimate
