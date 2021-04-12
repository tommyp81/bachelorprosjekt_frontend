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
import {Row, Col, Container} from "react-bootstrap";
import "./Kunnskapsportalen.css";
import FileDrop from "../FileDrop";
import validator from "validator";

const UploadFile = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const regExp = /(.+?)(\/)(watch\x3Fv=)?(embed\/watch\x3Ffeature\=player_embedded\x26v=)?([a-zA-Z0-9_-]{11})/g;

  /*const validateUrl = (event) => {
    if (validator.isURL(event)) {
      setValidated(true);
    } else {
      setErrorMessage("Ugyldig URL");
      setValidated(false);
    }
  }*/

  const handleSubmit = (event) => {
    /*const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }*/

    //setValidated(true);

    const match = regExp.exec(id)
    const matchString = match[match.length-1].toString()

    const data = new Object();
    data.youTubeId = matchString;
    data.title = title;
    data.description = description;
    data.userId = 2;                     // SKAL IKKE VÆRE HARDKODET USERID
    data.infoTopicId = 2;                // SKAL IKKE VÆRE HARDKODET INFOTOPICID
    
    console.log("Objektet:")
    console.log(data)

    fetch('https://webforum.azurewebsites.net/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.json()
            })
                .then(data => console.log(data))
                .catch(error => console.log(error))


  };

  return (
    <div>
      <Form>
        <Form.Group>    
        <Form.Control
        type="text"
        rows={1}
        name="youTubeId"
        value={id}
        placeholder="Youtube ID"
        onChange={e => setId(e.target.value)}
        />
        <Form.Control
        type="text"
        rows={1}
        name="youTubeTitle"
        value={title}
        placeholder="Youtube Title"
        onChange={e => setTitle(e.target.value)}
        />
        <Form.Control
        type="text"
        rows={1}
        name="youTubeDescription"
        value={description}
        placeholder="Youtube Description"
        onChange={e => setDescription(e.target.value)}
        />
        </Form.Group>
        <Button className="float-right" type="submit" variant="success" onClick={handleSubmit}>
        Send
        </Button>
      </Form>
    </div>
  );
};

export default UploadFile;



    {/*<div className="UploadFile">
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
            <br/>
            <Form.Label>Beskrivelse</Form.Label>
            <Form.Control as="textarea" rows={3} required></Form.Control>
            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: 11, fontWeight: "bold", color: "red" }}
            >
              Beskrivelse kreves!
            </Form.Control.Feedback>
            <br/>
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
              </div>*/}


{/*
const SendYoutubeId = ({users, infoTopicId}) => {

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const regExp = /(.+?)(\/)(watch\x3Fv=)?(embed\/watch\x3Ffeature\=player_embedded\x26v=)?([a-zA-Z0-9_-]{11})/g;

    function sendRegex() {
        
        const match = regExp.exec(id)
        const matchString = match[match.length-1].toString();

        const data = new Object();
        data.youTubeId = matchString;
        data.title = title;
        data.description = description;
        data.userId = 2;                     // SKAL IKKE VÆRE HARDKODET USERID
        data.infoTopicId = 2;                // SKAL IKKE VÆRE HARDKODET INFOTOPICID
        
        console.log("Objektet:")
        console.log(data)
                

            fetch('https://webforum.azurewebsites.net/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => {
                return res.json()
            })
                .then(data => console.log(data))
                .catch(error => console.log("ERROR"))
        }


    return(
        <div>
            <Form>
                <Form.Group>    
                <Form.Control
                type="text"
                rows={1}
                name="youTubeId"
                value={id}
                placeholder="Youtube ID"
                onChange={e => setId(e.target.value)}
                />
                <Form.Control
                type="text"
                rows={1}
                name="youTubeTitle"
                value={title}
                placeholder="Youtube Title"
                onChange={e => setTitle(e.target.value)}
                />
                <Form.Control
                type="text"
                rows={1}
                name="youTubeDescription"
                value={description}
                placeholder="Youtube Description"
                onChange={e => setDescription(e.target.value)}
                />
                </Form.Group>
                <Button className="float-right" type="submit" variant="success" onClick={sendRegex}>
                Send
                </Button>
            </Form>
        </div>
    )
}

export default SendYoutubeId; */}
