import React from 'react'
import { Card, Container } from "react-bootstrap";
import ForumCategories from "./ForumCategories.js";
import NewPost from "./NewPost.js"
import "./Forum.css";

const Forum = ({ post }) => {
    return (
      <div className="Forum">
        <ForumCategories />
        <Container className="top">
          <h1>Underkategori</h1>
          <div className="float-left">
            <NewPost />
          </div>
          <div className="float-right">
          Sorter: Nyeste til eldste
          </div>
        </Container>

        <Container className="main">
        {/*  
        {post.map((post) => (
            <Card>
              <Card.Header>{post.name} - {post.date}</Card.Header>
              <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  </Card.Body>
                  </Card>
            ))}
        */}
            <Card> 
              <Card.Body>
                  <Card.Title>Tittel</Card.Title>
                    Av <b>Brukernavn</b> - Dato
                    <div className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> &nbsp;x kommentarer
                    </div>
                    </Card.Body>
                  </Card>
                  
                  <Card> 
              <Card.Body>
                  <Card.Title>Tittel</Card.Title>
                    Av <b>Brukernavn</b> - Dato
                    <div className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> &nbsp;x kommentarer
                    </div>
                    </Card.Body>
                  </Card>
                  
                  <Card> 
              <Card.Body>
                  <Card.Title>Tittel</Card.Title>
                    Av <b>Brukernavn</b> - Dato
                    <div className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> &nbsp;x kommentarer
                    </div>
                    </Card.Body>
                  </Card>

            </Container>
                </div>
        );
}
  
export default Forum;