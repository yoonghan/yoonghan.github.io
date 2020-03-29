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

const printEvent = (setDisplayState:any, setInfo:any) => (msg:string) => {
  const info = JSON.parse(msg);
  setDisplayState(EnumDisplayState.PRINTABLE);
  setInfo(info);
}

const drawResult = (info: object) => {
  const infos = [];
  for (const property in info) {
    infos.push(<div>{property}: {info[property]}</div>);
  }
  return infos;
}

const print = () => {
  window.print();
}

interface DoctorxProps {
  messengerApi: IWithMessenger;
}

const Doctorx:any = (props: DoctorxProps) => {
  const {messengerApi} = props;
  const canvasref = React.useRef(null);
  const [displayState, setDisplayState] = React.useState(EnumDisplayState.QRCODE);
  const [info, setInfo] = React.useState({});
  const toFillUrl = "https://www.walcron.com/doctorx/formfill";
  const _printSystem = React.useMemo(
    ()=>printSystem(setDisplayState)
    ,[displayState]);;
  const _printEvent = React.useMemo(
    ()=>printEvent(setDisplayState, setInfo)
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
        return <div style={{textAlign:"center", padding: "40px"}}><canvas ref={canvasref} className="container"/></div>
      case EnumDisplayState.CLOSED:
        return <p>Closed due to non activity, to restore refresh the page.</p>
      default:
        return (
          <div style={{padding: "20px 0", fontSize: "15pt", textAlign: "center"}}>
            {drawResult(info)}
            <div>
              <button onClick={print} value="Print">Print</button>
            </div>
          </div>
        );
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
