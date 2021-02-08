import { Nav, Navbar, Container } from "react-bootstrap";
import React from "react";
import "react-bootstrap";

import './Footer.css'


import { NavLink } from 'react-router-dom'
//Enten må dere ta bort denne eller laste ned/hoste logoen sjæl
// import logo from "C:/Users/Tobia/kunnskapsportalen_badminton/src/nbf_logo_farger-02.png";

function Header() {
    return (
      <div className="Header" style={{marginBottom: '10vh'}} >
          <Navbar bg="primary" variant="dark" fixed="top">
            <Navbar.Brand href="">
            <img src="https://www.badminton.no/siteassets/badminton_logo.png" 
            alt="Logo"
            width="80"
            height="75"
            className="d-inline-block"
            />
            Norges Badmintonforbund
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                  <NavLink activeClassName="nav-active" className="p-2" to="/hjem" style={{color: 'white', padding: '10px'}}>Hjem</NavLink>
                  <NavLink activeClassName="nav-active" className="p-2" to="/placeholder" style={{color: 'white'}}>Kunnskapsportalen</NavLink>
                  <NavLink activeClassName="nav-active" className="p-2" to="/forum" style={{color: 'white'}}>Forum</NavLink>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link href="">Min profil</Nav.Link>
                </Nav>
          </Navbar>
      </div>
    );
  }
  
  export default Header;