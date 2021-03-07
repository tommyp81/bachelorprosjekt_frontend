import React, { useContext, useState } from "react"; 
import { Form, Button, Container, Modal, Dropdown } from "react-bootstrap";
import moment from 'moment'
import { UserContext } from "../../UserContext";

function NewPost ({subtopic, topicFocus, add}) {

  const { user } = useContext(UserContext)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function validateForm() {
    return content.length > 0;
  }

function handleSubmit(event) {
    event.preventDefault();

    add({ title, content, date: moment().toISOString(), userId: user.id, subTopicId: Number(subtopic), topicId: topicFocus})
  }

    return (
    <div className="NewPost">
        <Button 
        variant="primary" 
        onClick={handleShow} 
        disabled={!subtopic}>
        + Ny post
        </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ny post i {subtopic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1" onSubmit={handleSubmit}>

              <Form.Control
                type="text"
                rows={1}
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <Form.Control 
                  as="textarea" 
                  rows={5}
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
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