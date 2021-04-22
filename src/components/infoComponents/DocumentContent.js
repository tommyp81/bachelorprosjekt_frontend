import React, { useContext, useState } from 'react';
import {Button, Row, Col, Card} from "react-bootstrap";
import { FileEarmarkTextFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom'
import { host } from '../../App';
import { UserContext } from '../../UserContext';
import FileLink from '../FileLink';
import moment from 'moment'
import "./Kunnskapsportalen.css";

const DocumentContent = ({ documents, infoTopics, setDocumentContent }) => { 

  const {user} = useContext(UserContext)

  const deleteDocument = async (id) => {
    const res = await fetch(host+`DeleteDocument/${id}`, {
      method: 'DELETE'
    })
    if(res.ok)
      setDocumentContent(documents.filter(d => d.id != id))
    else
      alert("Feil ved sletting av dokument")
  }

    return (
        <div className="DocumentContent">
       {documents.map((mappedDocuments, i) => (
          <a href={host+`GetDocument/${mappedDocuments.id}`}
          style={{textDecoration: "none", color: "unset"}}>
          <Card>
          <Card.Body>
            <div className="float-right" hidden={!(user.id === mappedDocuments.userId)} >
              <Button variant="danger" size="sm" onClick={() => deleteDocument(mappedDocuments.id)}>Slett</Button>
            </div>
          <Row>
            
            <Col>
            <div className="content">
            {infoTopics.filter(infoTopics => (infoTopics.id === mappedDocuments.infoTopicId)).map((filteredTopics, i) => (
            <div className="toptext">Delt {moment(mappedDocuments.uploaded).calendar()} i {filteredTopics.title}</div>))}<br/>
            <div className="title">  
              <FileEarmarkTextFill className="iconmobile"/>{" "}
              <FileLink fileId={mappedDocuments.id}/>
            </div><br/><br/>
            <p>Klikk for å laste ned</p>
            </div>
            </Col>
            <Col className="desktop"><FileEarmarkTextFill style={{height:"150px", width:"150px"}} className="icon"/>
            </Col>
            </Row>
          </Card.Body>
          </Card></a>
          ))}
      </div>
    )
}

export default DocumentContent
