import React from 'react'
import { Card } from "react-bootstrap";

const Forum = ({ post }) => {
    return (
      <div className="Forum">
        {post.map((post) => (
            <Card>
              <Card.Header>{post.name} - {post.date}</Card.Header>
              <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  </Card.Body>
                  </Card>
            ))}
                </div>
        );
}
  
export default Forum;