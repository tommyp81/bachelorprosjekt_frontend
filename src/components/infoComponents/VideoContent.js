import React, { useState } from 'react';
import {Button, Row, Col, Card, Image, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom'
import "./Kunnskapsportalen.css";

const VideoContent = ({ videos, infoTopics, content }) => { 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <div className="VideoContent">
          {videos.map((filteredVideos) => (
          <Card >
            <Card.Body>
            
              <div className="left">
              <Image src={`https://img.youtube.com/vi/${filteredVideos.youTubeId}/0.jpg`}
              width="200px"
              onClick={handleShow}
              style={{cursor: "pointer"}}>
              </Image>
              </div>

              <div className="vidright">
              {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics, i) => (
              <p className="toptext">Delt i {filteredTopics.title}</p>))}
              <h3 className="title">{filteredVideos.title}</h3><Link to="/Forum">Diskuter i forumet</Link>
              </div>
              </Card.Body>
              </Card>
              ))}

{videos.map((filteredVideos) => (

              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{filteredVideos.title}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                  <iframe 
                  allowfullscreen="allowfullscreen"
                  mozallowfullscreen="mozallowfullscreen" 
                  msallowfullscreen="msallowfullscreen" 
                  oallowfullscreen="oallowfullscreen" 
                  webkitallowfullscreen="webkitallowfullscreen"
                  frameBorder="0"
                  src={`https://www.youtube.com/embed/${filteredVideos.youTubeId}`} width="100%" height="300px"/>
                  <p>{filteredVideos.description}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Lukk
                  </Button>
                </Modal.Footer>
              </Modal>
               ))}
            
      </div>
    )
}

export default VideoContent
