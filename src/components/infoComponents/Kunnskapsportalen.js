import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import "./Kunnskapsportalen.css";
 
const Kunnskapsportalen = ({ infoTopics, videos, documents, users }) => {
 

    const [content, setContent] = useState([...videos])
    const [title, setTitle] = useState("")

    const filterContent = (e) => {
      let filter = videos.filter(videos => videos.infoTopicsId === infoTopics.id)
      if (filter) {
        let title = e.target.value;
        setContent(videos.filter(videos => videos.infoTopicsId === infoTopics.id))
        setTitle(title)
      } else {
        setTitle("yo")
      }
      
    }

    const allContent = () => {
      setContent(videos)
      setTitle("Alle kategorier")
    } 

    return (
        <div className="Kunnskapsportalen">
              <Container style={{display: 'flex', flexDirection: 'column'}}> 
                <h1>Kunnskapsportalen</h1>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                  praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
                  excepturi sint occaecati cupiditate non provident eos et accusamus et iusto odio 
                  dignissimos ducimus qui blanditiis praesentium voluptatum delenitieos et accusamus 
                  et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti</p>
              <Row>
                <Col lg={12}>
                  <Row>
                    <Col lg={10} className="infotopics">
                    {!title ? "Alle kategorier" : title}
                    <InfoTopics infoTopics={infoTopics} allContent={allContent} filterContent={filterContent}/>
                    </Col>
                    <Col lg={2} className="uploadfile">
                    <UploadFile infoTopics={infoTopics}/>
                    </Col>
                  </Row>
                </Col>
                <Col lg={2}></Col>
                
              </Row>
              <Row>
                <Col lg={12} className="maincontent">
                  <Tabs defaultActiveKey="0" className="tabs">
                    <Tab eventKey="0" title="Vis alt" className="tab" id="hidden">
                      <Col xs={6} className="videocol"><VideoContent videos={content} infoTopics={infoTopics}/></Col>
                      <div className="divider"></div>
                      <Col xs={6} className="documentcol"><DocumentContent documents={documents} infoTopics={infoTopics}/></Col>
                      
                    </Tab>
                    <Tab eventKey="1" title="Videoer" className="tab">
                     <VideoContent videos={content} infoTopics={infoTopics}/>
                    </Tab>
                    <Tab eventKey="2" title="Dokumenter" className="tab">
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