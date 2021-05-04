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
          <Card>
            <Card.Body>
                <Row>
                  <Col>
                  <div className="content">
                  {infoTopics.filter(infoTopics => (infoTopics.id === mappedDocuments.infoTopicId)).map((filteredTopics, i) => (
                    <p className="toptext" style={{color: "grey"}}>
                      Delt {moment(mappedDocuments.uploaded).calendar()} i {filteredTopics.title}
                    </p>
                    ))}
                  <div className="title">  
                    <FileEarmarkTextFill className="iconmobile"/>{" "}
                    <FileLink fileId={mappedDocuments.id}/>
                  </div><br/>
                  <p>Klikk for å laste ned</p>
                  <div hidden={!user.admin}>
                    <Button variant="danger" size="sm" onClick={() => deleteDocument(mappedDocuments.id)}>Slett</Button>
                  </div>
                  </div>
                  </Col>
                  <Col className="desktop"><FileEarmarkTextFill style={{height:"150px", width:"150px"}} className="icon"/>
                  
                  </Col>
                </Row>
            </Card.Body>
          </Card>
          ))}
      </div>
    )
}

export default DocumentContent
