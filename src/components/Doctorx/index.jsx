import * as React from "react";
import QRCode from "qrcode";
import { compose } from 'redux';
import withMessenger, { IWithMessenger } from "../../hoc/withMessenger";

const printSystem = (setDisplayState) => (msg) => {
  console.log(msg, "connection status");
  if(msg === "Disconnected") {
    setDisplayState("CLOSED");
  }
}

const printEvent = (setDisplayState, setInfo) => (msg) => {
  const info = JSON.parse(msg);
  setDisplayState("PRINTABLE");
  setInfo(info);
}

const drawResult = (info, survey) => {
  console.log(survey);
  const {imgLocation, phone, fax, address, consensus, declaration} = survey;
  return (
    <div className="alignment">
      <table>
        <tbody>
          <tr>
            <td rowSpan={3}>
              <img src={imgLocation} alt={'location'}/>
            </td>
            <td>
              {address}
            </td>
          </tr>
          <tr>
            <td>
              {phone}
            </td>
          </tr>
          <tr>
            <td>
              {fax}
            </td>
          </tr>
        </tbody>
      </table>
      {drawInfo(info)}
      <ol>
        <li>{consensus}</li>
        <li>{declaration}</li>
      </ol>
      <style jsx>{`
        table {
          margin: auto;
        }
        img {
          width: 100px;
          height: auto;
        }
        ol,.alignment {
          text-align: left;
        }
      `}</style>
    </div>
  )
}

const drawInfo = (info) => {
  const infos = [];
  for (const property in info) {
    infos.push(<div>{property}: {info[property]}</div>);
  }
  return infos;
}

const print = () => {
  window.print();
}

const Doctorx = (props) => {
  const {messengerApi, survey} = props;
  const canvasref = React.useRef(null);
  const canvas2ref = React.useRef(null);
  const [displayState, setDisplayState] = React.useState("QRCODE");
  const [info, setInfo] = React.useState({});
  const toFillUrl = "https://www.walcron.com/doctorx/formfill";
  const toFillGoogleUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeFqSnCnMQG9T8481HHhEwidLzgwefnfh3vUVebHpH0BfNYyA/viewform";
  const _printSystem = React.useMemo(
    ()=>printSystem(setDisplayState)
    ,[displayState]);
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
    if(canvas2ref !== null && canvas2ref.current !== null) {
      QRCode.toCanvas(canvas2ref.current, toFillGoogleUrl, function (error) {
        console.error("Canvas generation failed." + error);
      })
    }
  },[]);

  const _displayBody = () => {
    switch(displayState) {
      case "QRCODE":
        return (
          <div style={{display:"flex", flexDirection: "row"}}>
            <div>
              <span>CUSTOM Form</span>
              <div style={{textAlign:"center", padding: "40px"}}>
                <canvas ref={canvasref} className="container"/>
              </div>
            </div>
            <div>
              <span>GOOGLE Form</span>
              <div style={{textAlign:"center", padding: "40px"}}>
                <canvas ref={canvas2ref} className="container"/>
              </div>
            </div>
            <div>
              <span>NOT SCANNABLE Form</span>
              <div style={{textAlign:"center", padding: "40px"}}>
                <img src="https://i.pinimg.com/474x/d6/b1/b6/d6b1b6a619fdbbc777196a277c0fa049.jpg" style={{width:"200px"}} alt="location"/>
              </div>
            </div>
          </div>)
      case "CLOSED":
        return <p>Closed due to non activity, to restore refresh the page.</p>
      default:
        return (
          <div style={{padding: "20px 0", fontSize: "15pt", textAlign: "center"}}>
            {drawResult(info, survey)}
            <div className="printhidden">
              <button onClick={print} value="Print">Print</button>
            </div>
          </div>
        );
    }
  }

  return (
    <React.Fragment>
      { _displayBody() }
    </React.Fragment>
  );
}

const mapMessengerApi = (result) => ({messengerApi: result});

export default compose(
  withMessenger(mapMessengerApi, true)
)(Doctorx);
