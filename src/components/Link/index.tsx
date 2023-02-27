import Image from "next/image"
import React from "react"
import style from "./Link.module.css"

type RequiresBothLogo =
  | {
      text: string
      href?: string
      logoUrl?: never
      logoAltText?: never
    }
  | {
      text: string
      href?: string
      logoUrl: string
      logoAltText: string
    }

const Link = ({ text, href, logoUrl, logoAltText }: RequiresBothLogo) => {
  const logo = (() => {
    if (logoUrl && logoAltText) {
      return <Image src={logoUrl} alt={logoAltText} width={15} height={15} />
    }
    return null
  })()

  return (
    <span className={style.link}>
      <LinkWrapper href={href}>
        {logo && logo}
        {logo && " "}
        {text}
      </LinkWrapper>
    </span>
  )
}

const LinkWrapper = ({
  href,
  children,
}: {
  children: React.ReactNode
  href?: string
}) => {
  if (!href) {
    return <span>{children}</span>
  } else {
    return <a href={href}>{children}</a>
  }
}

export default Link
