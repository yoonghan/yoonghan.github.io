import React from 'react';
import dynamic from "next/dynamic";

export interface ICardProps {
  id: string;
  link: string;
  title: string;
  desc: string;
  gitLink?: string;
  screenshot?: string;
  usage?: string;
  internal?:boolean;
  imgSrc: string;
}

const CardDescription = dynamic(
  () => import("./CardDescription"),
  { ssr: false }
)

const Card: React.SFC<ICardProps> = (props) => {
  const [showDesc, setShowDesc] = React.useState(false);
  return (
    <React.Fragment>
      <img
        src={props.imgSrc}
        alt={props.title}
        onClick={() => setShowDesc(true)}
        className={"cloverfield_img"}
      />
      <div className={"cloverfield_text"}
        onClick={() => setShowDesc(true)}
      >{props.title}</div>
      <style jsx>{`
        .cloverfield_img {
          display: block;
          width: 100%;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
          background-color: white;
        }
        .cloverfield_text {
          position: absolute;
          bottom: 50%;
          left: 0;
          right: 0;
          text-align: center;
          font-size: .9em;
          color: white;
          padding: 5px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.6);
        }
      `}</style>
      {showDesc &&
        <CardDescription
          {...props}
          callbackClose={()=>setShowDesc(false)}
        />}
    </React.Fragment>
  )
};

export default Card;
