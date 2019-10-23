import * as React from "react";


export interface ICommand {
  [s: string]: IAvailableInput;
}

export const AvailableInput:ICommand = {
  "whoami": {
    synonym: ["cd about", "cd /about"],
    description: "Get to know this site."
  }
};
