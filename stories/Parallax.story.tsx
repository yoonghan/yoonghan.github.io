import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import ParallaxBanner from "../components/Parallax/Banner";

const Component = () => {
  return <WelcomeScreen/>
}

const WelcomeScreen:React.FC<any> = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="outer-container">
      <div className="container" ref={scrollContainerRef}>
        <ParallaxBanner scrollContainer={scrollContainerRef}/>
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

const stories = storiesOf(`${BASIC_MENU}/Parallax`, module);
stories.add('WelcomeScreen', Component);
