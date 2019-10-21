import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';

const Tribute: React.SFC<any> = ({}) => {
  return (
    <>
      <HtmlHead
        nofontawesome={true}
        title={"People to thank"}
        description={"Gratitudes to the people and organization that made this website available and happen."}/>
      <h2>Tributes and Thanks to</h2>
      <table>
        <thead>
          <tr>
            <th>Organization / Person</th>
            <th>Site</th>
            <th>Tender Loving Message</th>
          </tr>
        </thead>
          <tr>
            <td>Pusher</td>
            <td>https://www.pusher.com</td>
            <td>Providing Lego push</td>
          </tr>
          <tr>
            <td>Zeit / Now.sh</td>
            <td>https://www.zeit.co</td>
            <td>Enabling website hosting</td>
          </tr>
          <tr>
            <td>Ruslan Khomiak</td>
            <td>https://codepen.io/ruslan_khomiak/pen/QGmwMP</td>
            <td>Graphics for social connect</td>
          </tr>
          <tr>
            <td>Rebin in iconfinder</td>
            <td>https://www.iconfinder.com/rebininfotech</td>
            <td>Graphic icon for social connect</td>
          </tr>
          <tr>
            <td>Font Awesome</td>
            <td>https://www.nofontawesome.com</td>
            <td>Awesome font icons</td>
          </tr>
          <tr>
            <td>Google Fonts - Roboto</td>
            <td>https://fonts.google.com</td>
            <td>The amazing fonts curves and styles</td>
          </tr>
        <tbody>
        </tbody>
      </table>
    </>
  );
}

export default Tribute;
