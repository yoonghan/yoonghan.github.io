//const PRIMARY_YELLOW = "#FFDE03";
const PRIMARY_BLUE = "#00b4ef";
const LAY_BLUE = "#c4f0f6";
const PRIMARY_PURPLE = "#FF0266";
const PRIMARY_ORANGE = "#FF8400";

export const WHITE = "#FFF";
export const BLACK = "#000";
export const GREY = "#CCC";
export const DARKGREY = "#999";
export const WHITISH = "#BEBEBE";

export const SHADOW = "grey";
export const FOREGROUND = WHITISH;
export const BACKGROUND = BLACK;
export const BACKGROUND_FLOAT = "rgba(20,20,20,0.8)";

export const fontColor = {
  color: WHITE,
  'construction-h1': PRIMARY_PURPLE,
  'construction-h5': BLACK
};

export const background = {
  construction: "#ECEFF1"
}

export const fontFamily = {
  standard: '"Roboto", arial, serif'
}

export const TABLE_HEADER = {
  FOREGROUND: "#FFF",
  BACKGROUND: "#343a40",
  BORDERCOLOR: "#454d55"
}

export const TABLE_BODY = {
  FOREGROUND: "#000",
  BACKGROUND: "#FFF",
  BORDER: "1px solid #dee2e6",
  HOVER_BACKGROUND: "#E9E9E9",
  EVEN_BACKGROUND: "#D9D9D9"
}

export const ERROR = {
  FOREGROUND: "#F90101",
  FONT_SIZE: "1rem"
}

export const OUTPUT = {
  FOREGROUND: "#09F909",
  FONT_SIZE: "1rem"
}

export const LINK = {
  FOREGROUND: WHITE,
  BACKGROUND: BLACK
}

export const DIALOG = {
  FOREGROUND: WHITE,
  BACKGROUND: BLACK
}

export const COOKIEBOX = {
  FOREGROUND: WHITE,
  BACKGROUND: "rgba(50,50,100,0.9)"
}

export const HEADER_TITLE = {
  FOREGROUND: PRIMARY_ORANGE
}

export const SUB_HEADER = {
  FOREGROUND: PRIMARY_BLUE,
  BACKGROUND: LAY_BLUE
}

import css from 'styled-jsx/css'

export default css.global`
.default-animate-height {
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.5s ease-out;
  height: auto;
  width: 100%;
}
.default-animate-height.animate {
  transform: scaleY(1.0);
}
.default-animate-margin {
  margin-top: 100px;
  opacity: 0.5;
  transition: opacity 1s, margin 1s ease-out;
}
.default-animate-margin.animate {
  margin-top: 0;
  opacity: 1.0;
}
.portal-container {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  animation: expandWidth 0.5s;
  overflow: hidden;
}
`
