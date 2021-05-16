import React, { useContext } from "react";
import "./SideDrawer.css";
import { UserContext } from "../../../App";
import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill, BsBoxArrowLeft } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";

const SideDrawer = (props) => {
  const { user, logout } = useContext(UserContext);

  let drawerClasses = "sideDrawer";

  if (props.show) {
    drawerClasses = "sideDrawer open";
  }


  return (
    <nav className={drawerClasses}>
      <div className="user">
        <ul>
          <li>
            <BsPersonFill size="50px" />
          </li>
          <li>
            <b>{user.username}</b>
          </li>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li>
            {user.email}
          </li>
          <li>
            <Link to="/UsernameDialog">Endre brukernavn</Link>
          </li>
          <li>
            <Link to="/PasswordDialog">Endre passord</Link>
          </li>
          {user.admin && <li><Link to="/Admin">Administrer brukere</Link></li>}
        </ul>
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
          <Link to="#" onClick={() => {
            logout();
            props.toggle();
          }}>
            <BsBoxArrowLeft size="22px" /> Logg ut
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
