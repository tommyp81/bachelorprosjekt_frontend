import React, { useContext, useState } from "react";
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
import { Row, Col, Container } from "react-bootstrap";
import "./Kunnskapsportalen.css";
import FileDrop from "../FileDrop";
import validator from "validator";
import { host } from "../../App";
import { UserContext } from "../../UserContext";

const AddDocument = ({
  infoTopics,
  setDocuments
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(UserContext);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [infoTopicId, setInfoTopicId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [validated, setValidated] = useState(false);
  //Video



  //Dokument

  const [file, setFile] = useState();

  const handleSubmitDocument = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (infoTopicId == 0) {
      setErrorMessage("Ikke valgt kategori");
      return;
    }
    let formData = new FormData();
    formData.append("File", file);
    formData.append("userId", user.id);
    formData.append("infoTopicId", infoTopicId);
    fetch(host + "UploadDocument", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDocuments((current) => [...current, data]);
      })
      .catch((error) => console.log(error));
    console.log(infoTopicId);
    handleClose();
  };

  return (
    <div className="UploadFile">
      <Button onClick={handleShow} variant="primary">
        Last opp
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Last opp dokument</Modal.Title>
        </Modal.Header>


        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group>
              <Form.Label>Velg fil</Form.Label>
              <FileDrop file={file} setFile={setFile} />
              <Form.Label>Velg kategori</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  console.log(e.target.value);
                  setInfoTopicId(e.target.value);
                }}
                custom
              >
                <option value="">Kategori...</option>
                {infoTopics.map((mappedInfoTopics, i) => (
                  <option key={i} value={mappedInfoTopics.id}>
                    {mappedInfoTopics.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="float-right">
              <Button variant="danger" onClick={handleClose}>
                Avbryt
                  </Button>
                  &nbsp;
                  <Button
                type="submit"
                variant="primary"
                onClick={handleSubmitDocument}
              >
                Send
                  </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  );
};

export default AddDocument;
