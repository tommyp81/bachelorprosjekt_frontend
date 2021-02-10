import React, { useState } from "react"; 
import { Form, Button, Container } from "react-bootstrap";

function NewPost () {

const [newPost, setNewPost] = useState("");

function validateForm() {
    return newPost.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

    return (
    <div className="NewPost">
        <Container>
        <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1" onSubmit={handleSubmit}>
            <Form.Label><h1>Ny post i Underkategori</h1></Form.Label>
            <Form.Control 
                as="textarea" 
                rows={3}
                name="newPost"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                />
            </Form.Group>
            <Button
                variant="danger"
                type="submit">
                Avbryt
            </Button>
            <Button 
                className="float-right"
                variant="success" 
                type="submit"
                disabled={!validateForm()}>
                Send inn
            </Button>
        </Form>
        </Container>
    </div>
    );
}

export default NewPost;