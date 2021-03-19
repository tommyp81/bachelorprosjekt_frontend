import React, { useContext, useState, useMemo } from "react"; 
import { Form, Button, Container, Modal, Dropdown } from "react-bootstrap";
import moment from 'moment'
import "./Forum.css"
import { UserContext } from "../../UserContext";

import Dropzone from 'react-dropzone'
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

function NewPost ({ subtopicTitle, subtopic, topicFocus, add, history }) {


  // const [fileAccepted, setFileAccepted] = useState(false)
  // const style = useMemo(() => ({
  //   ...dropStyle,
  //   ...fileAccepted ? acceptDropStyle : {}
  // }), [fileAccepted])

  const { user } = useContext(UserContext)

  const [file, setFile] = useState();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    // setFileAccepted(false)
    setShow(false);
  }
  const handleShow = () => {
    setFile(null);
    setTitle("");
    setContent("");
    setShow(true);
  }

  function validateForm() {
    return content.length > 0 && content.length <= 4000
    && title.length > 0 && title.length <= 100;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    submitPost();
    
    setTitle("")
    setContent("")
    setFile(null)
    
  }

  const submitPost = async () => {
    let postId = await add({ 
      title, 
      content, 
      date: moment().toISOString(), 
      userId: user.id, 
      subTopicId: Number(subtopic), 
      topicId: topicFocus
    }, file)
    history.push(`/Forum/${postId}`)
  } 

  // const handleDrop = acceptedFile => setFile(acceptedFile[0])

  // const handleAccept = () => setFileAccepted(true)

    return (
    <div className="NewPost">
      {!subtopicTitle ? <p>Velg en underkategori for å opprette en ny post.</p> :
        <Button 
        variant="primary" 
        onClick={handleShow} 
        disabled={!subtopic}
        >
        + Ny post
        </Button>
    }

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Ny post i {subtopicTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1" onSubmit={handleSubmit}>

              <Form.Control
                type="text"
                rows={1}
                name="title"
                value={title}
                placeholder="Tittel"
                onChange={e => setTitle(e.target.value)}
              />

              <Form.Control 
                  as="textarea" 
                  rows={5}
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
              {/* <Dropzone onDrop={handleDrop} maxFiles={1} onDropAccepted={handleAccept}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    {file ? <p>{file.name} &#10003;</p> : <p>Drag'n'drop fil, eller klikk for å velge en fil.</p> }
                  </div>
                )}
              </Dropzone> */}
              <FileDrop file={file} setFile={setFile} />
              <Button variant="secondary" onClick={handleClose}>
                Avbryt
              </Button>
              <Button type="submit" variant="success" onClick={handleClose} disabled={!validateForm()}>
                Send inn
              </Button>

            </Form.Group>

        </Form> 
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </div>
    );
}

export default NewPost;