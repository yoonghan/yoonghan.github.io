import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import LetterBox from "../components/LetterBox";
import HeaderOne from "../components/HeaderOne";
import HorizontalLine from "../components/HorizontalLine";
import Profiler from "../components/Profiler";
import CommandBar from '../components/CommandBar';
import ScrollToTop from '../components/ScrollToTop';
import {FOREGROUND} from "../shared/style";

interface AboutState {
}

class About extends React.PureComponent<{}, AboutState> {

  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <HtmlHead
          title="About Walcron"
          description="Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."
          />
        <CommandBar/>
        <div className="container">
          <section>
            <HeaderOne title={"Our mission"} isLined={true}/>
            <p>
              Walcron is a by-product of a couple's journey for being in the IT industry
              for more than 10 years. The Walcron website was build for Web experimentation to optimize
              and to prototype new Web developments. Ocassionally this is being re-contributed
              back into the opensource community. Han and Gladys started the Walcron website to
              log their development journey, as well as, to experiment real-time working websites.
            </p>
          </section>
          <HorizontalLine/>
          <section>
            <h2>What do we do?</h2>
            <p>
            We are coders who likes to crank our brains in creating visual components,
            may it be websites or on a piece of paper. Our expertise are on:
            </p>
            <ul>
              <li>SEO optimized websites</li>
              <li>Mobile and PWA enabled sites</li>
              <li>Lego Mindstorm</li>
              <li>Asynchronous/Multi-threaded programs</li>
            </ul>
          </section>
          <HorizontalLine/>
          <section>
            <h2>Are we freelance for hire?</h2>
            <p>
              Well...<i>if the price is right, and we have time to allocate</i>,
               <strong> yes</strong>.
              Provide us your contact information and we will reach out to you.
            </p>
          </section>
          <HorizontalLine/>
          <section>
            <h2>The developers</h2>
            <Profiler
              profiles={[
                {
                  name: "Han Yoong",
                  description: (
                    <div>
                    A passionate coder who is now stuck in a proprietery
                    software and hardware industry. In his free time, he spends time to read
                    and experiment new ways to improve the <i>Walcron Cooperation</i> publicity. He
                    has been contributing to Stackoverflow and sharing writeups in Github.
                    <br/><br/>
                    <i>He prefers to write-in Linux typed system and likes automate his stuffs.</i>
                    </div>
                  ),
                  imgSrc: "/static/img/profile/han.jpg"
                },
                {
                  name: "Gladys Tai",
                  description: (
                    <div>
                    An achiever with a bad-ass attitude. She always complains that she wouldn't
                    make it in time or the task are too complex to handle. However, <i>all the projects
                    that was/has been delivered by her are faultless.</i> As a girl, she spends most of
                    her time being presentable.
                    <br/><br/>
                    <i>She is a worrier and a warrior. Best described as Wonder Woman.</i>
                    </div>
                  ),
                  imgSrc: "/static/img/profile/gladys.jpg"
                }
              ]}
            />
          </section>
          <HorizontalLine/>
          <section>
            <h2>Contact</h2>
            <div className={"letterbox"}>
              <LetterBox/>
            </div>
          </section>
          <div className="footer"/>
        </div>
        <ScrollToTop/>
        <style jsx>{`
          i {
            font-style: italic;
            font-weight: bold;
            font-size: 1.1rem;
          }
          i:before, i:after {
            content: '"';
          }
          p {
            padding: 10px 30px;
          }
          .about {
            padding: 20px;
          }
          h2, h3, h4 {
            text-align: center;
          }
          .container {
            max-width: 640px;
            margin: auto;
            padding-top: 100px;
            color: ${FOREGROUND};
          }
          .footer {
            margin-bottom: 50px;
          }
          .letterbox {
            padding: 10px 30px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default About;
