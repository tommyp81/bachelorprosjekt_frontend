import React, { useState } from "react"; 
import { Form, Button, Container, Modal } from "react-bootstrap";

function NewPost () {

const [newPost, setNewPost] = useState("");
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

function validateForm() {
    return newPost.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

    return (
    <div className="NewPost">
        <Button variant="primary" onClick={handleShow}>
        + Ny post i Underkategori
        </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ny post i Underkategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1" onSubmit={handleSubmit}>

            <Form.Control 
                as="textarea" 
                rows={5}
                name="newPost"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                />
            </Form.Group>

        </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Avbryt
          </Button>
          <Button variant="success" onClick={handleClose} disabled={!validateForm()}>
            Send inn
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
}

export default NewPost;