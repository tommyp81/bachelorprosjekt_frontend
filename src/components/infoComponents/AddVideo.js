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

const AddVideo = ({
  infoTopics,
  setVideos,
  addPost,
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
  const validateUrl = (event) => {
    if (validator.isURL(event)) {
      setValidated(true);
      setErrorMessage("Gyldig URL");
    } else {
      setErrorMessage("Ugyldig URL");
      setValidated(false);
    }
  };
  const twoMethods = (event) => {
    setId(event);
    validateUrl(event);
  };
  //Video
  const regExp = /(.+?)(\/)(watch\x3Fv=)?(embed\/watch\x3Ffeature\=player_embedded\x26v=)?([a-zA-Z0-9_-]{11})/g;

  const handleSubmitVideo = async (event) => {
    event.preventDefault();
    // if (infoTopicId == 0) {
    //   alert("Ikke valgt kategori");
    //   return;
    // }
    /*const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }*/

    //setValidated(true);

    const match = regExp.exec(id);
    if (match) {
      const matchString = match[match.length - 1].toString();

      const postData = {
        title,
        content: description,
        userId: user.id,
        subTopicId: Number(infoTopicId) + 16, // TODO
        topicId: 5,
      };

      console.log(postData);

      const postId = await addPost(postData);


      const videoData = {
        youtubeId: matchString,
        title,
        description,
        userId: user.id,
        postId,
        infoTopicId,
      };

      // const data = new Object();
      // data.youTubeId = matchString;
      // data.title = title;
      // data.description = description;
      // data.userId = 8;    // SKAL IKKE VÆRE HARDKODET USERID
      // data.infoTopicId = infoTopicId;

      console.log("Objektet:");
      console.log(videoData);

      fetch(host + "Videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setVideos((current) => [...current, data]);
        })
        .catch((error) => console.log(error));

      handleClose();
    } else {
      alert("YouTube-URL-feltet kan ikke være tomt.")
    }
  };

  //Dokument

  return (
    <div className="UploadFile">
      <Button onClick={handleShow} variant="primary">
        Last opp
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Legg inn Youtube video</Modal.Title>
        </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated}>
                <Form.Group>
                  <Form.Label>YouTube-URL</Form.Label>
                  <Form.Control
                    type="text"
                    rows={1}
                    name="youTubeId"
                    value={id}
                    onChange={(e) => twoMethods(e.target.value)}
                  />
                  <span
                    style={{ fontSize: 11, fontWeight: "bold", color: "red" }}
                  >
                    {errorMessage}
                  </span>
                  <br />

                  <Form.Label>Tittel</Form.Label>
                  <Form.Control
                    type="text"
                    rows={1}
                    name="youTubeTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <br />

                  <Form.Label>Beskrivelse</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="youTubeDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <br />

                  <Form.Label>Velg kategori</Form.Label>
                  <Form.Control
                    as="select"
                    required
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
                    onClick={handleSubmitVideo}
                  >
                Send
                  </Button>
                </div>
              </Form>
            </Modal.Body>
        <Modal.Body></Modal.Body>
      </Modal >
    </div >
  );
};

export default AddVideo;
