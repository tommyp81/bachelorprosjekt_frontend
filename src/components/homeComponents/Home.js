import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Feed from "../forumComponents/Feed.js";
import "./Home.css";
import { host } from '../../App'


import { Link } from "react-router-dom";

import SortItems from "../forumComponents/SortItems.js";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Home = ({ topic, subtopic }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sort, setSort] = useState({ sortOrder: "Desc", sortType: "Date" })
  const [loading, setLoading] = useState(false)

  const postsInFeed = 3


  useEffect(async () => {
    setLoading(true)
    const res = await fetch(host +
      `posts?pageNumber=${1}&pageSize=${postsInFeed}&sortOrder=${sort.sortOrder}&sortType=${sort.sortType}`)
    const posts = await res.json()
    setFilteredPosts(posts.data)
    setLoading(false)
  }, [sort]);

  return (
    <div className="Home">
      <Container>
        <Row className="toprow">
          <Col md={6}>
            <h3>Diskusjoner i forumet</h3>
            <div className="sortposts">
              <SortItems
                setSort={setSort}
                isPost={true}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="feedcol">
            <Feed
              posts={filteredPosts}
              topic={topic}
              subtopic={subtopic}
              postsPerPage={postsInFeed}
              loading={loading}
            />
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
                  <h5>Til kunnskapsportalen <BsArrowRight /></h5>
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
                  <h5><BsArrowLeft /> Til forumet</h5>
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
