import React from "react";
import styled from "styled-components";
import { HamburgerMenu } from "../hamburgerMenu/HamburgerMenu";
import Brand from '../../brand/Brand';
import Logo from '../../logo/Logo';  

// row-revers to have hamburger icon at the right side.
//make the navbar sticky position: fixed; top: 0; left: 0;
//z-index: 110; for taking sidenav over content 
const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #0b2c63;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 110;
  position: sticky;
  top: 0;
 
`;

export function Navbar(props) {
  return (
    <NavbarContainer >
      <Logo />
      <Brand/>
      <HamburgerMenu />
    </NavbarContainer>
  );
}