import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import CinemaScreen from "../components/CinemaScreen";
import SocialFab from "../components/SocialFab";
import CommandBar from '../components/CommandBar';

const Main: React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead
        nofontawesome={true}
        title={"Walcron Coorperation"}
        description={"Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."}/>
      <CommandBar disableMobile={true}/>
      <CinemaScreen title={"Full-stack Web Developer"}
        btnOneStr={"About"} btnOneClick={'/about'}
        btnTwoStr={"Invent"} btnTwoClick={'/creation'}/>
      <SocialFab/>
      <style jsx>{`
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
