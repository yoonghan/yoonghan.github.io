import { useMemo } from "react"
import Link from "next/link"
import { isExternalLink } from "./isExternalLink"
import { useSpring, animated } from "react-spring"
import styles from "./Button.module.css"

interface ButtonProps {
  href?: string
  target?: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  color?: string
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

const Button = ({ href, text, onClick, target, styling }: ButtonProps) => {
  const definedClass = useMemo(() => {
    let style = styles.container
    if (styling?.small) {
      style += " " + styles.small
    }
    if (styling?.inverted) {
      style += " " + styles.invert
    }
    return style
  }, [styling])

  const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 1000 } })

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
        opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
        transform: x
          .to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          })
          .to((x) => `scale(${x})`),
      }}
    >
      {renderButton()}
    </animated.div>
  )
}

export default Button
