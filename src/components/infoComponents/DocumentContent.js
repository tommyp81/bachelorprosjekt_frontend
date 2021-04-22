import React, { useState } from 'react';
import {Button, Row, Col, Card} from "react-bootstrap";
import { FileEarmarkTextFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom'
import FileLink from '../FileLink';
import moment from 'moment'
import { host } from '../../App'
import "./Kunnskapsportalen.css";

const DocumentContent = ({ documents, infoTopics }) => { 

    return (
        <div className="DocumentContent">
       {documents.map((mappedDocuments, i) => (
          <a href={host+`GetDocument/${mappedDocuments.id}`}
          style={{textDecoration: "none", color: "unset"}}>
          <Card>
          <Card.Body>
          <Row>
            
            <Col>
            <div className="content">
            {infoTopics.filter(infoTopics => (infoTopics.id === mappedDocuments.infoTopicId)).map((filteredTopics, i) => (
            <div className="toptext">Delt {moment(mappedDocuments.uploaded).calendar()} i {filteredTopics.title}</div>))}<br/>
            <h3 className="title">  
              <FileEarmarkTextFill className="iconmobile"/>{" "}
              <FileLink fileId={mappedDocuments.id}/>
            </h3><br/><br/>
            <p>Klikk for å laste ned</p>
            </div>
            </Col>
            <Col>
            
            <div className="contentimg"><FileEarmarkTextFill style={{height:"150px", width:"150px"}} className="icon"/></div>
            </Col>
            </Row>
          </Card.Body>
          </Card></a>
          ))}
      </div>
    )
}

export default DocumentContent
