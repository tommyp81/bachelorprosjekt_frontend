import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function NewComment() {

  const [newComment, setNewComment] = useState("");

  function validateForm() {
    return newComment.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="NewComment">
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1" onSubmit={handleSubmit}>
          <Form.Label>Skriv en kommentar</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          disabled={!validateForm()}>
          Send inn
        </Button>
      </Form>

    </div>
  );
}

export default NewComment;