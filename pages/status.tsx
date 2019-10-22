import * as React from "react";
import Head from 'next/head';

const StatusReport: React.SFC<any> = ({}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" key="charset"/>
        <meta name="robots" content="noindex"/>
      </Head>
      <table>
        <tbody>
          <tr>
            <td>Pusher</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default StatusReport;
