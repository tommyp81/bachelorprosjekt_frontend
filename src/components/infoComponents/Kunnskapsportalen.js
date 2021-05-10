import React, { useState } from 'react';

import { Row, Col, Container, Tabs, Tab, Button } from "react-bootstrap";
import VideoContent from "./VideoContent.js"
import DocumentContent from "./DocumentContent.js"
import "./Kunnskapsportalen.css";

const Kunnskapsportalen = ({ infoTopics, addPost, deletePost }) => {

  const [tabKey, setTabKey] = useState('videos')


  return (
    <div className="Kunnskapsportalen">
      <Container style={{ display: 'flex', flexDirection: 'column' }}>

        <h1>Kunnskapsportalen</h1><br />


        <Row>
          <Col lg={12} className="maincontent">

            <Tabs defaultActiveKey="videos" className="tabs" as={Button} variant="pills" activeKey={tabKey} onSelect={k => setTabKey(k)}>
              <Tab eventKey="videos" title="Videoer" className="tab">
                <VideoContent infoTopics={infoTopics} deletePost={deletePost} addPost={addPost} />
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