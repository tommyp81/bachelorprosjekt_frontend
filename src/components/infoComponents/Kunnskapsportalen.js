import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import "./Kunnskapsportalen.css";
 
const Kunnskapsportalen = ({ infoTopics, videos, users }) => {

    const [showVideos, setShowVideos] = useState(false)
    const [showDocuments, setShowDocuments] = useState(false)

    const toggleVideoContent = () => setShowVideos(!showVideos)

    const toggleDocumentContent = () => setShowDocuments(!showDocuments)

    const filterContent = (key) => {
      if (key) {
      }
    }

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
                  <InfoTopics infoTopics={infoTopics} videos={videos} showVideos={toggleVideoContent} showDocuments={toggleDocumentContent}/>
                </Col>
                <Col lg={2}><UploadFile /></Col>
                
              </Row>
              <Row>
                <Col lg={12}>
                <div className="content">
                {showVideos ? <VideoContent videos={videos} infoTopics={infoTopics}/> : null}
                {showDocuments? <DocumentContent infoTopics={infoTopics}/> : null}
                </div>
                        
        </Col>
      </Row>
      </Container>
            </div>
    );
}

export default Kunnskapsportalen;