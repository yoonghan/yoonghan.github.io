import * as React from "react";
import QrReader from "../../components/QrReader";

const Scan:React.SFC<any> = () => {
  return (
    <QrReader callback={(pinno)=>{console.log(pinno, "pin no")}}/>
  );
};

export default Scan;
