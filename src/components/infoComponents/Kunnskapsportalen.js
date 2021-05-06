import React, { Component, useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'

import {Row, Col, Container, Tabs, Tab, Card, Button, Image} from "react-bootstrap";
import InfoTopics from "./InfoTopics.js";
import UploadFile from "./UploadFile.js";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import SearchContent from "./SearchContent.js"
import "./Kunnskapsportalen.css";
import { UserContext } from '../../UserContext.js';
import { host } from '../../App.js';
import Pages from '../forumComponents/Pages.js';
 
const Kunnskapsportalen = ({ infoTopics, addPost, deletePost }) => {

  const {user} = useContext(UserContext);


  
  const [tabKey, setTabKey] = useState('videos')

  // documents stuff
  
  // Videos stuff
  // `videos?infoTopicId=${}&pageNumber=${}&pageSize=${}&sortOrder=${}&sortType=${}`
  

    // Documents
    // `GetDocuments?infoTopicId=${}&pageNumber=${}&pageSize=${}&sortOrder=${}&sortType=${}`
  

  return (
      <div className="Kunnskapsportalen">
            <Container style={{display: 'flex', flexDirection: 'column'}}>
              
              <h1>Kunnskapsportalen</h1><br/>
            
              
            <Row>
              <Col lg={12} className="maincontent">
                
                <Tabs defaultActiveKey="videos" className="tabs" as={Button} variant="pills" activeKey={tabKey} onSelect={k => setTabKey(k)}>
                  <Tab eventKey="videos" title="Videoer" className="tab">
                    <VideoContent infoTopics={infoTopics} deletePost={deletePost} addPost={addPost}/>
                  </Tab>
                  <Tab eventKey="documents" title="Dokumenter" className="tab">
                    <DocumentContent infoTopics={infoTopics} />
                  </Tab>
                  
                </Tabs>
              </Col>
      
    </Row>
    </Container>
          </div>
  );
}

export default Kunnskapsportalen;