import * as React from "react";
import { HtmlHead } from '../components/html/HtmlHead';
import HeaderOne from '../components/HeaderOne';

const Main: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead
        title={"Walcron's Journey"}
        description={"Information about Walcron as a startup."}/>
      <HeaderOne title={"Walcron's journey"}/>
    </React.Fragment>
  );
}

export default Main;
