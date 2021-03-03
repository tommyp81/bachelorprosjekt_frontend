import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from "react-bootstrap";
import "./Post.css";

const EditPost = ({post, edit}) => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    setContent(post.content || "")
    setTitle(post.title || "")
  }, [post])

  function validateForm() {
    return title.length && content.length > 0;
  }


  function handleSubmit(event) {
    event.preventDefault();
    edit({ 
      id: post.id, 
      title, 
      content, 
      date: post.date, 
      userId: post.userId, 
      subTopicId: post.subTopicId
    })
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow} >
        Rediger
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rediger post</Modal.Title>
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
    </>
  )
}

export default EditPost
