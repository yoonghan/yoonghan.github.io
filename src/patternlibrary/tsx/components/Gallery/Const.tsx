`use strict`

/**
 * Added react Context, but this feature is not ready with typescript.
 **/
import * as React from "react";

export const GalleryContext = React.createContext('gallery');

export interface Item {
  title: string;
  imgSrc: string;
  nature: Array<string>;
  key: string;
  desc: string;
}

export const LEAVE_TIME = 100;
