import * as React from "react";
import Head from 'next/head';
import Logo from '../components/Logo';
import ConstructionSplashScreen from '../components/ConstructionSplashScreen';

const Index: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Not Found</title>
        <meta name="description" content={"Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."} key="description"/>
      </Head>
      <div className={'container'}>
        <h1>Welcome to walcron.</h1>
        <h2>The page you have requested is not available.</h2>
        <a href="/"><ConstructionSplashScreen/></a>
        <a href="/"><Logo/></a>
        <h3>Design by Walcron ( 2019 )</h3>
      </div>
      <style jsx>{`
        h1 {
          display: none;
        }
        h2 {
          display: none;
        }
        h3 {
          position: absolute;
          bottom: 30px;
          right: 30px;
          font-family: arial;
          line-height: 0;
          font-size: 0.8rem;
          font-weight: normal;
          color: #000;
        }
        container {
          position: relative;
        }
      `}</style>
      <style jsx global>
      {`
        html {
          font-size: 12pt;
        }
        body {
          padding: 0;
          margin: 0;
        }
      `}
      </style>
    </React.Fragment>
  );
}

export default Index;
