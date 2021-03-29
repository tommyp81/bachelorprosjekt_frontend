import { React, useState } from "react";
import "./Kunnskapsportalen.css";
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

const UploadFile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value) => {
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
              <Form onChange={(e) => validate(e.target.value)}>
                <h4>Lim inn YouTube-URL *</h4>
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
