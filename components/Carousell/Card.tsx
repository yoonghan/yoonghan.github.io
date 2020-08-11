import * as React from "react";
import CardDescription from "./CardDescription";

interface ICardProps{
  desc: string;
  title: string;
  link: string;
  gitLink?: string;
  usage?: string;
  internal?:boolean;
  imgSrc?: string;
}

const Card:React.FC<ICardProps> = (elem) => {
  const [showDesc, setShowDesc] = React.useState(false);

  return (
    <div onClick={()=>setShowDesc(true)} className="clicker">
      <figure>
        <img src={elem.imgSrc} />
        <figcaption>{elem.title}</figcaption>
      </figure>
      {showDesc &&
        <CardDescription
          desc={elem.desc}
          title={elem.title}
          link={elem.link}
          gitLink={elem.gitLink}
          usage={elem.usage}
          internal={elem.internal}
          callbackClose={()=>setShowDesc(false)}
        />}
        <style jsx>{`
          .clicker {
            cursor: pointer
          }
          figure {
            margin-inline-start: 1rem;
            margin-inline-end: 1rem;
          }
          `}</style>
    </div>
  )
}

export default Card;
