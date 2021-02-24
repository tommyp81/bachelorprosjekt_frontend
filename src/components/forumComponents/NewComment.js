import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import moment from 'moment'

function NewComment({createNew, pId, user}) {

  const [content, setContent] = useState("");

  function validateForm() {
    return content.length > 0;
  }

  function submitComment(event) {
    event.preventDefault();

    createNew({content, date: moment().toISOString(), userId: user.id, postId: pId})
    setContent("")
    
  }


  return (
    <div className="NewComment">
      <Form onSubmit={submitComment}>
        <Form.Group >
          <Form.Control as="textarea" rows={3} name="comment" value={content} onChange={e => setContent(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Button disabled={!validateForm()} type="submit" className="float-left" variant="success" >Comment</Button>
        </Form.Group>
      </Form>

    </div>
  );
}

export default NewComment;