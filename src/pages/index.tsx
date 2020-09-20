import * as React from "react";
import { Helmet } from "react-helmet";
import { HtmlHead } from "../components/HtmlHead";
import SocialFab from "../components/SocialFab";
import AssetLoader from "../components/AssetLoader";
import {EnumAssetLoader} from "../components/AssetLoader";
import ScrollIcon from "../components/ScrollIcon";
import ParallaxBanner from "../components/Parallax/Banner";
import ParallaxPlainSection from "../components/Parallax/PlainSection";
import ParallaxFigure from "../components/Parallax/Figure";
import ParallaxGraph from "../components/Parallax/Graph";
import ParallaxCarousell from "../components/Parallax/Carousell";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import Cookie from "../components/Cookie";
import cookies from "next-cookies";
import LetterBox from "../components/LetterBox";
import CommandBar from "../components/CommandBar";
import PageReaderIndicator from "../components/PageReaderIndicator";
import Video from "../components/Video";
import {LINK_COLOR} from "../shared/style";
import NoJavascriptSupport from "../components/NoJavascriptSupport";
import Button from "../components/Button";

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

const Main: StatelessPage<IMainProps> = ({termsRead}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [loadPercentage, updateLoadPercentage] = React.useState(0);
  const assetsToLoad = [
    {type: EnumAssetLoader.IMAGE, src:"/img/welcome/fg-left.jpg"},
    {type: EnumAssetLoader.IMAGE, src:"/img/welcome/walcron-authors.jpg"},
    {type: EnumAssetLoader.IMAGE, src:"/img/profile/han.jpg"},
    {type: EnumAssetLoader.IMAGE, src:"/img/profile/gladys.jpg"},
    {type: EnumAssetLoader.IMAGE, src:"/img/welcome/connection.png"}
  ];

  const _termsRead = (termsRead == 'true');

  const _scrollToTop = ()=>{
    if(scrollContainerRef.current !== null) {
      scrollContainerRef.current.scrollTo(0,0);
    }
  }

  return (
    <React.Fragment>
      <HtmlHead
        title={"Walcron"}
        description={"Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."}
        nofontawesome={false}
        noBackground={true}
        />
      <Helmet>
        <script type="application/ld+json">
          {_getSchema()}
        </script>
      </Helmet>
      <NoJavascriptSupport noScriptElem={false}>
        <div ref={scrollContainerRef} className="container">
          <CommandBar disableMobile={true}/>
          <section>
            {!imgLoaded &&
              <Counter
                countTo={loadPercentage}
                postFix="%"
                targetToReach={100}
                targetReachCallback={()=>{setImgLoaded(true)}}
                />
              }
          </section>
          {imgLoaded &&
            <section className="loaded-container">
              <PageReaderIndicator scrollContainer={scrollContainerRef} />
              <ParallaxBanner scrollContainer={scrollContainerRef}/>
              <ScrollIcon scrollContainer={scrollContainerRef}/>
              <div className={`info-container`}>
                <div className="relative">
                  <ParallaxPlainSection title="What do we do?">
                    <div className="section1">
                      We are coders who likes to crank our brains in creating visual components.
                      May it be websites or on a piece of paper, our expertise are on:
                      <ul>
                        <li>SEO optimized websites</li>
                        <li>Mobile and PWA enabled sites</li>
                        <li>Lego Mindstorm</li>
                        <li>Asynchronous/Multi-threaded programs</li>
                      </ul>
                    </div>
                  </ParallaxPlainSection>
                  <ParallaxFigure
                    imageSrc="/img/profile/han.jpg">
                    <div className="section-profile-title">
                      <div>01</div>
                      <h3>Han Yoong</h3>
                    </div>
                    <div className="section-profile-text">
                      A passionate coder who is now stuck in a proprietery software and hardware industry. In his free time, he spends time to read and experiment new ways to improve the Walcron Cooperation publicity. He has been contributing to Stackoverflow and sharing write-ups in Github.
                      <p className="section-quote">"An enthusiast programmer."</p>
                    </div>
                  </ParallaxFigure>
                  <ParallaxFigure
                    imageSrc="/img/profile/gladys.jpg"
                    isImagePositionOnRight={true}
                    >
                    <div className="section-profile-title right">
                      <div>02</div>
                      <h3>Gladys Tai</h3>
                    </div>
                    <div className="section-profile-text">
                      An achiever with a bad-ass attitude. She always complains that she wouldn't make it in time or the task are too complex to handle. However, all the projects that was/has been delivered by her are faultless. As a girl, she spends most of her time being presentable.
                      <p className="section-quote">"She is a worrier and a warrior."</p>
                    </div>
                  </ParallaxFigure>
                </div>
              </div>
              <ParallaxGraph
                graphImg="/img/welcome/walcron-roadmap.jpg"/>
              <div className="info-container relative">
                <ParallaxPlainSection title="Are we freelance for hire ?">
                  <div className="section1">
                  Well...if the price is right, and we have time to allocate, yes. Provide us your contact information and we will reach out to you.
                  </div>
                  <div className={"letterbox"}>
                    <LetterBox/>
                  </div>
                </ParallaxPlainSection>
                <ParallaxPlainSection title="Our works">
                  <ParallaxCarousell
                    articles={[
                      {
                        "icon": "fa-mobile-alt",
                        "title": "React-Native Bridging",
                        "description": "Shared tutorial on React Native bridging.",
                        "href": "https://github.com/yoonghan/RN_Android_Native"
                      },
                      {
                        "icon": "fa-shopping-cart",
                        "title": "Self checkout machine",
                        "description": "Self checkout interface screen.",
                        "href": "/host/react-template/index.html"
                      },
                      {
                        "icon": "fa-comments",
                        "title": "Chatroom program",
                        "description": "Web chatter with Pusher.",
                        "href": "/manipulator"
                      },
                      {
                        "icon": "fa-chart-line",
                        "title": "Dashboard",
                        "description": "Dashboard, but partially broken.",
                        "href": "/host/rn-console/index.html"
                      }
                    ]}
                    uniqueCarousellName="plx-showcase"
                  />
                </ParallaxPlainSection>
                <ParallaxPlainSection title="Behind the scenes">
                  <Video
                    src="/mov/welcome.mp4"
                    imgSrc="/img/welcome/girl-in-glass.jpg"
                    imgAlt="women in a len"
                    preload="none"
                  />
                </ParallaxPlainSection>
                <ParallaxPlainSection>
                  <div className="section-end">
                    <h2>Familiar with shell?</h2>
                    try and type "<strong>help</strong>" here:
                    <div className="section-end-container">
                      <CommandBar disableMobile={false} commandPromptOnly={true}/>
                    </div>
                  </div>
                </ParallaxPlainSection>
                <ParallaxPlainSection title="Android Download">
                  <div className="section-end">
                    Like us? Why not download us. It's PWA powered android native and not a webview.
                    <div className="section-download">
                      <Button href="https://play.google.com/store/apps/details?id=com.walcron.web" target="download">
                        <i className="fab fa-google-play"></i> Playstore Download
                      </Button>
                    </div>
                  </div>
                </ParallaxPlainSection>
                <ParallaxPlainSection>
                  <div className="section-end">
                    <span>this website is powered with:</span>
                    <h2>Next.JS with React and Typescript</h2>
                  </div>
                  <div className="section-backtotop">
                    <button onClick={_scrollToTop}>Return to top</button>
                  </div>
                </ParallaxPlainSection>
              </div>
              <SocialFab />
            </section>
          }
          <style jsx>{`
            .container {
              width: calc(100vw - 3px);
              position: relative;
              overflow: scroll;
              height: 100vh;
              scroll-behavior: smooth;
            }
            .container.hidden {
              visible: hidden;
            }
            .section1 {
              max-width: 600px;
            }
            .letterbox {
              padding: 2rem 0;
            }
            .section-end span {
              text-align: center;
              font-size: 0.75rem;
            }
            .loaded-container {
              opacity: 1;
              animation: fadeInFromNone 0.5s ease-out;
            }
            .section-profile-title {
              position: relative;
            }
            .section-profile-title > div{
              font-size: 6rem;
              color: red;
              font-weight: bold;
            }
            .section-profile-title > h3{
              position: absolute;
              top: 2.5rem;
              background-color: black;
              padding: 0 1rem 0.25rem 1rem;
            }
            .section-profile-title.right > h3 {
              right: 0;
            }
            .section-profile-text {
              text-align: justify;
            }
            .section-quote {
              font-weight: bold;
              font-style: italic;
            }
            .section-download {
              display: flex;
              justify-content: center;
              padding-top: 3rem;
            }
            .section-backtotop {
              display: flex;
              justify-content: center;
            }
            .section-backtotop > button {
              border: 0;
              text-decoration: underline;
              background: none;
              color: ${LINK_COLOR};
              cursor: pointer;
            }
            .section-end-container {
              position: relative;
              height: 7rem;
            }
            @keyframes fadeInFromNone {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
            .info-container {
              max-width: 1024px;
              margin: auto;
              margin-bottom: 5rem;
            }
            .relative {
              position: relative;
            }
            `}</style>
            <Footer isRelative={true}/>
        </div>
      </NoJavascriptSupport>
      <AssetLoader
        assetsSrcToLoad={assetsToLoad}
        percentageLoad={(percentage) => updateLoadPercentage(percentage)}/>
      <Cookie isClosed={_termsRead} />
    </React.Fragment>
  );
}

Main.getInitialProps = async(ctx:any) => {
  return {
    termsRead: cookies(ctx).termsRead || "false"
  }
};

export default Main;
