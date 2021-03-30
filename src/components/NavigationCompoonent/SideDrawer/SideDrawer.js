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
            <AiFillHome /> Hjem
          </a>
        </li>
        <li>
          <a href="/Forum">
            <BsChatDotsFill /> Forum
          </a>
        </li>
        <li>
          <a href="/Kunnskapsportalen">
            <HiAcademicCap /> Kunnskapsportalen
          </a>
        </li>
        <li>
          <a href="/Login">
            <BsPersonFill /> Logg inn
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
