;`use strict`

/**
  A bar with multiple buttons
  **/

import * as React from "react"
import Link from "next/link"

export interface ILink {
  title: string
  link: string
}

export interface ButtonsBarProps {
  menuTexts: Array<ILink>
  activeIndex?: number
}

const ButtonsBar = ({ menuTexts, activeIndex }: ButtonsBarProps) => {
  const width = 100 / menuTexts.length

  function _generateMenu(iLink: ILink, idx: number) {
    const link = iLink.link
    const title = iLink.title
    const _activeIdx = activeIndex || 0
    const className = "btnsbar-item" + (_activeIdx === idx ? " is-active" : "")
    return (
      <li className={`${className}`} key={`btns-bar_${idx}`}>
        <Link href={link}>
          <a>{title}</a>
        </Link>
      </li>
    )
  }

  if (menuTexts.length !== 3) {
    // eslint-disable-next-line no-console
    console.warn(
      "Due to Next JSX issue, CSS cannot correctly render :nth-child() and ~."
    )
    // eslint-disable-next-line no-console
    console.error("Provide only 3 and only 3 menuItems.")
  }

  return (
    <React.Fragment>
      <ul className="btnsbar with-indicator">{menuTexts.map(_generateMenu)}</ul>
      <style jsx global>
        {`
          .btnsbar {
            list-style: none;
            margin: 10px auto;
            max-width: 720px;
            padding: 0;
            width: 100%;
          }
          .btnsbar-item {
            color: #86a3eb;
            background: rgba(255, 255, 255, 0.1);
            display: block;
            float: left;
            margin: 0;
            padding: 0;
            width: ${width}%;
            text-align: center;
            user-select: none;
            cursor: pointer;
          }
          .btnsbar-item:first-child {
            border-radius: 3px 0 0 3px;
          }
          .btnsbar-item:last-child {
            border-radius: 0 3px 3px 0;
          }
          .btnsbar-item.is-active a {
            color: #86a3eb !important;
            font-weight: bold;
          }
          .btnsbar-item a {
            color: #fff;
            display: block;
            padding-top: 10px;
            padding-bottom: 10px;
            text-decoration: none;
            cursor: pointer;
          }
          .btnsbar-item a:hover {
            color: #000;
          }
          .with-indicator {
            position: relative;
            z-index: 0;
          }
          .with-indicator .btnsbar-item:last-child:after {
            content: "";
            display: block;
            position: absolute;
            pointer-events: none;
            transition: left 1s ease;
            border-radius: 3px;
          }
          .with-indicator .btnsbar-item:last-child:after {
            background: #fff;
            top: 0px;
            bottom: 0;
            left: 0;
            width: ${width}%;
            z-index: -1;
          }

          :global(.btnsbar-item:nth-child(1).is-active
              ~ .btnsbar-item:last-child:after) {
            left: 0%;
          }

          :global(.btnsbar-item:nth-child(1):hover
              ~ .btnsbar-item:last-child:after) {
            left: 0% !important;
          }

          :global(.btnsbar-item:nth-child(2).is-active
              ~ .btnsbar-item:last-child:after) {
            left: 33.333333333333336%;
          }

          :global(.btnsbar-item:nth-child(2):hover
              ~ .btnsbar-item:last-child:after) {
            left: 33.333333333333336% !important;
          }

          :global(.with-indicator
              .btnsbar-item:last-child:hover:after, .with-indicator
              .btnsbar-item:last-child.is-active:after) {
            left: 66.66666666666666% !important;
          }

          :global(.with-indicator
              .btnsbar-item:last-child:hover:after, .with-indicator
              .btnsbar-item:last-child.is-active:after) {
            left: ${100 - width}% !important;
          }

          .btnsbar:before,
          .btnsbar:after {
            content: " ";
            display: table;
          }

          .btnsbar:after {
            clear: both;
          }
        `}
      </style>
    </React.Fragment>
  )
}

export default ButtonsBar
