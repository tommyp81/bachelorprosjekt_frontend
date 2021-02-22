//codes in Here are related to the pop-up menu.

//npm i --save @fortawesome/free-solid-svg-icons
//npm i --save @fortawesome/fontawesome-svg-core
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
//npm install --save @fortawesome/react-fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//npm install framer-motion --save
import { motion } from "framer-motion";
import React  from "react";
import { useState } from "react";
import styled from "styled-components";
import BLogin from "../../loginComponents/Login";
import { MenuToggle } from "./menuToggle";
import { NavMenu } from "./navMenu";




//main wrapper that holds hamburger icon
const HamburgerMenuContainer = styled.div`
  display: flex;
  margin: 30px;
`;

//Hamburger icon
const HamburgerIcon = styled.div`
    color: ${({ reverseColor }) => (reverseColor ? "#000" : "#fff")};
    cursor: pointer;
    z-index: 99;
    transition: all 250ms ease-in-out;
    flex-direction: row-reverse;
    
`;
// min-width for working good in mobile devices

const MenuContainer = styled(motion.div)`
  min-width: 300px;
  width: 100%;
  max-width: 44%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 2px rgba(15, 15, 15, 0.3);
  z-index: 90;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(4em);
  user-select: none;
  padding: 1em 2.5em;
  
 

`;

//for the loggin and sign up part on the hamburgerMenu pop-up box
//loggin on the pop-up menu 
const TopContainer = styled.div`
  display: flex;
  width: 100%;
`;
//for the loggin icon on the pop-up menu
const IconContainer = styled.div`
  font-size: 16px;
  color: #555;
  padding-right: 5px;
`;

const LoginButton = styled(motion.button)`
  border: 0;
  background: transparent;
  color: #555;
  font-size: 14px;
  font-weight: 900;
  transition: all 250ms ease-in-out;
  display: flex;
  cursor: pointer;
  padding: 5px 12px;
  &:hover {
    color: #888;
  }
  &:focus {
    outline: none;
  }
  &:not(:last-of-type) {
    border-right: 1px solid #b4b4b4;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  
  }
`;



//animation for opening and closing the HamburgerMenu.
//we have to have translatex in the manuContainer in the css-style
const menuVariants = {
  open: {
    transform: "translateX(3%)",
  },
  closed: {
    transform: "translateX(103%)",
  },
};
// we are using spring animation with duration 1 fro coming out pop-up box hamburgerMenu
const menuTransition = {
  type: "spring",
  duration: 1,
  stiffness: 33,
  delay: 0.1,
};

const commonVariants = {
  show: {
    transform: "translateX(0em)",
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.01,
    },
  },
  hide: {
    transform: "translateX(5em)",
    opacity: 0,
  },
};


const commonTransition = { type: "spring", duration: 0.05 };

export function HamburgerMenu(props) {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <HamburgerMenuContainer>
      <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
      <MenuContainer
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={menuTransition}
      >
        <TopContainer>
          <LoginButton
            initial={false}
            animate={isOpen ? "show" : "hide"}
            variants={commonVariants}
            transition={commonTransition}
          >
            <IconContainer>
              <FontAwesomeIcon icon={faUserCircle} />
            </IconContainer>
              <a href="/Login" component={BLogin}>Logg Inn</a>
             
          </LoginButton>
          <LoginButton
            initial={false}
            animate={isOpen ? "show" : "hide"}
            variants={commonVariants}
            transition={commonTransition}
            
          >
            <a>Ny Bruker?</a>
          </LoginButton>
        </TopContainer>
        <ContentContainer>
          <NavMenu isOpen={isOpen} />
        </ContentContainer>
      </MenuContainer>
    </HamburgerMenuContainer>
  );
}