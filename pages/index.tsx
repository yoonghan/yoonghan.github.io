import Link from 'next/link';
import Head from 'next/head';
import { HtmlHead } from '../components/html/HtmlHead';
import { Logo } from '../components/Logo';
import { ConstructionSplashScreen } from '../components/ConstructionSplashScreen';

const Index: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead/>
      <Head>
        <title>Walcoorperation a casual company setup for Web Research and Development</title>
        <meta name="description" content="Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."/>
      </Head>
      <div className={'container'}>
        <h1>Welcome to walcron, it is currently under construction.</h1>
        <h2>A webpage to designed by Yoong Han and Lee Wan as Internet Research and Development center.</h2>
        <ConstructionSplashScreen/>
        <Logo/>
        <h3>Design by Walcron ( 2018 )</h3>
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
        }
        container {
          position: relative;
        }
      `}</style>
    </React.Fragment>
  );
}

export default Index;
