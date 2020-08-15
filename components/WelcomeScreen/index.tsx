`use strict`

import * as React from "react";
import {useRef, useEffect, useState}  from "react";
import AnimatedBanner from "../AnimatedBanner";


const WelcomeScreen:React.FC<any> = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [doorKnocked, toggleDoorKnock] = useState(false);

  const refreshContainer = () => {
    toggleDoorKnock(!doorKnocked);
  }

  useEffect(() => {
    window.addEventListener('resize', refreshContainer);
    return () => {
      window.removeEventListener('resize', refreshContainer);
    }
  })

  return (
    <div className="outer-container">
      <div className="container" ref={scrollContainerRef}>
        <AnimatedBanner scrollContainer={scrollContainerRef} tiggerChange={doorKnocked}/>
      </div>
      <style jsx>{`
        .outer-container {
          position: relative;
        }
        .container {
          width: 100vw;
          height: 66vw;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  )
}

export default WelcomeScreen;
