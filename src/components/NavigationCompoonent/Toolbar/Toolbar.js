import React from "react";
import "./Toolbar.css";
import logo from "../../../assets/images/BadmintonClubLogo.png";
import ToggleButton from "../SideDrawer/ToggleButton";
import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";

const ToolBar = (props) => {
  return (
    <header className="toolbar">
      <nav className="tnavigation">
        <div className="t-toggle-btn">
          <ToggleButton click={props.handleDrawerToggleClick} />
        </div>
        <div className="tlogo">
          <a href="/">
            <img src={logo} alt="badmintonclub logo" />
          </a>
          <a href="/">Norges Badmintonforbund</a>
        </div>
        <div className="freeSpace" />
        <div className="tNavItems">
          <ul>
            <li>
              <a href="/">Hjem</a>
            </li>
            <li>
              <a href="/Forum">Forum</a>
            </li>
            <li>
              <a href="/Kunnskapsportalen">Kunnskapsportalen</a>
            </li>
            <li>
              <a href="/Login">
                <BsPersonFill size="18px" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default ToolBar;
