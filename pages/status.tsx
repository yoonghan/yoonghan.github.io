import * as React from "react";
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const _generateTableResponse = (application:string, response:string) => {
  return (
    <tr>
      <td>{application}</td>
      <td>{response}</td>
    </tr>
  )
}

const StatusReport: StatelessPage<any> = (props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" key="charset"/>
        <meta name="robots" content="noindex"/>
      </Head>
      <h3>Application Status</h3>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Application</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {_generateTableResponse("Pusher API", props.pusher)}
        </tbody>
      </table>
      <style jsx global>{`
        table {
          border-collapse: collapse;
        }
        table, th, td {
          border: 1px solid black;
          padding: 5px;
        }
      `}</style>
    </>
  );
}

StatusReport.getInitialProps = async({}) => {
  const pusherResponse = await fetch('https://www.walcron.com/api/manipulator', {
    method: 'LINK',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({})
  });
  const pusherData = await pusherResponse.json();

  return {
    pusher: JSON.stringify(pusherData)
  };
};

export default StatusReport;
