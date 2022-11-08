import { useMemo } from "react"
import Link from "next/link"
import { isExternalLink } from "./isExternalLink"
import { useSpring, animated } from "react-spring"
import styles from "./Button.module.css"

interface ButtonProps {
  href?: string
  target?: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  color?: "orange" | "white"
  text: string
  styling?: {
    small: boolean
    inverted: boolean
  }
}

const ClickableButton = ({
  onClick,
  text,
  definedClass,
}: {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
  text: string
  definedClass: string
}) => (
  <button className={definedClass} onClick={onClick}>
    {text}
  </button>
)

const LinkButton = ({
  href,
  target,
  text,
  definedClass,
}: {
  href: string
  target?: string
  text: string
  definedClass: string
}) => {
  if (isExternalLink(href)) {
    return (
      <a href={href} target={target || "_self"} className={definedClass}>
        {text}
      </a>
    )
  } else {
    return (
      <Link href={href}>
        <span className={definedClass}>{text}</span>
      </Link>
    )
  }
}

const Button = ({
  href,
  text,
  color,
  onClick,
  target,
  styling,
}: ButtonProps) => {
  const definedClass = useMemo(() => {
    let style = styles.container
    if (styling?.small) {
      style += " " + styles.small
    }
    if (styling?.inverted) {
      style += " " + styles.invert
    }
    if (color) {
      style += " " + styles[color]
    }
    return style
  }, [styling, color])

  const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 300 } })

  const renderButton = () => {
    if (onClick) {
      return (
        <ClickableButton
          onClick={onClick}
          text={text}
          definedClass={definedClass}
        />
      )
    }

    if (href) {
      return (
        <LinkButton
          href={href}
          target={target}
          text={text}
          definedClass={definedClass}
        />
      )
    }

    return (
      <button type="submit" className={definedClass}>
        {text}
      </button>
    )
  }

  return (
    <animated.div
      style={{
        display: "inline-flex",
      }}
    >
      {renderButton()}
    </animated.div>
  )
}

export default Button
