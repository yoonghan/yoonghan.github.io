import * as React from "react"
import Image from "next/image"

export interface LogoProps {
  withText?: boolean
}

const Logo = ({ withText = false }: LogoProps) => {
  return (
    <React.Fragment>
      <Image
        className={"logo-img"}
        src="/img/logo/logo-color.svg"
        alt="walcron-logo"
        width={100}
        height={100}
      />
      {withText && <div> Walcron</div>}
      <style jsx>{`
        .logo-img {
          width: 50px;
          position: absolute;
          top: 10px;
          right: 10px;
        }

        @media only screen and (max-width: 480px) {
          .logo-img {
            width: 88px;
            transform: translateX(50%);
            right: 50%;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

export default Logo
