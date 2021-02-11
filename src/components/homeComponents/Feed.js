import React from 'react'
import "./Home.css";
import { Card } from "react-bootstrap";
import moment from 'moment'

//Viser en "preview" av forumpostene
//Vil gjerne bare vise de 3-4 første postene!!!!!!!!!!!1
const Feed = ({ post }) => {
    return (
      <div className="Feed">
        {post.map((post, i) => (
            <Card key={i}>
              <Card.Body>
                <Card.Title>{post.post_Title}<i><small> i {post.subTopic_Title}</small></i></Card.Title>
              </Card.Body>
              <Card.Footer>{moment(post.post_Date).calendar()} av {post.user_Username}</Card.Footer>
            </Card>
            ))}
                </div>
        );
}
  
export default Feed;