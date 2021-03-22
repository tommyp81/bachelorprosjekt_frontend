import React, { useContext, useState } from "react";
import { Form, Button, Tabs, Tab } from "react-bootstrap";
import moment from 'moment'
import "./Post.css";
import { UserContext } from "../../UserContext";
import FileDrop from '../FileDrop'

function NewComment({createNew, pId}) {

  const { user } = useContext(UserContext)

  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  function validateForm() {
    return content.length > 0;
  }

  function submitComment() {
    createNew({content, date: moment().toISOString(), userId: user.id, postId: pId}, file)
    setContent("")
    setFile(null)
    
  }


  return (
    <div className="NewComment">
      <Tabs defaultActiveKey="1" >
        <Tab eventKey="1" title="Kommentar">
          <Form onSubmit={submitComment}>
            <Form.Group >
              <Form.Control as="textarea" rows={3} name="comment" value={content} placeholder="Legg til en kommentar..." onChange={e => setContent(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Button disabled={!validateForm()} type="submit" className="float-right" variant="success" >Send inn</Button>
            </Form.Group>
          </Form>
        </Tab>
        <Tab eventKey="2" title="Vedlegg">
          <FileDrop file={file} setFile={setFile} />
        </Tab>
      </Tabs>
      

    </div>
  );
}

export default NewComment;