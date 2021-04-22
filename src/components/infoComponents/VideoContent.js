import React, { useState } from 'react';
import {Button, Row, Col, Card, Image, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom' 
import moment from 'moment'
import "./Kunnskapsportalen.css";

const VideoContent = ({ videos, infoTopics, content, post }) => { 
  
  const [show, setShow] = useState(null);

  const handleShow = (index) => setShow(index);
  const handleClose = () => setShow(null);
    return (
        <div className="VideoContent">
          {videos.map((filteredVideos, i) => (
            
            <Card key={i} 
            onClick={() => handleShow(i)}
            style={{cursor: "pointer"}}>
            <Card.Body>
            <Row sm={2}>
              
              <Col md={6} sm={0}>
              <div className="content">
              {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics, i) => (
              <p className="toptext">Delt {post.filter(post => (post.id === filteredVideos.postId)).map((filteredPosts , i) => (
                moment(filteredPosts.date).calendar()))} i {filteredTopics.title}
              </p>))}
              <h3 className="title">{filteredVideos.title}</h3><br/><br/>
              <p>Klikk for å se video</p>
              </div> 
              </Col>
              <Col md={6} sm={12}>
              <div className="contentimg">
              <Image src={`https://img.youtube.com/vi/${filteredVideos.youTubeId}/0.jpg`} />
              </div>
              </Col>
            </Row>
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
                                <Link to="/Forum">Diskuter i forumet</Link>
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
