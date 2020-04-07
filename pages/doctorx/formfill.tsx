import * as React from "react";
import Head from 'next/head';
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import ReverseSurveyBuilder from "../../components/ReverseSurveyBuilder";

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: () => Promise<P>
}

enum enumStatuses {
  INITIAL,
  SUBMITTING,
  SUCCESS,
  FAIL
}

const FormFill: StatelessPage<any> = (props: any) => {
  const [status, setStatus] = React.useState(enumStatuses.INITIAL);

  const {name} = props.router.query;
  const _drawData = () => {
    const {survey} = props;
    return (
        <ReverseSurveyBuilder {...survey} changeStatus={setStatus}/>
    )
  }

  const _renderDiv = () => {
    switch (status) {
      case enumStatuses.INITIAL:
        return _drawData();
      case enumStatuses.SUBMITTING:
        return <div>Processing</div>
      case enumStatuses.SUCCESS:
        return <div>Thank you!</div>
      default:
        return <div>Error</div>
    }
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
      <HeaderOne title={"Project Doctor x"} isLined={true}/>
      {name && _renderDiv()}
      {!name && _renderDiv()}
      <Footer/>
    </React.Fragment>
  );
}

FormFill.getInitialProps = async() => {
  const { AUTH_API_CALL } = process.env;
  if (AUTH_API_CALL) {
    try {
      const res = await fetch(AUTH_API_CALL + '/api/survey');
      const json = await res.json();
      return {survey: json};
    }
    catch (err) {
      console.warn("error");
      return {survey: null};
    }

  }
  return {survey: null};
};

export default withRouter(FormFill);
