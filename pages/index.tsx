import * as React from "react";
import {Helmet} from "react-helmet";
import { HtmlHead } from "../components/HtmlHead";
import CinemaScreen from "../components/CinemaScreen";
import SocialFab from "../components/SocialFab";
import CommandBar from "../components/CommandBar";
import Footer from "../components/Footer";
//import Cookie from "../components/Cookie";
//import cookies from 'next-cookies';

const _getSchema = () => {
  const schemas = {
            "@context" : "http://schema.org",
            "@type" : "LocalBusiness",
            "name" : "Walcron",
            "image" : "https://walcron.com/static/img/logo/logo-color.svg",
            "email" : "walcoorperation@gmail.com",
            "url" : "https://www.walcron.com/",
            "openingHoursSpecification" : {
              "@type" : "OpeningHoursSpecification",
              "dayOfWeek" : {
                "@type" : "DayOfWeek",
                "name" : "Monday-Sunday"
              },
              "opens" : "2014-07-04T9:00",
              "closes" : "2020-07-04T9:00"
            }
          }
  return JSON.stringify(schemas);
}

interface IMainProps {
  termsRead: string;
}

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const Main: StatelessPage<IMainProps> = ({}) => {
  return (
    <React.Fragment>
      <HtmlHead
        title={"Walcron"}
        description={"Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."}
        nofontawesome={true}
        />
      <Helmet>
        <script type="application/ld+json">
          {_getSchema()}
        </script>
      </Helmet>
      <CommandBar disableMobile={true}/>
      <CinemaScreen title={"Full-stack Web Developers"}
        btnOneStr={"About"} btnOneClick={'/about'}
        btnTwoStr={"Showcase"} btnTwoClick={'/creation'}/>
      <SocialFab/>
      <Footer/>
      <style jsx global>{`
        #__next {
          height: 100vh;
          width: 100vw
        }
      `}</style>
    </React.Fragment>
  );
}

// Main.getInitialProps = async(ctx:any) => {
//   return {
//     termsRead: cookies(ctx).termsRead || "false"
//   }
// };

export default React.memo(Main);
