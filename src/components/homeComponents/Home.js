import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Feed from "../forumComponents/Feed.js";
import "./Home.css";
import moment from "moment";

import Footer from "../mainComponents/Footer";
//import Header from '../mainComponents/Header'

import { Link } from "react-router-dom";

import SpinnerDiv from "../forumComponents/SpinnerDiv.js";
import SortItems from "../forumComponents/SortItems.js";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { host } from "../../App.js";

const Home = ({ topic, subtopic, users }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sort, setSort] = useState({sortOrder: "Asc", sortType: "Date"})
  const postsInFeed = 3

  useEffect( async () => {
    const res = await fetch(host + 
      `posts?pageNumber=${1}&pageSize=${postsInFeed}&sortOrder=${sort.sortOrder}&sortType=${sort.sortType}`)
    const posts = await res.json()
    setFilteredPosts(posts.data)
  }, [sort]);

  return (
    <div className="Home">
      <Container>
        <Row className="toprow">
          <Col>
            <h3>Diskusjoner i forumet</h3>
            <div className="sortposts">
              <SortItems
                setSort={setSort}
                isPost={true}
              />
            </div>
          </Col>
          <Col className="hidden"></Col>
        </Row>
        <Row md={1} lg={2}>
          <Col md={6} className="feedcol">
            <Feed
                posts={filteredPosts}
                topic={topic}
                subtopic={subtopic}
                postsPerPage={postsInFeed}
            />
          </Col>
          <Col md={6} className="textcol">
            <Link to="/Kunnskapsportalen">
              <div className="infocon">
                {/* 
            <Image 
            src={ImgKunnskap}
            width="100%"
            height="100%">
            </Image>*/}
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
                {/* 
            <Image 
            src={ImgForum}
            width="100%"
            height="100%">
            </Image>*/}
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
