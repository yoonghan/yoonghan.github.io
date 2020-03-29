import * as React from "react";
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import QRCode from "qrcode";

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: () => Promise<P>
}

const Doctorx: StatelessPage<any> = () => {

  const canvasref = React.useRef(null);
  const toFillUrl = "https://www.walcron.com/doctorx/formfill";

  React.useEffect(()=>{
    if(canvasref !== null && canvasref.current !== null) {
      QRCode.toCanvas(canvasref.current, toFillUrl, function (error) {
        console.error("Canvas generation failed." + error);
      })
    }
  },[]);

  return (
    <React.Fragment>
      <HeaderOne title={"Project Doctor x"} isLined={true}/>
      <canvas ref={canvasref} className="container"/>
      <Footer/>
    </React.Fragment>
  );
}

export default Doctorx;
