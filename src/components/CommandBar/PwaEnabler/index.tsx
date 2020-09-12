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

  function onChangeEnabler() {
    setProcessing(true);
    setEnabled(!isEnabled);
    setLabelText(PROCESS);
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

  React.useEffect(() => {
    checkRegistration();
  }, [])

  React.useEffect(() => {
    if(isProcessing){
      if(isEnabled) {
        register();
      }
      else {
        unregister();
      }
      setTimeout(checkRegistration, 3000);
    }
  },[isEnabled]);

  return (
    <Modal cancelCallback={cancelCallback} ignoreSelfClose={true}>
      <div className={"container"}
        ref={dialogContainerRef}>
        <h4>Progressive Web App</h4>
        <div>
          Enable webpage to be browsed in even when offline.
          As of December 2019 this feature only works on <strong>Chrome and Mozilla</strong> browsers.
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
