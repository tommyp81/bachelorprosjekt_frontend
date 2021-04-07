import React, { useState } from 'react'
import { Card, Button, Spinner } from "react-bootstrap";
import moment from 'moment'
import 'moment/locale/nb'
import { FaThumbsUp, FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import './Feed.css'

const Feed = ({ posts, users, topic, subtopic, maxLength, loading }) => {

  const [likes, setLikes] = useState(0)

  if (loading) {
    return <h2>Laster inn...</h2>
  }


  return (
    <div className="Feed">
      {posts.slice(0, maxLength).map((post, i) => (
        <Card key={i}>
          <Link to={`/forum/${post.id}`} style={{ textDecoration: 'none', color: '#000000' }}>
            <Card.Body>
              <div className="float-left">
                {users.filter(user => (user.id === post.userId)).map((filteredUser, i) => (
                  <Card.Text key={i}>Postet av <b>{filteredUser.username}</b> {moment(post.date).calendar()}</Card.Text>
                ))}
              </div>
              <br /><br />
              <Card.Title>{post.title}</Card.Title>
                {topic.filter(topic => (topic.id === post.topicId)).map((filteredTopics, j) => (
                  <Card.Text key={j} className="float-left">
                    {filteredTopics.title} - {subtopic?.find(st => st.id === post.subTopicId).title}
                  </Card.Text>
                ))}              
              <Card.Text className="float-right">
              {post.like_Count} <FaThumbsUp className="like ml-1 mr-1 mb-2" color="grey" size={18} /> &nbsp;
              {post.comment_Count} <FaRegComment size={18} color="grey" className="ml-2 mr-2 mb-1"/> 
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default Feed;