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
    <img src={imgSrc} alt={name}/>
    <p className={"name"}>{name}</p>
    <div className={"divider"}>------</div>
    {description}
    <style jsx>
      {`
        .user {
          padding: 30px;
        }

        .name {
          font-weight: bold;
        }

        img {
          height: 200px;
          margin: auto;
          display: block;
        }

        @media only screen and (min-width: 641px) {
          .user {
            width: ${(100/length)}%;
            padding: 15px;
          }
          .name {
            font-weight: bold;
            text-align: center;
          }
          .divider {
            text-align: center;
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
