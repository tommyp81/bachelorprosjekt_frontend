import React, { useState } from "react";
import {
  Button,
  Tabs,
  Tab,
  Accordion,
  Card,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import FileDrop from "../FileDrop";
import validator from "validator";
const UploadFile = ({infoTopics}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");

  const validateUrl = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage("Gyldig URL");
    } else {
      setErrorMessage("Ugyldig URL");
    }
  };

  return (
    <div className="UploadFile">
      <Button onClick={handleShow} variant="primary">
        Last opp
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Last opp ny...</Modal.Title>
        </Modal.Header>
        <Tabs defaultActiveKey="0">
          <Tab title="Video" eventKey="0">
            <Modal.Body>
              <Form onChange={(e) => validateUrl(e.target.value)}>
                <Form.Label>Lim inn YouTube-URL *</Form.Label>
                <Form.Control type="input"></Form.Control>
              </Form>
              <span style={{ fontSize: 11, fontWeight: "bold", color: "red" }}>
                {errorMessage}
              </span>
            </Modal.Body>
          </Tab>
          <Tab title="Dokument" eventKey="1">
            <Modal.Body>
              <FileDrop />
            </Modal.Body>
          </Tab>
        </Tabs>
        <Modal.Body>
          <Form>
             <Form.Label>Tittel</Form.Label>
            <Form.Control type="input"></Form.Control>
            <Form.Label>Beskrivelse</Form.Label>
            <Form.Control as="textarea" rows={3}></Form.Control>
               <Form.Control as="select">{infoTopics.map((mappedInfoTopics) => (
              <option>{mappedInfoTopics.title}</option> ))}
            </Form.Control>
           
           
          </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Avbryt
          </Button>
          <Button variant="primary">Last opp</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadFile;
