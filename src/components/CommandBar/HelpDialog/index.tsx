`use strict`

/**
  Displaying the dialog for help
  **/

import * as React from "react";
import Modal from "../../Modal";
import HelpContent from "./content";

interface HelpDialogProps {
  cancelCallback: () => void;
  specialInputCallback: (input:string) => void;
}

const HelpDialog: React.SFC<HelpDialogProps> = ({cancelCallback, specialInputCallback}) => {
  const _updateSelectedInput = (input:string) => {
    specialInputCallback(input);
  }

  return (
    <Modal cancelCallback={cancelCallback} ignoreSelfClose={true}>
      <HelpContent updateSelectedInput={_updateSelectedInput}/>
    </Modal>
  );
}

export default HelpDialog;
