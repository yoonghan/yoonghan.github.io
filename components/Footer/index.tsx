import * as React from "react"

interface Props {
  isRelative?: boolean
}

const Footer = ({ isRelative }: Props) => {
  return (
    <footer style={isRelative ? { position: "relative" } : {}}>
      Walcron 2014-2022 &copy;
    </footer>
  )
}

export default Footer
