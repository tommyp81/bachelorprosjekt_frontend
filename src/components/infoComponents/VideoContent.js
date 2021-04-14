import React, { useState } from 'react';
import {Button, Row, Col, Card, Image, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom' 
import "./Kunnskapsportalen.css";

const VideoContent = ({ videos, infoTopics, content }) => { 
  
  const [show, setShow] = useState(null);

  const handleShow = (index) => setShow(index);
  const handleClose = () => setShow(null);
  
  function titleLength(str) {
    if (str.length > 25) {
      return str.substring(0, 25) + "..."
    } else {
      return str;
    }
  }

    return (
        <div className="VideoContent">
          {videos.map((filteredVideos, i) => (
          <Card key={i}>
            <Card.Body>

              <div className="left">
              <Image src={`https://img.youtube.com/vi/${filteredVideos.youTubeId}/0.jpg`}
              width="200px"
              onClick={() => handleShow(i)}
              style={{cursor: "pointer"}}>
              </Image>
              </div>

              <div className="vidright">
              {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics, i) => (
              <p className="toptext">Delt i {filteredTopics.title}</p>))}
              <h3 className="title">{titleLength(filteredVideos.title)}</h3><Link to="/Forum">Diskuter i forumet</Link>
              </div>
              </Card.Body>
              
              </Card>
               ))}

              {videos.map((filteredVideos, i) => (
              <Modal key={i} show={show === i} onHide={handleClose} centered >
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
