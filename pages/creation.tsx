import * as React from "react";
import { HtmlHead } from "../components/HtmlHead";
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import ScrollToTop from "../components/ScrollToTop";
import CreationList from "../components/CreationList";
import Footer from "../components/Footer";

const creationList = [
  {
    id: "r-prototyper",
    link: "react-template",
    title: "Customer Prototyper",
    desc: "Write react components and generates prototype that can be run locally (without a need of a webserver). " +
          "Useful for presentation and sending mockups to customers for visual views. ",
    gitLink: "https://github.com/yoonghan/react-templating",
    usage: "View with minimum 640X480px\nClick on Next/Back to scroll along the prototype pages.\nButtons within screens are functional."
  },
  {
    id: "rn-android",
    link: "rn-android",
    title: "React Native Android Bridging",
    desc: "A simple prototype to demo the power of Android Bridging. One of my popular github forked project.",
    gitLink: "https://github.com/yoonghan/RN_Android_Native"
  },
  {
    id: "r-console",
    link: "rn-console",
    title: "Management Console",
    desc: "Management console that loads fast with search capabilities. Layered on top of graphQL.",
    usage: "View with minimum 640X480px\nType into the searchbox to begin."
  }
]

//Purposely added 's'.
class Creation extends React.PureComponent<{}, {}> {

  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <HtmlHead
          title={"Experiments and Development"}
          description={"Contribution and self profile of Walcron."}/>
        <CommandBar/>
        <div className={'container'}>
          <HeaderOne title={"Creations"} isLined={true}/>
          <CreationList workArr={creationList}/>
        </div>
        <ScrollToTop/>
        <div className="footer"/>
        <Footer/>
        <style jsx>{`
          .container {
            margin: auto;
            padding-top: 100px;
          }
          .footer {
            padding-bottom: 100px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Creation;
