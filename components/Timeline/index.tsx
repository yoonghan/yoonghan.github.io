`use strict`

import * as React from "react";

interface ITimeline {
  events: Array<IEvent>;
}

interface IEvent {
  date: string;
  special?: string;
  desc: string;
  faIcon?: string;
}

const Timeline:React.FC<ITimeline> = ({events}) => {

  const _createLinks = () => {
    return events.map((event, i) => (
      <li className="container" key={`timeline_${i}`}>
        <span></span>
        <span>
          {event.faIcon && <i className={`icon ${event.faIcon}`}></i>}
          {!event.faIcon && <i className={`dot`}></i>}
        </span>
        <div className="content">
          <p><strong>{event.date}</strong></p>
          {event.special && <p>[{event.special}]</p>}
          <p>{event.desc}</p>
        </div>
        <style jsx>{`
          .container {
            padding-left: 22px;
            position: relative;
            text-align: left;
          }
          .icon {
            position: absolute;
            background: #fff;
            top: 0;
            left: -2px;
            border: 2px solid #ddd;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            padding-top: 9px;
            color: #999;
            margin-left: -13px;
          }
          .dot {
            position: absolute;
            top: 5px;
            left: 0;
          }
          .dot::before {
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            background-color: #858b94;
            border-radius: 50%;
          }
          .container:first-child > span:first-child {
            top: 5px;
          }
          .container:last-child > span:first-child {
            bottom: 30px;
          }
          .container:last-child .icon {
            background: rgb(21, 178, 21);
            color: rgb(255, 255, 255);
          }
          .container > span:first-child {
            top: 0;
            left: 4px;
            position: absolute;
            bottom: 0;
            width: 2px;
            background-color: #858b94;
          }
          .container > span:nth-child(2) {
            left: 0;
            text-align: center;
            position: absolute;
            top: 5px;
          }
          .container > .content {
            padding-bottom: 18px;
            margin-left: 24px;
          }
          .container > .content p {
            margin: 0;
            font-size: 0.75rem;
          }
          `}</style>
      </li>
    ))
  }

  return (
    <ul className="container">
      {_createLinks()}
      <style jsx>{`
        .container {
          list-style: none;
          padding: 0;
          margin-bottom: 0;
          direction: ltr;
          margin-left: 20px;
        }
        `}</style>
    </ul>
  )
}

export default Timeline;
