import { ReactNode, useMemo } from "react"
import Link from "next/link"
import { isExternalLink } from "./isExternalLink"
import styles from "./Button.module.css"

interface ButtonProps {
  href?: string
  target?: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  color?: "orange" | "white"
  styling?: {
    small: boolean
    inverted: boolean
  }
  children: ReactNode
}

const ClickableButton = ({
  onClick,
  children,
  definedClass,
}: {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  definedClass: string
}) => (
  <button className={definedClass} onClick={onClick}>
    {children}
  </button>
)

const LinkButton = ({
  href,
  target,
  children,
  definedClass,
}: {
  href: string
  target?: string
  children: ReactNode
  definedClass: string
}) => {
  if (isExternalLink(href)) {
    return (
      <a href={href} target={target || "_self"}>
        <button className={definedClass}>{children}</button>
      </a>
    )
  } else {
    return (
      <Link href={href}>
        <span className={definedClass}>{children}</span>
      </Link>
    )
  }
}

const Button = ({
  href,
  children,
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

  if (onClick) {
    return (
      <ClickableButton onClick={onClick} definedClass={definedClass}>
        {children}
      </ClickableButton>
    )
  } else if (href) {
    return (
      <LinkButton href={href} target={target} definedClass={definedClass}>
        {children}
      </LinkButton>
    )
  } else {
    return (
      <button type="submit" className={definedClass}>
        {children}
      </button>
    )
  }
}

export default Button
