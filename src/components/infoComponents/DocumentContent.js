import React, { useState } from 'react';
import {Button, Row, Col, Card} from "react-bootstrap";
import {Link} from 'react-router-dom'
import FileLink from '../FileLink';
import "./Kunnskapsportalen.css";

const DocumentContent = ({ documents, infoTopics }) => { 

  function titleLength(str) {
    if (str.length > 25) {
      return str.substring(0, 25) + "..."
    } else {
      return str;
    }
  }

    return (
        <div className="DocumentContent">
       {documents.map((mappedDocuments, i) => (
          <Card>
          <Card.Body>
            <div className="left"><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
            </svg></div>
            <div className="docright">
            {infoTopics.filter(infoTopics => (infoTopics.id === mappedDocuments.infoTopicId)).map((filteredTopics, i) => (
            <div className="toptext">Delt i {filteredTopics.title}</div>))}<br/>
            <h3 className="title">{titleLength(<FileLink fileId={mappedDocuments.id} />)}</h3>
            
            <Link to="/Forum">Diskuter i forumet</Link></div>
          </Card.Body>
          </Card>
          ))}
      </div>
    )
}

export default DocumentContent
