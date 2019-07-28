`use strict`

import * as React from "react";
import Link from 'next/link';

export interface ButtonProps {
  href?: string;
}

const createButton = (children?:any) => {
  return (
    <a className="btn-container">
      {children}
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
          .btn-container {
            padding: 1rem;
            position: relative;
            background: rgba(200,200,200,0.1);
            transition-property: color, background;
            transition-duration: .15s;
            transition-timing-function: ease-in-out;
            color: #FFF;
            font-size: 1rem;
            text-align: center;
            border-radius: 0.5rem;
            font-weight: bold;
            cursor: pointer;
            border: 1px solid;
            margin: 0 1px 1px 0;
            user-select: none;
            box-shadow: 0 2px 2px 0 rgba(22,22,22,0.14), 0 1px 5px 0 rgba(22,22,22,0.12), 0 3px 1px -2px rgba(22,22,22,0.2)
          }
          .btn-container:hover {
            background: #FFF;
            color: #000;
          }
          .btn-container:active {
            margin: 1px 0 0 1px;
          }
        `}
      </style>
    </a>
  );
}

const Button: React.SFC<ButtonProps> = ({children, href}) => {
  return (
    href?
      <Link href={href}>{createButton(children)}</Link>:
      createButton(children)
  );
}

export default Button;
