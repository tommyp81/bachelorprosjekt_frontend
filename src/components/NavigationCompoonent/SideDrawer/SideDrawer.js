import React from "react";
import "./SideDrawer.css";
import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";

const SideDrawer = (props) => {
  let drawerClasses = "sideDrawer";

  if (props.show) {
    drawerClasses = "sideDrawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <Link to="/" onClick={props.toggle}>
            <AiFillHome size="22px" /> Hjem
          </Link>
        </li>
        <li>
          <Link to="/Forum" onClick={props.toggle}>
            <BsChatDotsFill size="21px" /> Forum
          </Link>
        </li>
        <li>
          <Link to="/Kunnskapsportalen" onClick={props.toggle}>
            <HiAcademicCap size="22px" /> Kunnskapsportalen
          </Link>
        </li>
        <li>
          <Link to="/Login" onClick={props.toggle}>
            <BsPersonFill size="23px" /> Logg inn
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
