`use strict`

import * as React from "react";
import Toggle from 'react-toggle';
import Modal from "../../Modal";
import { register, unregister } from 'next-offline/runtime';
import {DIALOG, SHADOW} from "../../../shared/style";

interface PwaEnablerProps {
  cancelCallback: () => void;
}

const dialogContainerRef = React.createRef<HTMLDivElement>();
const DISABLED = "  Disabled"; //count text.
const ENABLED = " Installed";
const PROCESS = "Processing";


const PwaEnabler:React.FC<PwaEnablerProps> = ({cancelCallback}) => {
  const [isProcessing, setProcessing] = React.useState(false);
  const [labelText, setLabelText] = React.useState(DISABLED);
  const [isEnabled, setEnabled] = React.useState(false);
  const [isShowSafariMsg, setShowSafariMsg] = React.useState(false);

  function onChangeEnabler() {
    setProcessing(true);
    setEnabled(!isEnabled);
    setLabelText(PROCESS);
  }

  const _isSafariBrowserViaJs = () => {
    return /constructor/i.test((window['HTMLElement'] as any)) || ((p): boolean => {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!(window['safari'] as any) || (window['safari'] as any).pushNotification);
  }

  const _isIOSJs = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function getRegistration() {
    const domain = window.location.hostname;
    if(navigator && navigator.serviceWorker) {
      return navigator.serviceWorker.getRegistration(domain);
    }
    else {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  async function checkRegistration() {
    const isRegistered = await getRegistration();

    if(!isRegistered) {
      const domain = window.location.origin;
      //Clear residues of cache in browser, hence next refresh are up-to-date.
      const workboxCache = await caches.open(`workbox-precache-v2-${domain}/`);
      const workboxCacheKeys = await workboxCache.keys();
      workboxCacheKeys.map(workboxCacheKey => {
        workboxCache.delete(workboxCacheKey);
      });
    }
    const isEnabled = (isRegistered && (isRegistered as any).scope) ? true: false;
    setProcessing(false);
    setEnabled(isEnabled);
    setLabelText(isEnabled? ENABLED: DISABLED);
  }

  const addToShortcutEvent = (e:any) => {
    e.preventDefault();
    e.prompt();
  };

  React.useEffect(() => {
    checkRegistration();

    window.addEventListener('beforeinstallprompt', addToShortcutEvent);

    return () => {
      window.removeEventListener('beforeinstallprompt', addToShortcutEvent);
    }
  }, []);

  React.useEffect(() => {
    if(isProcessing){
      if(isEnabled) {
        (register as any)();
        _drawMessageForSafari();
      }
      else {
        (unregister as any)();
      }
      setTimeout(checkRegistration, 3000);
    }
  },[isEnabled]);

  const _drawMessageForSafari = () => {
    if(_isSafariBrowserViaJs() || _isIOSJs()) {
      setShowSafariMsg(true);
    }
  }

  const _showSafariMsg = () => {
    if(isShowSafariMsg) {
      return (
        <div className={'safari-container'}>
          For Safari mobile users, follow these steps.
          <ol>
            <li>Tap on <img src="/pwa/safari-share.png" className='icon'/> "Share" icon.</li>
            <li>Then select "Add Home Screen".</li>
          </ol>
          <style jsx>{`
            .icon {
              width: auto;
              height: 20px;
            }
            .safari-container {
              margin-top: 20px;
              border-top: 1px solid;
              padding-top: 20px;
              opacity: 1;
              animation: fadein 2s linear;
            }

            @keyframes fadein{
              0% { opacity:0; }
              100% { opacity:1; }
            }
          `}</style>
        </div>
      );
    }
    else {
      return <React.Fragment />
    }
  }

  return (
    <Modal cancelCallback={cancelCallback} ignoreSelfClose={true}>
      <div className={"container"}
        ref={dialogContainerRef}>
        <h4>Progressive Web App</h4>
        <div>
          Enable webpage to be browsed in even when offline.
          As of December 2019 this feature only works on <strong>Chrome and Mozilla</strong> browsers.
          <br/><br/>
          For <strong>Safari</strong> browsers, you are required to click add to homescreen manually.
        </div>

        <div className={"toggle-container"}>
          <label>
            <Toggle
              id="toggle-pwa"
              disabled={isProcessing}
              checked={isEnabled}
              onChange={onChangeEnabler} />
            <span className={"label-text"}>{labelText}</span>
          </label>
        </div>
        {_showSafariMsg()}
        <style jsx>
        {`
          .container {
            padding: 10px 10px 2rem 10px;
            color: ${DIALOG.BACKGROUND};
            background: ${DIALOG.FOREGROUND};
            box-shadow: 5px 5px 2px ${SHADOW};
          }
          .toggle-container {
            text-align: center;
            margin-top: 2rem;
          }
          .label-text {
            margin-left: 1rem;
            vertical-align: middle;
            font-weight: normal;
            margin-bottom: 0;
          }
        `}
        </style>
      </div>
    </Modal>
  )
}

export default (PwaEnabler);
