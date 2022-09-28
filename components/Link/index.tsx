import { renderToHTML } from "next/dist/server/render"
import Image from "next/image"
import React from "react"

interface Props {
  text: string
  href?: string
  logoUrl: string
  logoAltText: string
}

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
      return (
        <Image
          src={logoUrl}
          alt={logoAltText}
          width={15}
          height={15}
          role={"link-icon"}
        />
      )
    }
    return null
  })()

  return (
    <span className={"link"}>
      <LinkWrapper href={href}>
        {logo && logo}
        {logo && " "}
        {text}
      </LinkWrapper>
      <style jsx global>
        {`
          .link > a, .link > span, .link > a:hover {
              color: var(--link, #00f);
              text-decoration: none;
            }
          }
        `}
      </style>
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
