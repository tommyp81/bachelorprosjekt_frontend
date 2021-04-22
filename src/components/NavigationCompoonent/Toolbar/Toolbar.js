import React from "react";
import "./Toolbar.css";
import logo from "../../../assets/images/BadmintonClubLogo.png";
import ToggleButton from "../SideDrawer/ToggleButton";
import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";

const ToolBar = (props) => {
  return (
    <header className="toolbar">
      <nav className="tnavigation">
        <div className="t-toggle-btn">
          <ToggleButton click={props.handleDrawerToggleClick} />
        </div>
        <div className="tlogo">
          <Link to="/">
            <img src={logo} alt="badmintonclub logo" />
          </Link>
          <a href="/">Norges Badmintonforbund</a>
        </div>
        <div className="freeSpace" />
        <div className="tNavItems">
          <ul>
            <li>
              <Link to="/">
                <AiFillHome size="20px" /> Hjem
              </Link>
            </li>
            <li>
              <Link to="/Forum">
                <BsChatDotsFill size="18px" /> Forum
              </Link>
            </li>
            <li>
              <Link to="/Kunnskapsportalen">
                <HiAcademicCap size="23px" /> Kunnskapsportalen
              </Link>
            </li>
            <li>
              <Link to="/Login">
                <BsPersonFill size="20px" /> Logg Inn
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default ToolBar;
