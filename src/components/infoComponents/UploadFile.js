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
const UploadFile = ({ infoTopics }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const validateUrl = (event) => {
    if (validator.isURL(event)) {
      setValidated(true);
    } else {
      setErrorMessage("Ugyldig URL");
      setValidated(false);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
              <Form
                noValidate
                validated={validated}
                onChange={(e) => validateUrl(e.target.value)}
              >
                <Form.Label>Lim inn YouTube-URL</Form.Label>
                <Form.Control type="input" required></Form.Control>
                <span
                  style={{ fontSize: 11, fontWeight: "bold", color: "red" }}
                >
                  {errorMessage}
                </span>
              </Form>
            </Modal.Body>
          </Tab>
          <Tab title="Dokument" eventKey="1">
            <Modal.Body>
              <FileDrop />
            </Modal.Body>
          </Tab>
        </Tabs>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>Tittel</Form.Label>
            <Form.Control type="input" required></Form.Control>
            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: 11, fontWeight: "bold", color: "red" }}
            >
              Tittel kreves!
            </Form.Control.Feedback>
            <Form.Label>Beskrivelse</Form.Label>
            <Form.Control as="textarea" rows={3} required></Form.Control>
            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: 11, fontWeight: "bold", color: "red" }}
            >
              Beskrivelse kreves!
            </Form.Control.Feedback>
            <Form.Control as="select" custom>
              {infoTopics.map((mappedInfoTopics) => (
                <option>{mappedInfoTopics.title}</option>
              ))}
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Avbryt
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Last opp
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadFile;
