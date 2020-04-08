import * as React from "react";
import Head from 'next/head';
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: () => Promise<P>
}

const Reporting: StatelessPage<any> = (props: any) => {

  const _seperateData = (datas:object) => {
    const dataArr = []
    for(let data in datas) {
      dataArr.push(<tr><td>{data}</td><td>{datas[data]}</td></tr>);
    }
    return dataArr;
  }

  const _drawData = (questions:object) => {
    const dataArr = [];
    let counter = 0;
    for(let question in questions) {
       dataArr.push(<><table key={`t_${counter}`}><tbody>{_seperateData(questions[question])}</tbody></table><hr/></>);
       counter++;
    }
    return dataArr;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Form Fill</title>
        <link rel="stylesheet" href="/static/css/common.css"/>
        <link rel="stylesheet" href="/static/css/w3c.css"/>
        <style>{`
          html {
            font-size: 14pt;
          }
        `}</style>
      </Head>
      <HeaderOne title={"Project Doctor x Reporting"} isLined={true}/>
        {
          _drawData(props.questionaires)
        }
      <Footer/>
    </React.Fragment>
  );
}

Reporting.getInitialProps = async() => {
  const { AUTH_API_CALL } = process.env;
  if (AUTH_API_CALL) {
    try {
      const res = await fetch(AUTH_API_CALL + '/api/questions');
      const json = await res.json();
      return {questionaires: json};
    }
    catch (err) {
      console.warn("error");
      return {questionaires: null};
    }

  }
  return {questionaires: null};
};

export default withRouter(Reporting);
