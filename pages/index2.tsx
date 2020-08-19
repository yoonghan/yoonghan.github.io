import * as React from "react";
import { Helmet } from "react-helmet";
import { HtmlHead } from "../components/HtmlHead";
import SocialFab from "../components/SocialFab";
import CommandBar from "../components/CommandBar";
import ImageLoader from "../components/ImageLoader";
import ParallaxBanner from "../components/Parallax/Banner";
import ParallaxPlainSection from "../components/Parallax/PlainSection";
import ParallaxFigure from "../components/Parallax/Figure";
import ParallaxGraph from "../components/Parallax/Graph";
import Footer from "../components/Footer";
import Counter from "../components/Counter";

const _getSchema = () => {
  const schemas = {
            "@context" : "http://schema.org",
            "@type" : "LocalBusiness",
            "name" : "Walcron",
            "image" : "https://walcron.com/static/img/logo/logo-color.svg",
            "email" : "walcoorperation@gmail.com",
            "url" : "https://www.walcron.com/",
            "openingHoursSpecification" : {
              "@type" : "OpeningHoursSpecification",
              "dayOfWeek" : {
                "@type" : "DayOfWeek",
                "name" : "Monday-Sunday"
              },
              "opens" : "2014-07-04T9:00",
              "closes" : "2020-07-04T9:00"
            }
          }
  return JSON.stringify(schemas);
}

interface IMainProps {
  termsRead: string;
}

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const Main: StatelessPage<IMainProps> = ({}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [loadPercentage, updateLoadPercentage] = React.useState(0);
  const imagesToLoad = ["/static/img/welcome/fg-left.png","/static/img/welcome/fg-right.png","https://via.placeholder.com/150x250.jpg"];

  return (
    <React.Fragment>
      <HtmlHead
        title={"Walcron"}
        description={"Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."}
        nofontawesome={true}
        />
      <Helmet>
        <script type="application/ld+json">
          {_getSchema()}
        </script>
      </Helmet>
        <div ref={scrollContainerRef} className="container">
          <CommandBar disableMobile={true}/>
          {!imgLoaded &&
            <Counter
              countTo={loadPercentage}
              postFix="%"
              targetToReach={100}
              targetReachCallback={()=>{setImgLoaded(true)}}
              />
            }
          {imgLoaded &&
            <React.Fragment>
              <ParallaxBanner scrollContainer={scrollContainerRef}/>
              <div className={`info-container`}>
                <ParallaxPlainSection title="messaging"/>
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
              <ParallaxGraph
                graphImg="https://via.placeholder.com/2000x1000.png"/>
              <SocialFab />
              <div className={`info-container`}>
                <ParallaxPlainSection title="messaging"/>
              </div>
            </React.Fragment>
          }
          <Footer isRelative={true}/>
          <style jsx>{`
            .container {
              position: relative;
              overflow: scroll;
              height: 100vh;
            }
            .container.hidden {
              visible: hidden;
            }
            .info-container {
              max-width: 1024px;
              margin: auto;
            }
            `}</style>
        </div>
        <ImageLoader
          imagesSrcToLoad={imagesToLoad}
          percentageLoad={(percentage) => updateLoadPercentage(percentage)}/>
      }
    </React.Fragment>
  );
}

// Main.getInitialProps = async(ctx:any) => {
//   return {
//     termsRead: cookies(ctx).termsRead || "false"
//   }
// };

export default React.memo(Main);
