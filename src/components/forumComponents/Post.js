import React from 'react'
import { Card } from "react-bootstrap";
import moment from 'moment'

import Header from '../mainComponents/Header'

import { Container } from 'react-bootstrap'

const Post = ({ post, comment, users }) => {

  // user.filter(u => (u.id === post.userId))[0].username
  // user.filter(u => (u.id === filteredComment.userId))[0].username
  return (
    <Container style={{display: 'flex', flexDirection: 'column'}}>
      <Header />
      {post.map((post, i) => (
        <Card key={i}>
          <Card.Header>{users && users.length && users.find(u => (u.id === post.userId)).username} - {moment(post.date).calendar()}</Card.Header>
          <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              {comment.filter(comment => (comment.postId === post.id)).map((filteredComment, i) => (
                  <Card key={i}>
                      <Card.Header>{users && users.length && users.find(u => (u.id === filteredComment.userId)).username} - {moment(filteredComment.date).calendar()}</Card.Header>
                      <Card.Body>
                          <Card.Text>{filteredComment.content}</Card.Text>
                      </Card.Body>
                  </Card>
              ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
};

export default Post;