import React from 'react'
import { Card } from "react-bootstrap";
import moment from 'moment'
import { Link } from 'react-router-dom';

import './Feed.css'

//Viser en "preview" av forumpostene
//Vil gjerne bare vise de 3-4 første postene!!!!!!!!!!!1
const Feed = ({ post, user, subtopic, maxLength }) => {

    return (
      <div className="Feed">
        {post.sort((p1, p2) => (moment(p2.date).diff(moment(p1.date)))).slice(0, maxLength).map((post, i) => (
          
            <Card key={i}>
              <Link to={`/forum/${post.id}`} style={{textDecoration: 'none', color: '#000000'}}>
                <Card.Body>
                  
                  {subtopic.filter(subtopic => (subtopic.id === post.subTopicId)).map((filteredSubtopic, i) => 
                  (<Card.Title>{post.title} i {filteredSubtopic.title} </Card.Title>
                  ))}
                  
                  
                  {user.filter(user => (user.id === post.userId)).map((filteredUser, i) => (
                  <Card.Text>
                    <div className="float-left">{moment(post.date).calendar()} av {filteredUser.username}</div>
                    <div className="float-right">{post.comment_Count} kommentarer</div>
                  </Card.Text>
                  ))}
                </Card.Body>
              </Link>
            </Card>
        ))}
      </div>
    );
}
  
export default Feed;