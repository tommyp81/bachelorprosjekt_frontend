import React, { useState } from 'react';
import {Button, Row, Col, Card} from "react-bootstrap";
import {Link} from 'react-router-dom'
import "./Kunnskapsportalen.css";

const DocumentContent = ({ document, infoTopics }) => { 

    return (
        <div className="content">
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
    )
}

export default DocumentContent
