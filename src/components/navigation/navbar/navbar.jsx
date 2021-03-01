import React  from "react";

import { HamburgerMenu } from "../hamburgerMenu/HamburgerMenu";
import Brand from '../../brand/Brand';
import Logo from '../../logo/Logo';  
import "./navbar.css"


export function Navbar(props) {
  return (
    <div className="navbarContainerstyle" >
      <Logo />
      <Brand/>
      <HamburgerMenu />
    </div>
  );
}