
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
      <div className="fab-action-button">
        <svg className="fab-action-button__icon">
          <use xlinkHref="/img/social/social-sprite.svg#action"></use>
        </svg>
      </div>
      <ul className="fab-buttons">
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" target="onnew" href="//www.linkedin.com/in/han-yoong-33755361/">
            <svg className="fab-action-button__icon">
              <use xlinkHref="/img/social/social-sprite.svg#linkedin"></use>
            </svg>
          </a>
        </li>
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" target="onnew" href="//github.com/yoonghan/Walcron">
            <i className="icon-material icon-material_git"></i>
          </a>
        </li>
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" target="onnew" href="//stackoverflow.com/users/3893990/han">
            <svg className="fab-action-button__icon">
              <use xlinkHref="/img/social/social-sprite.svg#so"></use>
            </svg>
          </a>
        </li>
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" target="onnew" href="//www.facebook.com/walcron.coorperation">
            <svg className="fab-action-button__icon">
              <use xlinkHref="/img/social/social-sprite.svg#fb"></use>
            </svg>
          </a>
        </li>
        <li className="fab-buttons__item">
          <a className="fab-buttons__link" onClick={onOpenEmail}>
            <svg className="fab-action-button__icon">
              <use xlinkHref="/img/social/social-sprite.svg#gm"></use>
            </svg>
          </a>
        </li>
      </ul>
      {
        isEmailShown && (<Modal cancelCallback={closeCallback}>
          <EmailSender writeTo={"Walcron Website"} writeFrom={""} />
          </Modal>)
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
            display: flex;
            justify-content: center;
            align-items: center;
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
            width: 40px;
            height: 40px;
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

          .icon-material_git {
            background: url("/img/social/git.png") center no-repeat;
            background-size: 38px;
          }
        `}
      </style>
    </div>
  );
}

export default SocialFabNoSSR;
