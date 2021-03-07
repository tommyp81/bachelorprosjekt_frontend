import React from 'react'
import { Card } from "react-bootstrap";
import moment from 'moment'
import { Link } from 'react-router-dom';

import './Feed.css'

//Viser en "preview" av forumpostene
//Vil gjerne bare vise de 3-4 første postene!!!!!!!!!!!1
const Feed = ({ posts, users, subtopic, maxLength, loading }) => {

    if (loading) {
      return <h2>Laster inn...</h2>
    }

    return (
      <div className="Feed">
        {posts.sort((p1, p2) => (moment(p2.date).diff(moment(p1.date)))).slice(0, maxLength).map((post, i) => (
          
            <Card key={i}>
              <Link to={`/forum/${post.id}`} style={{textDecoration: 'none', color: '#000000'}}>
                <Card.Body>
                  
                  {subtopic.filter(subtopic => (subtopic.id === post.subTopicId)).map((filteredSubtopic, i) => 
                  (<Card.Title>{post.title} i {filteredSubtopic.title} </Card.Title>
                  ))}
                  
                  
                  {users.filter(user => (user.id === post.userId)).map((filteredUser, i) => (
                  <Card.Text>
                    <div className="float-left">{moment(post.date).calendar()} av {filteredUser.username}</div>
                    <div className="float-right">{post.comment_Count} &nbsp;
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      </svg>
                    </div>
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