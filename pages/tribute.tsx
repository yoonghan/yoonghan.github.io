import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import CommandBar from "../components/CommandBar";
import {FOREGROUND, TABLE_HEADER, TABLE_BODY} from "../shared/style";
import Footer from "../components/Footer";

const Tribute: React.SFC<any> = ({}) => {
  return (
    <>
      <HtmlHead
        nofontawesome={true}
        title={"People to thank"}
        description={"Gratitudes to the people and organization that made this website available and happen."}/>
      <CommandBar/>
      <div className="container">
        <HeaderOne title={"Tributes and Thanks to"} isLined={true}/>

        <table>
          <thead>
            <tr>
              <th>Organization / Person</th>
              <th>Tender Loving Message</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pusher</td>
              <td>Providing Lego push</td>
              <td>https://www.pusher.com</td>
            </tr>
            <tr>
              <td>Zeit / Now.sh</td>
              <td>Enabling website hosting</td>
              <td>https://www.zeit.co</td>
            </tr>
            <tr>
              <td>Ruslan Khomiak</td>
              <td>Graphics for social connect</td>
              <td>https://codepen.io/ruslan_khomiak/pen/QGmwMP</td>
            </tr>
            <tr>
              <td>Rebin in iconfinder</td>
              <td>Graphic icon for social connect</td>
              <td>https://www.iconfinder.com/rebininfotech</td>
            </tr>
            <tr>
              <td>Font Awesome</td>
              <td>Awesome font icons</td>
              <td>https://www.fontawesome.com</td>
            </tr>
            <tr>
              <td>Google Fonts - Roboto</td>
              <td>The amazing fonts curves and styles</td>
              <td>https://fonts.google.com</td>
            </tr>
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
        tbody td, tbody th {
          padding: 5px 10px;
          margin
          border-top: ${TABLE_BODY.BORDER};
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
    </>
  );
}

export default Tribute;
