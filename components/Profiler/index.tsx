`use strict`

import * as React from "react";

export interface IProfiler {
  name: string;
  description: JSX.Element;
  imgSrc: string;
}

export interface ProfilerProps {
  profiles: Array<IProfiler>;
}

const _getUser = (idx: number, length: number, name: string, description: JSX.Element, imgSrc: string) => (
  <div className={"user"} key={"user_"+idx}>
    <img src={imgSrc}/>
    <p className={"name"}>{name}</p>
    <div className={"divider"}>------</div>
    {description}
    <style jsx>
      {`
        @media only screen and (min-width: 641px) {
          .user {
            width: ${(100/length)}%;
            padding: 15px;
          }
          .name {
            text-align: center;
            font-weight: bold;
          }
          .divider {
            text-align: center;
          }
          img {
            height: 200px;
            margin: auto;
            display: block;
          }
        }
      `}
    </style>
  </div>
)

const Profiler: React.SFC<ProfilerProps> = ({profiles}) => {
  return (
    <div className="profiler">
      {
        profiles.map((profile, idx) => (
          _getUser(idx, profiles.length, profile.name, profile.description, profile.imgSrc)
        ))
      }
      <style jsx>
        {`
          .profiler {
            display: flex;
            justify-content: space-evenly;
          }
          @media only screen and (max-width: 640px) {
            .profiler {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Profiler;
