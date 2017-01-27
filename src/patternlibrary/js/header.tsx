`use strict`

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Header } from "./components/Header";

const menuItems = [
{location: '#', label:'BLOG' , icon:'camera-retro'},
{location: '#', label:'PORTFOLIO' , icon:'superpowers'}
];

ReactDOM.render(
    <Header menus={menuItems} headerTitle={'A DEVELOPER SITE'}/>,
    document.getElementById("header")
);
