import * as React from "react";
import Head from 'next/head';
import { HtmlHead } from '../components/html/HtmlHead';
import HeaderOne from '../components/HeaderOne';

const Main: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead/>
      <Head>
        <title>Walcron's journey</title>
        <meta name="description" content="Information about Walcron's journey."/>
      </Head>
      <HeaderOne title={"Walcron's journey"}/>
    </React.Fragment>
  );
}

export default Main;
