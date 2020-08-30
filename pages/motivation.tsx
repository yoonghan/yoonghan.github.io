import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import Table from "../components/Table";
import Timeline from "../components/Timeline";
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import timeline from "../public/json/timeline.js";
import {FOREGROUND} from "../shared/style";

interface IMotivationProps {
}

const Motivation: React.SFC<IMotivationProps> = ({}) => {
  return (
    <React.Fragment>
      <HtmlHead
        title={"Self Improvement"}
        description={"External knowledge and things I worked on."}/>
      <CommandBar/>
      <div className="container">
        <HeaderOne title={"Site's lifeline"} isLined={true}/>
        <Timeline events={timeline.journey}/>
      </div>
      <div className="container container-2">
        <HeaderOne title={"Motivational Books"} isLined={true}/>
        <Table list={timeline.nonFictionBooks}/>
      </div>
      <style jsx>{`
        .container {
          max-width: 640px;
          margin: auto;
          padding-top: 100px;
          color: ${FOREGROUND};
          min-height: 86vh;
        }
        .container.container-2 {
          padding-top: 0
        }
      `}</style>
    </React.Fragment>
  );
}

export default React.memo(Motivation);
