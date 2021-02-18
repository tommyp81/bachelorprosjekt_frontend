import React from 'react'
import "./Home.css";
import { Card } from "react-bootstrap";
import moment from 'moment'

const Feed = ({ post, maxLength }) => {
    return (
      <div className="Feed">
        {post.sort((p1, p2) => (moment(p2.post_Date).diff(moment(p1.post_Date)))).slice(0, maxLength).map((post, i) => (
            <Card key={i}>
              <Card.Body>
                <Card.Title>{post.post_Title}<i><small> i {post.subTopic_Title}</small></i></Card.Title>
                <Card.Text>
                  <div className="float-left">{moment(post.post_Date).calendar()} av {post.user_Username}</div>
                <div className="float-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg> &nbsp; {post.comment_Count}
                </div></Card.Text>
              </Card.Body>
            </Card>
            ))}
      </div>
        );
}
  
export default Feed;