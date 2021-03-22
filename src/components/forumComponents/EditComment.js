import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from "react-bootstrap";

const EditComment = ({comment, edit}) => {
  const [content, setContent] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    setContent(comment.content)
  }, [comment])

  function validateForm() {
    return content.length > 0;
  }

  function handleSubmit() {
    edit({ 
      id: comment.id, 
      content, 
      date: comment.date, 
      userId: comment.userId, 
      postId: comment.postId
    })
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow} >
        Rediger
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rediger kommentar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1" onSubmit={handleSubmit}>

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
    </>
  )
}

export default EditComment
