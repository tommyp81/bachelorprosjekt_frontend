import React, { useContext } from "react";
import "./Toolbar.css";
import logo from "../../../assets/images/BadmintonClubLogo.png";
import ToggleButton from "../SideDrawer/ToggleButton";
import { UserContext } from "../../../App";
import { AiFillHome } from "react-icons/ai";
import { BsBoxArrowLeft, BsChatDotsFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const ToolBar = (props) => {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="toolbar" style={{ zIndex: "120" }}>
      <nav className="tnavigation">
        <div className="t-toggle-btn">
          <ToggleButton click={props.handleDrawerToggleClick} />
        </div>
        <div className="tlogo">
          <Link to="/">
            <img src={logo} alt="Norges Badmintonforbund Logo" />
          </Link>
          <div className="tlogoname">
            <Link to="/">Norges Badmintonforbund</Link>
          </div>
        </div>
        <div className="tNavItems">
          <ul>
            <li className="linkItem">
              <Link to="/" role="home">
                <AiFillHome size="20px" /> Hjem
              </Link>
            </li>
            <li className="linkItem">
              <Link to="/Forum" role="forum">
                <BsChatDotsFill size="18px" /> Forum
              </Link>
            </li>
            <li className="linkItem">
              <Link to="/Kunnskapsportalen" role="kunnskapsportalen">
                <HiAcademicCap size="23px" /> Kunnskapsportalen
              </Link>
            </li>
          </ul>
        </div>

        <div className="uNavItems">
          <ul className="user">
            {user ? (
              <Dropdown>
                <Dropdown.Toggle>
                  <BsPersonFill size="20px" /> {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <BsPersonFill size="20px" /> <b>{user.username}</b>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {user.firstName} {user.lastName}
                  </Dropdown.Item>
                  <Dropdown.Item>{user.email}</Dropdown.Item>
                  <Dropdown.Divider />
                  {user.admin && (
                    <Dropdown.Item href="/Admin">
                      <Link to="/Admin" role="administerusers">
                        Administrer brukere
                      </Link>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item href="/UsernameDialog">
                    <Link to="/UsernameDialog" role="changeusername">
                      Endre brukernavn
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="/PasswordDialog">
                    <Link to="/PasswordDialog" role="changepassword">
                      Endre passord
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
            <li className="userItem">
              <Link to="#" onClick={logout} role="logout">
                <BsBoxArrowLeft size="22px" /> Logg ut
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default ToolBar;
