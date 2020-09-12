`use strict`

import * as React from "react";
import * as d3 from "d3";

const width = 960;
const height = 500;

const RainDrop:React.FC = () => {
  const rainRef = React.useRef<any>();

  React.useEffect(() => {
    d3.timer(function(elapsed) {
      if (elapsed % 5000 < 50) {
        makeItRain(10);
      }
    });
  }, []);

  const rainDrop = (size:number, duration:number, delay:number, x_pos:number, y_pos:number) => {
    const svg = d3.select(rainRef.current);

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

  const makeItRain = (numDrops:number) => {
    for (let i = 0; i < numDrops; i++) {
      const size = 50 * Math.random() + 50,
          duration = 50 * Math.random() + 1750,
          delay = 5000 * Math.random(),
          x_pos = width * Math.random(),
          y_pos = height * Math.random();
      rainDrop(size, duration, delay, x_pos, y_pos);
    }
  }

  return (
    <svg width={width} height={height} ref={rainRef}>
    </svg>
  );
}

export default RainDrop;
