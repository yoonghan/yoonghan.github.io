import Link from 'next/link';
import Head from 'next/head';
import { HtmlHead } from '../components/html/HtmlHead';
import Menu from '../components/Menu';
import HeaderOne from "../components/HeaderOne";
import CinemaScreen from "../components/CinemaScreen";
import Button from "../components/Button";
import SocialFab from "../components/SocialFab";
import Logo from '../components/Logo';
import CommandBar from '../components/CommandBar';

const Main: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead/>
      <Head>
        <title>Walcron cooperation is a casual company setup for Web Research and Development</title>
        <meta name="description" content="Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."/>
      </Head>
      <CinemaScreen title={"Full-stack Web Developer"} btnOneStr={"About"} btnTwoStr={"Works"}/>
      <SocialFab/>
      <div className="header">
        <CommandBar/>
      </div>
      <style jsx>{`
        .header {
          text-align: center;
          top: 10px;
          left: 10px;
          position: absolute;
        }
        .center {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .header {
          position: fixed;
          top: 1rem;
          left: 1rem;
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
