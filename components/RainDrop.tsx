`use strict`

import * as React from "react";
import * as d3 from "d3";

export interface RainDropProps {
}

export class RainDrop extends React.PureComponent<RainDropProps, {}> {
  private width = 960;
  private height = 500;
  private rainRef = React.createRef<svg>();

  constructor(props:any) {
    super(props);
  };

  componentDidMount() {
    const self = this;
    d3.timer(function(elapsed) {
        if (elapsed % 5000 < 50) {
          self.makeItRain(10);
        }
    });
  }

  rainDrop = (size:number, duration:number, delay:number, x_pos:number, y_pos:number) => {
    const svg = d3.select(this.rainRef.current);

    const drop = svg.append("circle")
            .attr("cx", x_pos)
            .attr("cy", y_pos)
            .attr("r", 0)
            .attr("stroke", "#5FC3E4")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("opacity", 1);

    drop.transition()
      .delay(delay)
      .duration(duration)
      .attr("r", size)
      .attr("stroke-width", 0)
      .attr("opacity", 0.5)
      .ease(d3.easeCubicInOut);
  }

  makeItRain = (numDrops:number) => {
    for (let i = 0; i < numDrops; i++) {
      const size = 50 * Math.random() + 50,
          duration = 50 * Math.random() + 1750,
          delay = 5000 * Math.random(),
          x_pos = this.width * Math.random(),
          y_pos = this.height * Math.random();
      this.rainDrop(size, duration, delay, x_pos, y_pos);
    }
  }

  render() {
    const {width, height} = this;
    return (
      <svg width={width} height={height} ref={this.rainRef}>
      </svg>
    );
  }
}
