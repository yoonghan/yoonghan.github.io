import * as React from "react";
import Head from 'next/head';
import { HtmlHead } from "../components/html/HtmlHead";
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import ScrollToTop from "../components/ScrollToTop";
import Worklist from "../components/Worklist";


const workList = [
  {
    id: "r-prototyper",
    link: "prototype",
    title: "Customer Prototyper",
    desc: "Quick prototyping with React."
  },
  {
    id: "rn-android",
    link: "android",
    title: "Android Learning",
    desc: "Android bridging."
  },
  {
    id: "rn-ex-postcard",
    link: "EzLinkPostcard",
    title: "Production for Ez-Link Postcard",
    desc: "Written with React."
  },
  {
    id: "r-console",
    link: "ReactConsole",
    title: "Management Console",
    desc: "Management console that loads fast with search capabilities."
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
        <HtmlHead/>
        <Head>
          <title>Experiments and Development</title>
          <meta name="description" content="Contribution and self profile of Walcron."/>
        </Head>
        <CommandBar/>
        <div className={'container'}>
          <HeaderOne title={"Creations"} isLined={true}/>
          <Worklist workArr={workList}/>
        </div>
        <ScrollToTop/>
        <div className="footer"/>
        <style jsx>{`
          .container {
            margin: auto;
            padding-top: 100px;
          }
          .footer {
            margin-bottom: 100px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Creation;
