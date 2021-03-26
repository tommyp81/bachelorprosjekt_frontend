import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import "./Kunnskapsportalen.css";
 
const Kunnskapsportalen = ({users}) => {
  
  const [content, setContent] = useState({});
  const [showMore, setShowMore] = useState(false);

  //Dersom innhold er større enn 100, legg til showMore-knapp
  function validateContent() {
    if (content > 100) {

    }
  }

    const [infoTopics, setInfoTopics] = useState();
    const [showCategory, setShowCategory] = useState(false);
    const [showVideoContent, setShowVideoContent] = useState(false)
    const [showDocumentContent, setShowDocumentContent] = useState(false)
    const [showContent, setShowContent] = useState(false);
    const [videoContent, setVideoContent] = useState(false)
    const [documentContent, setDocumentContent] = useState(false)

    const showCat = () => setShowCategory(true)
    const showCont = () => setShowContent(true)
    const showVideoCont = () => setShowVideoContent(true)
    const showDocumentCont = () => setShowDocumentContent(true)
    

    const Category = () => {
      
        return <div className="">
            <Button value="video" onClick={showCont}>Video</Button>
            <Button value="dokument" onClick={showCont}>Dokument</Button>
        </div>;
    }

    const Content = () => {
        return <div className="content">
          <Card>
            <Card.Body>
              <Row>
                <Col lg={2}><div className="float-left"><svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
              </svg></div>
              </Col>
              <Col lg={8}><p className="toptext">Delt DATO i KATEGORI</p>
              <h3 className="title">Tittel</h3>
              <p className="bottext">av ADMIN</p></Col>
              <Col lg={2}>
              <Button>Last ned</Button><br />
              <Link to="/Forum">Diskuter i forumet</Link>
              </Col>
              </Row>
            </Card.Body>
            </Card>
      </div>
    }

  /*
  if (attachm.type === "file") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
    </svg>
  } else if (attachm.type === "video") {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
  </svg>
  }*/

        return (
            <div className="Kunnskapsportalen">
                  <Container style={{display: 'flex', flexDirection: 'column'}}> 
                  <Row>
                    <h1>Kunnskapsportalen</h1>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                      praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
                      excepturi sint occaecati cupiditate non provident eos et accusamus et iusto odio 
                      dignissimos ducimus qui blanditiis praesentium voluptatum delenitieos et accusamus 
                      et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti</p>
                  </Row>
                  <Row>
                    <Col lg={2}> Søk</Col>
                    <Col lg={8}>
                      <div className="InfoTopics">
                        <Button onClick={showCat} className="float-left">
                            InfoTopic 1
                        </Button>
                        {showCategory ? <Category /> : null}
                    </div>
                    </Col>
                    <Col lg={2}><UploadFile /></Col>
                   
                  </Row>
                  <Row>
                    <Col lg={12}>
                    {showContent ? <Content /> : null}  
                      
                    </Col>
                  </Row>
                  </Container>
            </div>
    );
}

export default Kunnskapsportalen;