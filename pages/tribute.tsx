import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import Table from "../components/Table";
import {FOREGROUND, TABLE_HEADER, TABLE_BODY} from "../shared/style";
import Footer from "../components/Footer";
import tribute from "../public/json/tribute";

const Tribute: React.SFC<any> = ({}) => {
  return (
    <>
      <HtmlHead
        title={"People to thank"}
        description={"Gratitudes to the people and organization that made this website available and happen."}/>
      <CommandBar/>
      <div className="container">
        <HeaderOne title={"Tributes and thanks"} isLined={true}/>
        <Table
          headers={['Organization / Person', 'Tender Loving Message', 'Site']}
          list={tribute} />
          <div style={{paddingBottom: '5rem'}}></div>
        <Footer/>
      </div>
      <style jsx>{`
        .container {
          max-width: 640px;
          margin: auto;
          padding-top: 100px;
          color: ${FOREGROUND};
          min-height: 86vh;
        }
        thead th {
          color: ${TABLE_HEADER.FOREGROUND};
          background-color: ${TABLE_HEADER.BACKGROUND};
        }
        tbody th {
          padding: 1rem 2rem;
          border-top: ${TABLE_BODY.BORDER};
          padding-bottom: 1rem;
        }
      `}</style>
    </>
  );
}

export default Tribute;
