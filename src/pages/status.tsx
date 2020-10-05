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
          {_generateTableRow("Backend Server", props.serviceInterval, props.backendService)}
          {_generateTableRow("App Service", props.appInterval, props.appService)}
        </tbody>
      </table>
      <style jsx>{`
        :global(table) {
          border-collapse: collapse;
        }
        :global(table, th, td) {
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

  let serviceInterval = _getTime();
  let serviceData = undefined;
  try {
    const serviceResponse = await fetch(process.env.BACKEND_SERVER, {
      method: 'GET',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/html'
      },
      redirect: 'follow',
      referrer: 'no-referrer'
    });
    serviceData = await serviceResponse.text();
    serviceInterval = _getTime() - serviceInterval;
  }
  catch(err) {

  }

  let appInterval = _getTime();
  let appData = undefined;
  try {
    const appResponse = await fetch("https://app.walcron.com", {
      method: 'GET',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/html'
      },
      redirect: 'follow',
      referrer: 'no-referrer'
    });
    appData = await appResponse.text();
    appInterval = _getTime() - appInterval;
  }
  catch(err) {

  }

  return {
    pusher: JSON.stringify(pusherData || ""),
    pusherInterval,
    backendService: (serviceData || ""),
    serviceInterval,
    appService: (appData || ""),
    appInterval
  };
};

export default StatusReport;
