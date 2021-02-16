import { Nav, Button, Image } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/BadmintonClubLogo.png";

function Header () {
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  return (
      <div className="Header">
      <div className="top">
        <div className="logo">
            <Image 
            src={logo}
            width="50"
            height="50">
            </Image>
        </div>
        <h1>Norges Badmintonforbund</h1>
      </div>
      <Nav className={menu ? "menu active" : "menu"}>
          <Button className="hamburger" type="button" onClick={showMenu}>
          <div></div>
          </Button>
          <h1>Meny</h1>
          <ul onClick={showMenu}>
              <li><Link to="/">Hjem</Link></li>
          </ul>
      </Nav>
      </div>
  )
}

export default Header;