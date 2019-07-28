import * as React from "react";
import Head from 'next/head';
import { HtmlHead } from '../components/html/HtmlHead';
import CinemaScreen from "../components/CinemaScreen";
import SocialFab from "../components/SocialFab";
import CommandBar from '../components/CommandBar';

const Main: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead/>
      <Head>
        <title>Walcron Coorperation</title>
        <meta name="description" content="Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."/>
      </Head>
      <div className="header">
        <CommandBar/>
      </div>
      <CinemaScreen title={"Full-stack Web Developer"}
        btnOneStr={"About"} btnOneClick={'/about'}
        btnTwoStr={"Works"} btnTwoClick={'/work'}/>
      <SocialFab/>
      <style jsx>{`
        .header {
          text-align: center;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 2;
        }
        .center {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100vh;
          width: 100vw
        }
      `}</style>
    </React.Fragment>
  );
}

export default Main;
