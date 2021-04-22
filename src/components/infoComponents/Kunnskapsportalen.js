import React, { Component, useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import "./Kunnskapsportalen.css";
import { UserContext } from '../../UserContext.js';
 
const Kunnskapsportalen = ({ infoTopics, videos, documents, users, addPost, deletePost }) => {

  const {user} = useContext(UserContext);
 
    const [videoContent, setVideoContent] = useState([])
    const [documentContent, setDocumentContent] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
      setVideoContent(videos)
      setDocumentContent(documents)
    }, [videos, documents])

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
                  {user.id == 8 &&
                    <UploadFile infoTopics={infoTopics} documents={documents} setVideos={setVideoContent} setDocuments={setDocumentContent} addPost={addPost}/>
                  }
                  <Tabs defaultActiveKey={useCheckMobileScreen ? "2" : "1"} className="tabs" as={Button} variant="pills">
                    {useCheckMobileScreen ? <Tab eventKey="1" title="Vis alt" className="tab" id="hidden">
                      <Col xs={6} className="videocol"><VideoContent videos={videoContent} infoTopics={infoTopics} deletePost={deletePost} setVideoContent={setVideoContent}/></Col>
                      <Col xs={6} className="documentcol"><DocumentContent documents={documentContent} infoTopics={infoTopics} setDocumentContent={setDocumentContent}/></Col>
                      
                    </Tab> : ""
                    }
                    <Tab eventKey="2" title="Videoer" className="tab">
                     <VideoContent videos={videoContent} infoTopics={infoTopics} deletePost={deletePost} setVideoContent={setVideoContent}/>
                    </Tab>
                    <Tab eventKey="3" title="Dokumenter" className="tab">
                      <DocumentContent documents={documentContent} infoTopics={infoTopics} setDocumentContent={setDocumentContent}/>
                    </Tab>
                  </Tabs>
                </Col>
       
      </Row>
      </Container>
            </div>
    );
}

export default Kunnskapsportalen;