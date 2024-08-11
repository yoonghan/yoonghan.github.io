import Image from "next/image"
import React from "react"
import style from "./Link.module.css"
import NextLink from "next/link"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  logoUrl?: string
  logoAltText?: string
}

const Link: React.FC<LinkProps> = ({
  href,
  logoUrl,
  logoAltText,
  children,
  ...props
}) => {
  const logo = (() => {
    if (logoUrl && logoAltText) {
      return <Image src={logoUrl} alt={logoAltText} width={15} height={15} />
    }
    return null
  })()

  return (
    <span className={style.link}>
      <LinkWrapper href={href} {...props}>
        {logo && logo}
        {logo && " "}
        {children}
      </LinkWrapper>
    </span>
  )
}

const LinkWrapper: React.FC<Omit<LinkProps, "text">> = ({
  href,
  children,
  ...props
}) => {
  if (!href) {
    return <span>{children}</span>
  } else {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }
}

export default Link
