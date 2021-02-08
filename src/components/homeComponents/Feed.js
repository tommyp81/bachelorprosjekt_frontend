import React from 'react'
import "./Home.css";
import { Card } from "react-bootstrap";

//Viser en "preview" av forumpostene
//Vil gjerne bare vise de 3-4 første postene!!!!!!!!!!!1
const Feed = ({ post }) => {
    return (
      <div className="Feed">
        {post.map((post, i) => (
            <Card key={i}>
              <Card.Body>
                <Card.Title>{post.title}<i><small> i Kategori</small></i></Card.Title>
              </Card.Body>
              <Card.Footer>{post.date} av {post.name}</Card.Footer>
            </Card>
            ))}
                </div>
        );
}
  
export default Feed;