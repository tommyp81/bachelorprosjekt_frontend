import React from "react";
import "./SideDrawer.css";
import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";

const SideDrawer = (props) => {
  let drawerClasses = "sideDrawer";

  if (props.show) {
    drawerClasses = "sideDrawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">
            <AiFillHome size="22px" /> Hjem
          </a>
        </li>
        <li>
          <a href="/Forum">
            <BsChatDotsFill size="21px" /> Forum
          </a>
        </li>
        <li>
          <a href="/Kunnskapsportalen">
            <HiAcademicCap size="22px" /> Kunnskapsportalen
          </a>
        </li>
        <li>
          <a href="/Login">
            <BsPersonFill size="23px" /> Logg inn
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
