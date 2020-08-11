import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import Timeline from "../components/Timeline";
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
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
        <HeaderOne title={"Books"} isLined={true}/>
        <Timeline/>
      </div>
      <style jsx>{`
        .container {
          max-width: 640px;
          margin: auto;
          padding-top: 100px;
          color: ${FOREGROUND};
          min-height: 86vh;
        }
      `}</style>
    </React.Fragment>
  );
}

export default React.memo(Motivation);
