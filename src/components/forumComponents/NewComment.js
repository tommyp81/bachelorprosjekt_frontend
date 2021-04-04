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

  function submitComment(event) {
    event.preventDefault();
    createNew({content, date: moment().toISOString(), userId: user.id, postId: pId}, file)
    setContent("")
    setFile(null)
    
  }


  return (
    <div className="NewComment">
      <Form onSubmit={submitComment}>
        <Tabs defaultActiveKey="1" >
          <Tab eventKey="1" title="Kommentar">
            <Form.Group >
              <Form.Control as="textarea" rows={3} name="comment" value={content} placeholder="Legg til en kommentar..." onChange={e => setContent(e.target.value)}/>
              {!file ? "" : 
                <p className="float-left" style={{color: "white"}}>Filen <b>{file.name}</b> er lagt ved.</p>
              }
            </Form.Group>
          </Tab>
          <Tab eventKey="2" title="Vedlegg">
            <FileDrop file={file} setFile={setFile}/>
          </Tab>
        </Tabs>
        <Form.Group>
          <Button disabled={!validateForm()} type="submit" className="float-right" variant="success" >Send inn</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default NewComment;