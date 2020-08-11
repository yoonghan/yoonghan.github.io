import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import {FOREGROUND, TABLE_HEADER, TABLE_BODY} from "../shared/style";
import Footer from "../components/Footer";

const _renderData = (title: string, description: string, link: string) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{link}</td>

      <style jsx>{`
        td {
          padding: 1rem 2rem;
          border-top: ${TABLE_BODY.BORDER};
          padding-bottom: 1rem;
        }
        td:first-child {
          padding-right: 10px;
        }
        td:last-child {
          font-size: 0.7rem;
        }
        tr {
          color: ${TABLE_BODY.FOREGROUND};
          background-color: ${TABLE_BODY.BACKGROUND};
        }
        tr:hover {
          background-color: ${TABLE_BODY.HOVER_BACKGROUND};
        }
      `}</style>
    </tr>
  )
}

const Tribute: React.SFC<any> = ({}) => {
  return (
    <>
      <HtmlHead
        title={"People to thank"}
        description={"Gratitudes to the people and organization that made this website available and happen."}/>
      <CommandBar/>
      <div className="container">
        <HeaderOne title={"Tributes and thanks"} isLined={true}/>

        <table>
          <thead>
            <tr>
              <th>Organization / Person</th>
              <th>Tender Loving Message</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            {_renderData("Pusher", "Subscribe/Publish", "https://www.pusher.com")}
            {_renderData("Zeit / Now.sh", "Enabling website hosting", "https://www.zeit.co")}
            {_renderData("Author Ruslan Khomiak", "Graphics for social connect", "https://codepen.io/ruslan_khomiak/pen/QGmwMP")}
            {_renderData("Rebin from Iconfinder", "Graphic icon for social connect", "https://www.iconfinder.com/rebininfotech")}
            {_renderData("Font Awesome", "Awesome font icons", "https://www.fontawesome.com")}
            {_renderData("Google Fonts - Roboto", "The amazing fonts curves and styles", "https://fonts.google.com")}
            {_renderData("React Spring", "Might be the best animation javascript out there", "https://github.com/react-spring/react-spring")}
            {_renderData("React Bell Chat", "For use in chat program", "https://github.com/react-bell-chat")}
            {_renderData("React Dropzone", "For use in chat program", "https://github.com/react-dropzone")}
          </tbody>
        </table>

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
