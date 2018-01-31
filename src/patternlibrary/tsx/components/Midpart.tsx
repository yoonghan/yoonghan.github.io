`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import '../../scss/base';
var styles = require('../../scss/components/Midpart');

interface IConcept {
  header: string;
  description: string;
}

export interface MidpartProps {
  conceptArray?: Array<IConcept>;
}

interface MidpartPostContainerProps {
  conceptArray?: Array<IConcept>;
}

export class Midpart extends React.Component<MidpartProps, {}> {
  constructor(props:any) {
    super(props);
  }

  /*
    Background canvas is removed, does not seem to be visibile
    <!--canvas ref="canvasShell"--/>
  componentDidMount() {
    let c = ReactDOM.findDOMNode(this.refs.canvasShell) as HTMLCanvasElement;
    let ctx = c.getContext('2d'),
  		cw = c.width = window.innerWidth,
  		ch = c.height = window.innerHeight,
      d2r = function(degrees:number){
          return degrees * (Math.PI / 180);
      },
      arc = {
        x: cw/2,
        y: ch/2,
        size: 1,
        angle: 1
      },
      draw = function(){
        ctx.save();
        ctx.translate(arc.x, arc.y);
        ctx.rotate(d2r(arc.angle));
        ctx.beginPath();
        ctx.rect(-arc.size/2, -arc.size/2, arc.size, arc.size);
        ctx.lineWidth = arc.size/100;
        ctx.stroke();
        //ctx.fill();

        arc.angle += 4;
        arc.size *= 1.03;
        ctx.restore();
      };

    ctx.strokeStyle = 'rgba(111, 111, 111, .15)';
    var times = 350;
    while(times--){
      draw();
    }
  }
  */

  render() {
    return (
      <div className={styles.midpart}>
        <h2>Overview</h2>
        <MidpartPostContainer conceptArray={this.props.conceptArray}/>
      </div>
    );
  }
}

class MidpartPostContainer extends React.Component<MidpartPostContainerProps, {}> {
  constructor(props:any) {
    super(props);
  }

  createConcept = (conceptMap:IConcept, key:string) => {
    return (
      <div  className={styles['midpartpostcontainer-dialog-deco']} key={key}>
        <div className={styles['midpartpostcontainer-dialog']}>
          <h3>{conceptMap.header}</h3>
          <div>{conceptMap.description}</div>
        </div>
      </div>
    );
  }

  render() {
    var runningNo = 0;
    const {conceptArray} = this.props;
    const conceptElements = conceptArray.map(
      (conceptItem) => {
        const keyVal =  String(runningNo++);
        return this.createConcept(conceptItem, keyVal)
      }
    );

    return (
      <div className={styles.midpartpostcontainer}>
        {conceptElements}
      </div>
    );
  }
}
