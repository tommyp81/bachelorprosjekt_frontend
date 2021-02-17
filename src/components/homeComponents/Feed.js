import React from 'react'
import "./Home.css";
import { Card } from "react-bootstrap";
import moment from 'moment'

//Viser en "preview" av forumpostene
//Vil gjerne bare vise de 3-4 første postene!!!!!!!!!!!1
const Feed = ({ post, maxLength }) => {
    return (
      <div className="Feed">
        {post.sort((p1, p2) => (moment(p2.post_Date).diff(moment(p1.post_Date)))).slice(0, maxLength).map((post, i) => (
            <Card key={i}>
              <Card.Body>
                <Card.Title>{post.post_Title}<i><small> i {post.subTopic_Title}</small></i></Card.Title>
                <Card.Text>{moment(post.post_Date).calendar()} av {post.user_Username}</Card.Text>
              </Card.Body>
            </Card>
            ))}
      </div>
        );
}
  
export default Feed;