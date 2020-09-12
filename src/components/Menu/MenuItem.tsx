`use strict`

import * as React from "react";
import {fontFamily} from "../../shared/style";
import {BLACK, WHITE, GREY, DARKGREY} from "../../shared/style";

interface MenuItemProps {
  whiteOnBlack?: boolean;
  menuTriggerSize: number;
  childNumber: number;
  totalChild: number;
}

export const MenuItem: React.SFC<MenuItemProps> = ({menuTriggerSize, whiteOnBlack, childNumber, totalChild, ...props}) => {
  return (
    <React.Fragment>
      <li>
        {props.children}
      </li>
      <style jsx>{`
        li :global(a) {
          color: ${whiteOnBlack ?  WHITE: BLACK};
          font-family: ${fontFamily.standard};
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: -0.02em;
          word-wrap: break-word;
          user-select: none;
          z-index: 1000;
        }

        li :global(a):hover {
          color: ${whiteOnBlack ?  GREY: DARKGREY};
        }

        @media screen and (max-width: ${menuTriggerSize}px) {
          :global(.show) > li {
            transition-delay: ${0.04 * (childNumber + 1)}s;
            z-index: ${totalChild - (childNumber + 1)}
          }

          li {
            opacity: 0;
            transform: translate(0, -10px) scale(1.07);
            will-change: transform, opacity;
            transition: opacity 0.25s,transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1),scale 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          :global(.show) > li {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }

          li :global(a) {
            display: block;
            padding: 1rem 2rem;
            position: relative;
            color: ${WHITE};
            font-size: 1rem;
            text-transform: none;
            background: ${BLACK};
            margin-bottom: -1px;
            transition: color 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955);
          }

          li :global(a):hover {
            color: ${GREY};
          }
        }
        `}</style>
    </React.Fragment>
  );
}
