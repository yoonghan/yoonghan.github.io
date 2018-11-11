import Link from 'next/link';
import Head from 'next/head';
import { HtmlHead } from '../components/html/HtmlHead';
import { Menu } from '../components/Menu';

const Main: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead/>
      <Head>
        <title>Walcron cooperation is a casual company setup for Web Research and Development</title>
        <meta name="description" content="Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."/>
      </Head>
      <h1>HI</h1>
      <Menu
       menuItems={[
         <a href="link1">Link 1</a>,
         <a href="link2">Link 2</a>,
         <a href="link3">Link 2</a>
       ]}
       />
    </React.Fragment>
  );
}

export default Main;
