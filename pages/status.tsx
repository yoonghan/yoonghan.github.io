import * as React from "react";
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const _generateTableRow = (application:string, timeTaken:number, response:string) => {
  const status = response !== "" ? response : "Dead" ;

  return (
    <tr>
      <td>{application}</td>
      <td>{timeTaken}</td>
      <td>{status}</td>
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
            <th>Request/Response Time(millis)</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {_generateTableRow("Pusher API", props.pusherInterval, props.pusher)}
          {_generateTableRow("GraphQL API", props.graphqlInterval, props.graphql)}
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

const _getTime = () => {
  return new Date().getTime();
}

StatusReport.getInitialProps = async({}) => {
  let pusherInterval = _getTime();
  const pusherResponse = await fetch("https://www.walcron.com/api/manipulator", {
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
  pusherInterval = _getTime() - pusherInterval;

  let graphqlInterval = _getTime();
  const graphqlResponse = await fetch("https://dashboardgraphql-rsqivokhvn.now.sh/api?query={agent(id:12){id}}")
  const graphqlData = await graphqlResponse.json();
  graphqlInterval = _getTime() - graphqlInterval;

  return {
    pusher: JSON.stringify(pusherData || ""),
    pusherInterval,
    graphql: JSON.stringify(graphqlData || ""),
    graphqlInterval
  };
};

export default StatusReport;
