`use strict`

/**
  Menu is created with performance consideration where state is not used instead using classList remove/add.
  **/

import * as React from "react";
import {BLACK, WHITE, GREY, DARKGREY} from "../../shared/style";
import {fontFamily} from "../../shared/style";
import {MenuItem} from "./MenuItem";

export interface MenuProps {
  whiteOnBlack?: boolean;
  menuItems: Array<JSX.Element>;
}

export default class Menu extends React.PureComponent<MenuProps, {}> {
  private menuTriggerSize = 767;
  private menuRef = React.createRef<HTMLUListElement>();
  private mobileMenuRef = React.createRef<HTMLSpanElement>();
  private documentBackgroundElement?:HTMLElement;

  constructor(props:MenuProps) {
    super(props);
  };

  _drawMenuItem = (menuItem:JSX.Element, index:number) => {
    return <MenuItem
      key={"menu_menuItem_" + index}
      whiteOnBlack={this.props.whiteOnBlack}
      menuTriggerSize={this.menuTriggerSize}
      childNumber={index}
      totalChild={this.props.menuItems.length}
    >{menuItem}</MenuItem>;
  }

  _drawMenus = () => {
    return this.props.menuItems.map(this._drawMenuItem);
  }

  _click_Menu = () => {
    if(this.menuRef.current) {
      if(!this.menuRef.current.classList.contains("show")) {
        this.menuRef.current.classList.add("show");
        document.body.classList.add("mobile-modal");
      }
      else {
        this.menuRef.current.classList.remove("show");
        document.body.classList.remove("mobile-modal");
      }
    }
  }

  _click_doc_layout = (e:Event) => {
    const target:HTMLElement = e.target as HTMLElement;
    if(this.mobileMenuRef.current && !this.mobileMenuRef.current.contains(target) &&
        this.menuRef.current && this.menuRef.current.classList.contains("show")){
      this._click_Menu();
    }
  }

  componentWillMount() {
    if ((process as any).browser){
      document.addEventListener('click', this._click_doc_layout, false);
      this.documentBackgroundElement = document.createElement("DIV");
      this.documentBackgroundElement.className = "menu-background";
      document.body.appendChild(this.documentBackgroundElement);
    }
  }

  componentWillUnmount() {
    if ((process as any).browser){
      document.removeEventListener('click', this._click_doc_layout, false);
      if(this.documentBackgroundElement) {
        document.body.removeChild(this.documentBackgroundElement);
      }
    }
  }

  render() {
    const {whiteOnBlack} = this.props;
    return (
      <React.Fragment>
        <nav className={"menu"}>
          <span className={"nav-toggle"} onClick={this._click_Menu} ref={this.mobileMenuRef}>
            Menu
          </span>
          <ul ref={this.menuRef}>
            {this._drawMenus()}
          </ul>
        </nav>
        <style jsx global>{`
          @media screen and (max-width: ${this.menuTriggerSize}px){
            body.mobile-modal .menu-background {
              position: absolute; top: 0; bottom: 0; right: 0; left: 0; background: rgba(0,0,0,0.3); z-index: 999
            }
          }
          `}
        </style>
        <style jsx>{`
          .menu {
            background: ${whiteOnBlack ? 'rgba(0,0,0,0.4)': 'none'};
          }
          .menu a, .menu span {
            text-decoration: none;
            color: ${whiteOnBlack ?  WHITE: BLACK};
            font-family: ${fontFamily.standard};
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: -0.02em;
            word-wrap: break-word;
            user-select: none;
            z-index: 1000;
          }
          .menu a:hover {
            color: ${whiteOnBlack ?  GREY: DARKGREY};
          }
          .menu .nav-toggle {
            display: none;
          }
          .menu ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
          }
          @media screen and (max-width: ${this.menuTriggerSize}px) {
            .menu {
              background-color: ${BLACK};
              color: ${WHITE};
            }

            .menu .nav-toggle {
              display: inline-block;
              cursor: pointer;
              position: relative;
            }

            .menu ul {
              flex: 0 1 100%;
              max-height: 0;
              opacity: 0;
              position: relative;
              overflow: hidden;
            }

            .menu ul.show {
              display: block;
              opacity: 1;
              overflow: visible;
            }

            .menu a, .menu span {
              color: ${WHITE};
            }
          }
        `}</style>

      </React.Fragment>
    );
  }
}
