import React, { useContext } from "react";
import "./SideDrawer.css";
import { UserContext } from "../../../UserContext";
import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill, BsBoxArrowLeft } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";

const SideDrawer = (props) => {

  const {user} = useContext(UserContext)
  
  let drawerClasses = "sideDrawer";

  if (props.show) {
    drawerClasses = "sideDrawer open";
  }

  return (
    <nav className={drawerClasses}>
      <div className="user">
        <BsPersonFill size="50px" /><br/> <b>{user.username}</b><br/>
        {user.firstName} {user.lastName}<br/>
        {user.email}<br/>
        {user.admin && <Link to="/Admin">Administrer brukere</Link>}
      </div>
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
          <Link to="/Login" onClick={props.logout}>
            <BsBoxArrowLeft size="22px" /> Logg ut
          </Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default SideDrawer;
