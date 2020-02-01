import * as React from "react";
import { HtmlHead } from "../components/HtmlHead";
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import CreationListv2 from "../components/CreationListv2";
import Footer from "../components/Footer";

const creationList = [
  {
    id: "r-prototyper",
    link: "react-template",
    title: "Customer Prototyper",
    desc: "Generate a powerpoint like static non-hosted webpage. " +
          "Useful for presentation and sending mockups to customers for visual views. ",
    gitLink: "https://github.com/yoonghan/react-templating",
    usage: "View with minimum 640X480px\nClick on Next/Back to scroll along the prototype pages.\nButtons within screens are functional.",
    imgSrc: "/static/img/creation/card2.jpg"
  },
  {
    id: "rn-android",
    link: "rn-android",
    title: "React Native Android Bridging",
    desc: "A tutorial to demo Android Bridging. One of my popular github forked project.",
    gitLink: "https://github.com/yoonghan/RN_Android_Native",
    imgSrc: "/static/img/creation/card3.jpg"
  },
  {
    id: "r-console",
    link: "rn-console",
    title: "Dashboard",
    desc: "A dashboard with Windows/MacOS familiarity. Layered on top of a hosted GraphQL server for headless query.",
    usage: "Please be patient with the loading time!!\nView with minimum 640 X 480px dimension\nType into the searchbox to begin.",
    imgSrc: "/static/img/creation/card5.jpg"
  },
  {
    id: "manipulator",
    link: "manipulator",
    title: "Chat API",
    desc: "A Pusher API implementation for Chat with multi-staged HOC to manage connection state.",
    usage: "Click to explore.",
    internal: true,
    imgSrc: "/static/img/creation/card4.jpg"
  }
]

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: () => Promise<P>
}

const Creation: StatelessPage<any> = () => {

  React.useEffect(()=>{
    //Instruct user server to do a query, a warm up for dashboard server
    fetch('https://dashboardgraphql-rsqivokhvn.now.sh/api', {
      method:"POST",
      body:'{ "query": "{ stores { hostName } }" }'
    });
  },[]);

  return (
    <React.Fragment>
      <HtmlHead
        title={"Experiments and Development"}
        description={"Contribution and self profile of Walcron."}/>
      <CommandBar/>
      <div className={'container'}>
        <HeaderOne title={"Creations"} isLined={true}/>
        <div className={'information'}>-- Scroll image to choose --</div>
        <CreationListv2 cards={creationList}/>
      </div>
      <div id="modal-root"/>
      <div className="footer"/>
      <Footer/>
      <style jsx>{`
        .container {
          margin: auto;
          padding-top: 100px;
        }
        .information {
          text-align: center;
        }
        .footer {
          padding-bottom: 100px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default Creation;
