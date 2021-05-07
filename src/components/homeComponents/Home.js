import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Feed from "../forumComponents/Feed.js";
import "./Home.css";
import moment from "moment";
import { host } from '../../App'

import Footer from "../mainComponents/Footer";
//import Header from '../mainComponents/Header'

import { Link } from "react-router-dom";

import SpinnerDiv from "../forumComponents/SpinnerDiv.js";
import SortPosts from "../forumComponents/SortPosts.js";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

const Home = ({ posts, topic, subtopic, users, loading }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(
      posts.slice(0).sort((d1, d2) => moment(d2.date) - moment(d1.date))
    );
  }, [posts]);

  return (
    <div className="Home">
      <Container>
        <Row className="toprow">
          <Col md={6}>
            <h3>Diskusjoner i forumet</h3>
            <div className="sortposts">
              <SortPosts
                post={filteredPosts}
                setFilteredPosts={setFilteredPosts}
              />
            </div>
          </Col>
        </Row>
        <Row md={1} lg={2}>
          <Col md={6} className="feedcol">
            {loading ? (
              <SpinnerDiv />
            ) : (
              <Feed
                posts={filteredPosts}
                users={users}
                topic={topic}
                subtopic={subtopic}
                maxLength={3}
              />
            )}
          </Col>
          <Col md={6} className="textcol">
            <Link to="/Kunnskapsportalen">
              <div className="infocon">
                <div className="infotext">
                  <h1>Ønsker du å lære mer?</h1>
                  <p>
                    I kunnskapsportalen finner du mange nyttige artikler og
                    videoer som lærer deg korrekte treningsteknikker som er relevante
                    for badmintonsporten.
                  </p>
                  <h5>Til kunnskapsportalen <ArrowRight/></h5>
                </div>
              </div>
            </Link>
            <Link to="/Forum">
              <div className="forumcon">
                <div className="forumtext">
                  <h1>Slå av en prat</h1>
                  <p>
                    I forumet finner du mange likesinnede mennesker som ønsker å
                    dele kunnskap, opplevelser og erfaringer fra
                    badmintonsporten.
                  </p>
                  <h5><ArrowLeft/> Til forumet</h5>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
