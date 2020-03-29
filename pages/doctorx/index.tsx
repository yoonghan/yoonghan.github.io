import * as React from "react";
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import QRCode from "qrcode";
import { compose } from 'redux';
import withMessenger, { IWithMessenger } from "../../hoc/withMessenger";

enum EnumDisplayState {
  QRCODE,
  PRINTABLE,
  CLOSED
};

const printSystem = (setDisplayState:any) => (msg:string) => {
  if(msg === "Disconnected") {
    setDisplayState(EnumDisplayState.CLOSED);
  }
}

const printEvent = (setDisplayState:any) => (msg:string) => {
  setDisplayState(EnumDisplayState.PRINTABLE);
  const info = JSON.parse(msg);
  console.log(info);
}

interface DoctorxProps {
  messengerApi: IWithMessenger;
}

const Doctorx:any = (props: DoctorxProps) => {
  const {messengerApi} = props;
  const canvasref = React.useRef(null);
  const [displayState, setDisplayState] = React.useState(EnumDisplayState.QRCODE);
  const toFillUrl = "https://www.walcron.com/doctorx/formfill";
  const _printSystem = React.useMemo(
    ()=>printSystem(setDisplayState)
    ,[displayState]);;
  const _printEvent = React.useMemo(
    ()=>printEvent(setDisplayState)
    ,[displayState]);

  React.useEffect(()=>{
    messengerApi.connect("doctorx", _printSystem, _printEvent);
    if(canvasref !== null && canvasref.current !== null) {
      QRCode.toCanvas(canvasref.current, toFillUrl, function (error) {
        console.error("Canvas generation failed." + error);
      })
    }
  },[]);

  const _displayBody = () => {
    switch(displayState) {
      case EnumDisplayState.QRCODE:
        return <canvas ref={canvasref} className="container"/>;
      case EnumDisplayState.CLOSED:
        return <p>Closed due to non activity, to restore refresh the page.</p>
      default:
        return <div>test</div>
    }
  }


  return (
    <React.Fragment>
      <HeaderOne title={"Project Doctor x"} isLined={true}/>
      { _displayBody() }
      <Footer/>
    </React.Fragment>
  );
}

const mapMessengerApi = (result:any) => ({messengerApi: result});

export default compose(
  withMessenger(mapMessengerApi, true)
)(Doctorx);
