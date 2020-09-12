`use strict`

import * as React from "react";
import {useSpring, animated} from 'react-spring';

interface IScrollIcon {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const ScrollIcon: React.SFC<IScrollIcon> = ({scrollContainer}) => {
  const [props, set] = useSpring(()=>({opacity: 1}));

  const _controlIconDisplay = () => {
    if(scrollContainer.current !== null) {
      scrollContainer.current.addEventListener('scroll', _controlIconDisplay);
    }
    set({opacity: 0});
  }

  React.useEffect(() => {
    if(scrollContainer.current !== null) {
      scrollContainer.current.addEventListener('scroll', _controlIconDisplay);
    }
  }, []);

  return (
    <animated.div
      style={props}
      >
      <div className="icon-scroll"></div>
      <style jsx>{`
        .icon-scroll,
        .icon-scroll:before {
            position: absolute;
            left: 50%
        }
        .icon-scroll {
            width: 30px;
            height: 50px;
            margin-left: -20px;
            bottom: 10%;
            margin-top: -35px;
            border: 2px solid #fff;
            border-radius: 25px;
            background-color: rgba(200,200,200, 0.5);
            opacity: 0.8;
        }
        .icon-scroll:before {
            content: '';
            width: 8px;
            height: 8px;
            background: #fff;
            margin-left: -4px;
            top: 8px;
            border-radius: 4px;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-name: scroll
        }
        @keyframes scroll {
            0% {
                opacity: 1
            }
            100% {
                opacity: 0;
                transform: translateY(26px)
            }
        }`}</style>
    </animated.div>
  )
}

export default ScrollIcon;
