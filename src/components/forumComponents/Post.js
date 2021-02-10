import React from 'react'
import { Card } from "react-bootstrap";

const Post = ({ post, comment }) => {
  return (
    <div className="Post">
      {post.map((post) => (
          <Card>
            <Card.Header>Navn - {post.date}</Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                {comment.filter(comment => (comment.postId === post.id)).map(filteredComment => (
                    <Card style={{borderStyle: "solid", marginLeft: '10px'}}>
                        <Card.Header>{filteredComment.name} - {filteredComment.date}</Card.Header>
                        <Card.Body>
                            <Card.Text>{filteredComment.content}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Card.Body>
          </Card>
      ))}
    </div>
  )
};

export default Post;