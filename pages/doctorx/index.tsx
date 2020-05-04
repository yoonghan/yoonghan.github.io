import * as React from "react";
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import Doctorx from "../../components/Doctorx";

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: () => Promise<P>
}

const DoctorxPage:StatelessPage<any> = (props: any) => {
  const {survey} = props;
  return (
    <React.Fragment>
      <header>
        <HeaderOne title={"Project Doctor x"} isLined={true}/>
      </header>
      {survey !== null && <Doctorx survey={props.survey} />}
      <div className="printhidden">To create one, click <a href="/doctorx/questionaires">!!here!!</a></div>
      <Footer/>
      <style jsx>{`
        {
          @media print {
            :global(header, footer, .printhidden) {
              display: none
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
}

DoctorxPage.getInitialProps = async() => {
  const { AUTH_API_CALL } = process.env;
  if (AUTH_API_CALL) {
    try {
      console.log(AUTH_API_CALL);
      const res = await fetch(AUTH_API_CALL + '/api/survey');
      const json = await res.json();
      return {survey: json};
    }
    catch (err) {
      console.log(err);
      return {survey: null};
    }

  }
  return {survey: null};
};

export default DoctorxPage;
