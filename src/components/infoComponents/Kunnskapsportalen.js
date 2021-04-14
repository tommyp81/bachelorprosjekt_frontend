import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import "./Kunnskapsportalen.css";
 
const Kunnskapsportalen = ({ infoTopics, videos, documents, users }) => {
 
    const [videoContent, setVideoContent] = useState([])
    const [documentContent, setDocumentContent] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
      setVideoContent(videos)
      setDocumentContent(documents)
    }, [videos] && [documents])

    const filterContent = (e) => {
      let value = e.target.value;
      let title = e.target.getAttribute("title")
      setVideoContent(videos.filter(videos => videos.infoTopicId === Number(value)))
      setDocumentContent(documents.filter(documents => documents.infoTopicId === Number(value)))
      setTitle(title)
    }

    const allContent = () => {
      setVideoContent(videos)
      setDocumentContent(documents)
      setTitle("Alle kategorier")
    } 

    const useCheckMobileScreen = () => {
      const [width, setWidth] = useState(window.innerWidth);
      const handleWindowSizeChange = () => {
              setWidth(window.innerWidth);
      }
  
      useEffect(() => {
          window.addEventListener('resize', handleWindowSizeChange);
          return () => {
              window.removeEventListener('resize', handleWindowSizeChange);
          }
      }, []);
  
      return (width <= 768);
  }  

    return (
        <div className="Kunnskapsportalen">
              <Container style={{display: 'flex', flexDirection: 'column'}}> 
                <h1>Kunnskapsportalen</h1>
              <Row>
                <Col>
                  <div className="top">
                    
                    <InfoTopics infoTopics={infoTopics} allContent={allContent} filterContent={filterContent}/>
                    <h4>{!title ? "Alle kategorier" : title}</h4>
                  </div>
                  </Col>
              </Row>
                
              <Row>
                <Col lg={12} className="maincontent">
                  <Tabs defaultActiveKey="1" className="tabs" as={Button} variant="pills">
                    <Tab eventKey="1" title="Vis alt" className="tab" id="hidden">
                      <UploadFile infoTopics={infoTopics}/>
                      <Col xs={6} className="videocol"><VideoContent videos={videoContent} infoTopics={infoTopics}/></Col>
                      <Col xs={6} className="documentcol"><DocumentContent documents={documentContent} infoTopics={infoTopics}/></Col>
                      
                    </Tab>
                    <Tab eventKey="2" title="Videoer" className="tab">
                      <UploadFile infoTopics={infoTopics}/>
                     <VideoContent videos={videoContent} infoTopics={infoTopics}/>
                    </Tab>
                    <Tab eventKey="3" title="Dokumenter" className="tab">
                      <UploadFile infoTopics={infoTopics}/>
                      <DocumentContent documents={documentContent} infoTopics={infoTopics}/>
                    </Tab>
                  </Tabs>
                </Col>
       
      </Row>
      </Container>
            </div>
    );
}

export default Kunnskapsportalen;