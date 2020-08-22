import * as React from "react";
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import Doctorx from "../../components/Doctorx";
import fetch from 'isomorphic-unfetch';

const DoctorxPage = (props) => {
  const {survey, error} = props;

  return (
    <React.Fragment>
      <header>
        <HeaderOne title={"Project Doctor x"} isLined={true}/>
      </header>
      {survey !== null && <Doctorx survey={survey}/>}
      {error !== null && <div>{error}</div>}
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
      const res = await fetch(AUTH_API_CALL + '/api/survey');
      const json = await res.json();
      return {survey: json, error: null};
    }
    catch (err) {
      return {survey: null, error: err};
    }
  }
  return {survey: null, error: "empty"};
};

export default DoctorxPage;
