
`use strict`

import * as React from "react";
import Modal from "../Modal";
import EmailSender from "../LetterBox/EmailSender";

export interface SocialFabNoSSRProps {
}

const SocialFabNoSSR: React.SFC<SocialFabNoSSRProps> = ({}) => {
  const [isEmailShown, setEmailShown] = React.useState(false);

  function onOpenEmail() {
    setEmailShown(true);
  }

  function closeCallback() {
    setEmailShown(false);
  }

  return (
    <div className="fab">
      <span className="fab-action-button">
          <i className="fab-action-button__icon"></i>
      </span>
      <ul className="fab-buttons">
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" target="onnew" href="https://www.facebook.com/walcron.coorperation">
            <i className="icon-material icon-material_fb"></i>
          </a>
        </li>
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" onClick={onOpenEmail}>
            <i className="icon-material icon-material_gm"></i>
          </a>
        </li>
      </ul>
      {
        isEmailShown && <Modal cancelCallback={closeCallback}><EmailSender writeTo={"Walcron Website"}/></Modal>
      }
      <style jsx>
        {`
          a:hover {
            cursor: pointer;
          }

          .fab {
            position: fixed;
            width: 56px;
            right: 15px;
            bottom: 15px;
            margin-left: -28px;
          }

          .fab:hover .fab-buttons {
            opacity: 1;
            visibility: visible;
          }

          .fab:hover .fab-buttons__link {
            transform: scaleY(1) scaleX(1) translateY(-16px) translateX(0px);
          }

          .fab-action-button:hover + .fab-buttons .fab-buttons__link:before {
            visibility: visible;
            opacity: 1;
            transform: scale(1);
            transform-origin: right center 0;
            transition-delay: 0.3s;
          }

          .fab-action-button {
            position: absolute;
            bottom: 0;
            display: block;
            width: 56px;
            height: 56px;
            background-color: #000;
            border-radius: 50%;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          }

          .fab-buttons {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 30px;
            list-style: none;
            margin: 0;
            padding: 0;
            opacity: 0;
            visibility: hidden;
            transition: 0.2s;
          }

          .fab-action-button__icon {
            display: inline-block;
            width: 56px;
            height: 56px;
            background: url("/static/img/social/action.svg#action") center no-repeat;
          }

          .fab-buttons__item {
            display: block;
            text-align: center;
            margin: 12px 0;
          }

          .fab-buttons__link {
            display: inline-block;
            width: 40px;
            height: 40px;
            text-decoration: none;
            background-color: #ffffff;
            border-radius: 50%;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            transform: scaleY(0.5) scaleX(0.5) translateY(0px) translateX(0px);
            -moz-transition: .3s;
            -webkit-transition: .3s;
            -o-transition: .3s;
            transition: .3s;
          }

          .icon-material {
            display: inline-block;
            width: 40px;
            height: 40px;
          }

          .icon-material_fb {
            background: url("/static/img/social/fb.svg") center no-repeat;
          }

          .icon-material_gm {
            background: url("/static/img/social/gm.svg") center no-repeat;
          }

          .icon-material_li {
            background: url("/static/img/social/linkedin.svg") center no-repeat;
          }
        `}
      </style>
    </div>
  );
}

export default SocialFabNoSSR;
