import React, { useContext, useState, useMemo } from "react";
import { Form, Button, Container, Modal, Dropdown } from "react-bootstrap";
import moment from "moment";
import "./Forum.css";
import { UserContext } from "../../App";

import Dropzone from "react-dropzone";
import FileDrop from "../FileDrop";

// const dropStyle = {
//   textAlign: 'center',
//   padding: '10px',
//   borderWidth: '3px',
//   borderColor: '#eeeeee',
//   borderStyle: 'dashed',
//   backgroundColor: '#fafafa',
//   color: '#bdbdbd',
//   margin: '5px'
// }

// const acceptDropStyle = {
//   color: '#00e676'
// }

function NewPost({ subtopicTitle, subtopic, topicFocus, add, history }) {
  // const [fileAccepted, setFileAccepted] = useState(false)
  // const style = useMemo(() => ({
  //   ...dropStyle,
  //   ...fileAccepted ? acceptDropStyle : {}
  // }), [fileAccepted])

  const { user } = useContext(UserContext);

  const [file, setFile] = useState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    // setFileAccepted(false)
    setShow(false);
  };
  const handleShow = () => {
    setFile(null);
    setTitle("");
    setContent("");
    setShow(true);
  };

  function validateForm() {
    return (
      content.length > 0 &&
      content.length <= 4000 &&
      title.length > 0 &&
      title.length <= 100
    );
  }

  async function handleSubmit(event) {
    console.log("1");
    event.preventDefault();

    submitPost();

    setTitle("");
    setContent("");
    setFile(null);
  }

  const submitPost = async () => {
    console.log("2");
    let postId = await add(
      {
        title,
        content,
        userId: user.id,
        subTopicId: Number(subtopic),
        topicId: topicFocus,
      },
      file
    );
    history.push(`/Forum/${postId}`);
  };

  // const handleDrop = acceptedFile => setFile(acceptedFile[0])

  // const handleAccept = () => setFileAccepted(true)

  return (
    <div className="NewPost">
      {!subtopicTitle ? (
        <p>Velg en kategori og underkategori for å opprette en ny post.</p>
      ) : (
        <Button variant="primary" onClick={handleShow} disabled={!subtopic} role="newpost">
          + Ny post
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Ny post i {subtopicTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label htmlFor="title">Tittel</Form.Label>
              <Form.Control
                type="text"
                rows={1}
                name="title"
                id="title"
                role="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="content">Innhold</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                id="content"
                role="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <FileDrop file={file} setFile={setFile} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} role="cancel">
              Avbryt
            </Button>
            <Button
              role="confirm"
              type="submit"
              variant="success"
              onClick={handleClose}
              disabled={!validateForm()}
            >
              Send inn
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default NewPost;
