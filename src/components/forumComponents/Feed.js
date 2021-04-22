import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import "moment/locale/nb";
import { FaThumbsUp, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import SpinnerDiv from "./SpinnerDiv";

import "./Feed.css";

const Feed = ({ posts, users, topic, subtopic, maxLength, loading }) => {
  const [ReadMore, setReadMore] = useState(false);
  const getText = (content) => {
    if (content.length <= 150) return content;
    if (content.length > 150 && ReadMore) {
      return (
        <>
          <Card.Text>
            {content}
            <Link size="sm" variant="link" onClick={() => setReadMore(false)}>
              {" "}
              Les Mindre
            </Link>
          </Card.Text>
        </>
      );
    }
    if (content.length > 150) {
      return (
        <>
          <Card.Text>
            {content.slice(0, 150)}
            <Link size="sm" variant="link" onClick={() => setReadMore(true)}>
              {" "}
              ... Les Mer
            </Link>
          </Card.Text>
        </>
      );
    }
  };

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
              <br />
              {topic
                .filter((topic) => topic.id === post.topicId)
                .map((filteredTopics, j) => (
                  <Card.Text key={j} className="float-left">
                    {filteredTopics.title} -{" "}
                    {subtopic.find((st) => st.id === post.subTopicId)?.title}
                  </Card.Text>
                ))}
              <br />
              <br />
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="float-right">
                {post.like_Count}{" "}
                <FaThumbsUp
                  className="like ml-1 mr-1 mb-2"
                  color="grey"
                  size={18}
                />{" "}
                &nbsp;
                {post.comment_Count}{" "}
                <FaRegComment
                  size={18}
                  color="grey"
                  className="ml-2 mr-2 mb-1"
                />
              </Card.Text>

              <Card.Text className="float-left">
                {getText(post.content)}
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
