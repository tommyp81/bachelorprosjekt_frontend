import React, { useContext, useState } from 'react';
import {Button, Row, Col, Card, Image, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom' 
import { host } from '../../App';
import { UserContext } from '../../UserContext';
import moment from 'moment'
import "./Kunnskapsportalen.css";

const VideoContent = ({ videos, infoTopics, content, deletePost, setVideoContent, post }) => { 

  const {user} = useContext(UserContext)
  
  const [show, setShow] = useState(null);

  const handleShow = (index) => setShow(index);
  const handleClose = () => setShow(null);
  const deleteVideo = async (videoId, postId) => {
    const res = await fetch(host+`videos/${videoId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setVideoContent(videos.filter(v => v.id != videoId))
      deletePost(postId)
    } else {
      alert("Feil ved sletting av Video")
    }

  }

    return (
        <div className="VideoContent">
          {videos.map((filteredVideos, i) => (
            <>
            <Card key={i} 
            onClick={() => handleShow(i)}
            style={{cursor: "pointer"}}>
            <Card.Body>
            <Row>
              
              <Col md={5}>
                <div className="content">
                {infoTopics.filter(infoTopics => (infoTopics.id === filteredVideos.infoTopicId)).map((filteredTopics, i) => (
                <p className="toptext" style={{color: "gray"}}>Delt {moment(filteredVideos.uploaded).calendar()} i {filteredTopics.title} </p>))}
                <div className="title">{filteredVideos.title}</div><br/>
                <p>Klikk for å se video</p>
                <div hidden={!user.admin}>
                <Button variant="danger" size="sm" value={filteredVideos.id} onClick={() => deleteVideo(filteredVideos.id, filteredVideos.postId)}>Slett</Button>
                </div>
                </div> 
              </Col>
              <Col md={7}>
                <div className="contentimg">
                <Image src={`https://img.youtube.com/vi/${filteredVideos.youTubeId}/0.jpg`}/>
                
                </div>
              </Col>
            </Row>
            </Card.Body>
            </Card>
            
            </>
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
                                <Link to={`/Forum/${filteredVideos.postId}`}>Diskuter i forumet</Link>
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
