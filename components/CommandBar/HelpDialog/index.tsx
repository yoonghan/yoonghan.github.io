`use strict`

/**
  Displaying the dialog for help
  **/

import * as React from "react";
import Modal from "../../Modal";
import HelpContent from "./content";

interface HelpDialogProps {
  cancelCallback: () => void;
}

const HelpDialog: React.SFC<HelpDialogProps> = ({cancelCallback}) => (
  <Modal cancelCallback={cancelCallback}>
    <HelpContent/>
  </Modal>
)

export default HelpDialog;
