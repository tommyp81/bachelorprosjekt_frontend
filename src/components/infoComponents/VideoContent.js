import React, { useState } from 'react';
import {Button, Row, Col, Card, Image, Modal} from "react-bootstrap";
import {Link} from 'react-router-dom'
import "./Kunnskapsportalen.css";

const VideoContent = ({ videos, infoTopics, content }) => { 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getYouTubeURL (url) {

  }

    return (
        <div className="content">
          {videos.map((filteredVideos) => (
          <Card>
            <Card.Body>
              <Row>
                <Col lg={3}>
                  <div className="float-left">
                    <Image src="https://img.youtube.com/vi/3NBPQ9RLOu0/0.jpg"
                    width="100%">

                    </Image>
                  </div>
              </Col>
              <Col lg={5}>
              {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics, i) => (
              <p className="toptext">Delt i {filteredTopics.title}</p>))}
              <h3 className="title">{filteredVideos.title}</h3></Col>
              <Col lg={4}>
              <Button variant="primary" onClick={handleShow}>
                Se video
              </Button>
              
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
                  src="https://www.youtube.com/embed/3NBPQ9RLOu0" width="420" height="315"/>
                  <p>{filteredVideos.description}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Lukk
                  </Button>
                </Modal.Footer>
              </Modal>
              <br/><br/>
              <Link to="/Forum">Diskuter i forumet</Link>
              </Col>
              </Row>
            </Card.Body>
            </Card>
            ))}
      </div>
    )
}

export default VideoContent
