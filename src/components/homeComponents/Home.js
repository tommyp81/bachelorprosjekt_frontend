import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Feed from "./Feed.js";
import "./Home.css";
import Footer from '../mainComponents/Footer'
import Header from '../mainComponents/Header'


import { Link } from 'react-router-dom'

class Home extends Component {

  state = {
    post: []
  }

  componentDidMount() {
    fetch("https://localhost:44387/Posts")
    .then(res => res.json())
    .then((data) => {
      this.setState({ post: data })
    })
    .catch(console.log)
  }
  
    render () {
    return (
      <div className="Home">
        <Header />
          <Container>
              <Row><h5>Siste poster i forumet</h5></Row>
              <Row xs={1} sm={1} lg={2}>
                <Col md={6} className="feedcol">
                  <Feed post = {this.state.post} />
                </Col>
                <Col md={6} className="textcol">
                  <Container className="infocon">
                  <h1>Ønsker du å lære mer?</h1>
                  <p>I kunnskapsportalen finner du mange nyttige artikler og videoer som lærer deg korrekte treningsteknikker relevante for badmintonsporten.</p>
                  <h5>Til kunnskapsportalen</h5>
                  </Container>
                  <Container className="forumcon">
                  <h1>Slå av en prat</h1>
                  <p>I forumet finner du mange likesinnede mennesker som ønsker å dele kunnskap, opplevelser og erfaringer fra badmintonsporten.</p>
                  <Link to="/forum">Til forumet</Link>
                  </Container>
                </Col>
              </Row>
          </Container>
          <Footer />
      </div>
    );
  }
}
  
export default Home;
  