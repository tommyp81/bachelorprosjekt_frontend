import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Feed from "../forumComponents/Feed.js";
import "./Home.css";
import moment from 'moment'

import Footer from '../mainComponents/Footer'
//import Header from '../mainComponents/Header'


import { Link } from 'react-router-dom'
import { Navbar } from "../navigation/navbar/navbar.jsx";

const Home = ({ posts, topic, subtopic, users}) =>  {

  
  return (
    <div className="Home">
      <Container>
        <Row><h5>Siste poster i forumet</h5></Row>
        <Row xs={1} sm={1} lg={2}>
          <Col md={6} className="feedcol">
            <Feed posts = {posts.slice(0).sort((d1, d2) => (moment(d2.date) - (moment(d1.date))))} users={users} topic={topic} subtopic={subtopic} maxLength={3}/>
          </Col>
          <Col md={6} className="textcol">
            <Container className="infocon">
            <h1>Ønsker du å lære mer?</h1>
            <p>I kunnskapsportalen finner du mange nyttige artikler og videoer som lærer deg korrekte treningsteknikker relevante for badmintonsporten.</p>
            <Link to="/Kunnskapsportalen"><h5>Til kunnskapsportalen</h5></Link>
            </Container>
            <Container className="forumcon">
            <h1>Slå av en prat</h1>
            <p>I forumet finner du mange likesinnede mennesker som ønsker å dele kunnskap, opplevelser og erfaringer fra badmintonsporten.</p>
            <Link to="/Forum"><h5>Til forumet</h5></Link>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
  
export default Home;
  