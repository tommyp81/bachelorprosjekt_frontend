import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import "moment/locale/nb";
import { FaThumbsUp, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import SpinnerDiv from "./SpinnerDiv";
import ReadMoreReact from "../forumComponents/ReadMore";
import "./Feed.css";

const Feed = ({ posts, users, topic, subtopic, maxLength, loading }) => {
  if (
    posts.length === 0 &&
    users.length === 0 &&
    topic.length === 0 &&
    subtopic.length === 0
  ) {
    console.log("HEI");
    return <SpinnerDiv />;
  }

  return (
    <div className="Feed">
      {posts.slice(0, maxLength).map((post, i) => (
        <Card key={i}>
          <Link
            to={`/forum/${post.id}`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <Card.Body>
              <div className="float-left">
                {users
                  .filter((user) => user.id === post.userId)
                  .map((filteredUser, i) => (
                    <Card.Text key={i}>
                      Postet av <b>{filteredUser.username}</b>{" "}
                      {moment(post.date).calendar()}
                    </Card.Text>
                  ))}
              </div>
              <div className="float-right">
                {post.like_Count}{" "}
                <FaThumbsUp
                  className="ml-1 mr-1 mb-2"
                  color="grey"
                  size={18}
                />{" "}
                &nbsp;
                {post.comment_Count}{" "}
                <FaRegComment
                  size={18}
                  color="grey"
                  className="ml-2 mr-2 mb-1"
                /></div>
              <br />
              <br />
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="float-left">
                <ReadMoreReact text={post.content} /><br/>
              </Card.Text>
              <br />
              <br />
              
              {topic
                .filter((topic) => topic.id === post.topicId)
                .map((filteredTopics, j) => (
                  <Card.Text key={j} className="float-left">
                    {filteredTopics.title} -{" "}
                    {subtopic.find((st) => st.id === post.subTopicId)?.title}
                  </Card.Text>
                ))}
            </Card.Body>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
