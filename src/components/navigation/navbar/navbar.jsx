import React from "react";
import styled from "styled-components";
import { HamburgerMenu } from "../hamburgerMenu/HamburgerMenu";
import Brand from '../../brand/Brand';
import Logo from '../../logo/Logo';  

// row-revers to have hamburger icon at the right side.
const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #002258;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  
`;

export function Navbar(props) {
  return (
    <NavbarContainer>
      <Logo />
      <Brand/>
      <HamburgerMenu />
    </NavbarContainer>
  );
}