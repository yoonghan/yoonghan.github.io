`use strict`

import * as React from "react";
import {RotatingIconProps, RotatingIcon} from './RotatingIcon';

interface IConcept {
  header: string;
  description: string;
}

export interface MiniPostProps extends RotatingIconProps {
  title: string;
  text: string;
  titlePost?: boolean;
  concept?: Array<IConcept>;
}

export const MiniPost: React.SFC<MiniPostProps> = (props) => {

  function _createConcept(conceptMap:IConcept, key:string) {
    return (
      <li key={key}>
        <span>{conceptMap.header}</span> - {conceptMap.description}
      </li>
    );
  };

  function _getTitlePost() {
    const {title, titlePost} = props;
    return titlePost ? (<h2>{title}</h2>): (<h4>{title}</h4>);
  }

  const {text, concept, icon} = props;
  const conceptArray = concept ? concept : [];
  const conceptElement = conceptArray.map(
    (conceptItem, idx) => {
      const keyVal = "minipost_" + String(idx);
      return _createConcept(conceptItem, keyVal)
    }
  );

  return (
    <div className={"minipost"}>
      <div className={'minipost-hdr'}>
        <RotatingIcon icon={icon}/>
      </div>
      <div className={'minipost-itm'}>
        {_getTitlePost()}
        <span dangerouslySetInnerHTML={{__html: text}}></span>
        {concept &&
          <ul>{conceptElement}</ul>
        }
      </div>
      <style jsx global>{`
        .minipost h2 {
          color: $color-minipost-header-foreground;
          font-style: italic;
          margin-bottom: 10px;
        }

        .minipost {
          padding: 25px 0 25px 0;
        }

        .minipost .minipost-hdr {
          display: block;
          margin-bottom: 5px;
        }

        .minipost .minipost-hdr i {
          font-size: 20pt;
        }

        .minipost .minipost-itm {
          border-left: 3px solid #000;
          margin-left: 11px;
          padding: 5px 10px;
          text-align: justify;
        }


        .minipost .minipost-itm h4 {
          font-style: italic;
          margin-bottom: 10px;
          text-align: center;
        }

        .minipost .minipost-itm h4::before, .minipost .minipost-itm h4::after{
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 5px;
          height: 1px;
          background: #c0d3da;
          margin: 0 5px;
        }

        .minipost .minipost-itm li span:first-child {
          font-weight: bold;
          font-style: italic;
        }

        .minipost .minipost-itm li span {
          padding-top: 5px;
        }
      `}</style>
    </div>
  );
}
