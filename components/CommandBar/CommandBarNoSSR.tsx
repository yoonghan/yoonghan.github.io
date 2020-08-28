import * as React from "react";
import NavMenu from "./NavMenu";
import Logo from "../Logo";
import NoSSRCommandBar from "./NoSSRCommandBar";
import NoSSRMobileMenu from "./NoSSRMobileMenu";

interface CommandBarNoSSRProps {
  disableMobile?: boolean;
  commandPromptOnly?:boolean;
}

const CommandBarNoSSR: React.SFC<CommandBarNoSSRProps> = ({disableMobile, commandPromptOnly}) => {
  return (
    <div className={"header"} id="commandbar">
      <div className={(!commandPromptOnly?"desktop":"") + ((!disableMobile && !commandPromptOnly)? " shift-to-right":"")}>
        <NoSSRCommandBar/>
        {(!disableMobile && !commandPromptOnly) && <NavMenu/>}
      </div>
      {(!disableMobile && !commandPromptOnly) && (<div className="mobile">
        <NoSSRMobileMenu/>
      </div>)}
      {disableMobile && (<Logo/>)}
      <style jsx>{`
        .header {
          text-align: center;
          position: absolute;
          top: 0.5rem;
          left: ${commandPromptOnly? "0": "1.5rem"};
          z-index: 2;
          right: ${commandPromptOnly? "0": "1.5rem"};
        }
        .desktop.shift-to-right {
          position: relative;
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
        }
        .desktop {
          display: block;
        }
        .mobile {
          display: none;
        }
        @media only screen and (max-width: 480px) {
          .mobile {
            display: block;
          }
          .desktop {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default CommandBarNoSSR;
