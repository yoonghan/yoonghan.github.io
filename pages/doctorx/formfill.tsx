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

  const onSubmit = (values:object) => {
    const data = JSON.stringify(values);
    setStatus(enumStatuses.SUBMITTING);
    fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(() => {
      setStatus(enumStatuses.SUCCESS);
    })
    .catch(() => {
      setStatus(enumStatuses.FAIL);
    });
  }

  const {name, mobileno, address} = props.router.query;
  const _drawData = () => {
    const {survey} = props;
    return (
        <ReverseSurveyBuilder {...survey} handleSubmit={onSubmit} name={name||''} mobileno={mobileno||''} address={address||''}/>
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
      {(name || address || mobileno) && _renderDiv()}
      {(!name && !address && !mobileno) && _renderDiv()}
      <div style={{padding: '2rem 0'}} />
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
