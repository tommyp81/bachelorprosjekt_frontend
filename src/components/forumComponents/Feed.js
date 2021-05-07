import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import "moment/locale/nb";
import { FaThumbsUp, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import SpinnerDiv from "./SpinnerDiv";
import ReadMoreReact from "../forumComponents/ReadMore";
import "./Feed.css";
import LikeStatus from "../LikeStatus";
import Topics from "./Topics";

const Feed = ({ posts, topic, subtopic, maxLength, loading }) => {
  
  
  if (
    posts.length === 0 &&
    // users.length === 0 &&
    topic.length === 0 &&
    subtopic.length === 0
  ) {
    return <SpinnerDiv />;
  }

  const renderPosts = () => (
    posts.slice(0).map((post) => (
      <Card key={post.id}>
        <Link
          to={`/forum/${post.id}`}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <Card.Body>
            <div className="float-left">
              <Card.Text>
                {post.userId === null ? <>Postet av <b>[Slettet bruker]</b></> : <>Postet av <b>{post.username}</b></>}
                {" "}{moment(post.date).calendar()}
              </Card.Text>
            </div>
            
            <br />
            <br />
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              <ReadMoreReact text={post.content} />
            </Card.Text>
              <Card.Text className="subtoptitle">
                {topic.find(t => t.id === post.topicId)?.title} -{" "}
                {subtopic.find((st) => st.id === post.subTopicId)?.title}
              </Card.Text>
              <div className="likecomment">
              {post.like_Count}{" "}
              <LikeStatus postId={post.id} />{" "}
              &nbsp;
              {post.comment_Count}{" "}
              <FaRegComment
                size={18}
                color="grey"
                className="ml-2 mr-2 mb-1"
              /></div>
          </Card.Body>
        </Link>
      </Card>
    ))
  )

  return (
    <div className="Feed">
      {renderPosts()}
    </div>
  );
};

export default Feed;