import * as React from 'react';
import { BASIC_MENU } from './menu';
import { storiesOf } from '@storybook/react';
import ParallaxBanner from "../components/Parallax/Banner";
import ParallaxFigure from "../components/Parallax/Figure";
import ParallaxGraph from "../components/Parallax/Graph";

const Component = () => {
  return <WelcomeScreen/>
}

const Component2 = () => {
  return <WelcomeScreen2/>
}

const Component3 = () => {
  return <ParallaxGraph/>
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

const WelcomeScreen2:React.FC<any> = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="outer-container">
      <div className="container" ref={scrollContainerRef}>
        <div className="sample-very-long-height">
          Sampling 200vh, scroll down.
        </div>
        <ParallaxFigure
          imageSrc="https://via.placeholder.com/150x250.jpg">
          <h3>Awesome graphics</h3>
          <div>
            very diverse and interesting graphics.
          </div>
        </ParallaxFigure>
        <ParallaxFigure
          imageSrc="https://via.placeholder.com/150x250.jpg"
          isImagePositionOnRight={true}
          >
          <h3>Awesome graphics</h3>
          <div>
            very diverse and interesting graphics.
          </div>
        </ParallaxFigure>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 200vw;
          overflow-y: scroll;
        }
        .sample-very-long-height {
          height: 200vh;
        }
        h3 {
          margin-top: 0;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

const stories = storiesOf(`${BASIC_MENU}/Parallax`, module);
stories.add('Banner', Component);
stories.add('Figure', Component2);
stories.add('Graph', Component3);
