import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import "./Kunnskapsportalen.css";
 
const Kunnskapsportalen = ({ infoTopics, videos, documents, users }) => {
 

    const [content, setContent] = useState([])

    const [title, setTitle] = useState("")

    const [showContent, setShowContent] = useState("")

    const [showVideos, setShowVideos] = useState(false)
    const [showDocuments, setShowDocuments] = useState(false)
   
    const toggleVideoContent = () => setShowVideos(true)

    const toggleDocumentContent = () => setShowDocuments(true)

    

    const filterContent = (e) => {
      let title = e.target.value;
      setContent(videos.filter(videos => videos.infoTopicsId === infoTopics.id))
      setTitle(title)
    }

    const allContent = () => setContent(videos)

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
                <Col lg={10}><InfoTopics infoTopics={infoTopics} allContent={allContent} filterContent={filterContent}/>
                </Col>
                <Col lg={2}><UploadFile infoTopics={infoTopics}/></Col>
                
              </Row>
              <Row>
                <Col lg={12}>
                  <Tabs as={Button} variant="pills" defaultActiveKey="visalt" className="tabs">
                    <Tab eventKey="visalt" title="Vis alt" className="tab">
                    <h3>{!title ? "Alle kategorier" : title}</h3>
                      <Col xs={6} className="videocol"><VideoContent videos={content} infoTopics={infoTopics}/></Col>
                      <Col xs={6} className="documentcol"><DocumentContent documents={documents} infoTopics={infoTopics}/></Col>
                    </Tab>
                    <Tab eventKey="videoer" title="Videoer" className="tab">
                    <h3>{!title ? "" : title}</h3>
                     <VideoContent videos={content} infoTopics={infoTopics}/>
                    </Tab>
                    <Tab eventKey="dokumenter" title="Dokumenter" className="tab">
                      <h3>{!title ? "" : title}</h3>
                      <DocumentContent documents={documents} infoTopics={infoTopics}/>
                    </Tab>
                  </Tabs>
                </Col>
       
      </Row>
      </Container>
            </div>
    );
}

export default Kunnskapsportalen;