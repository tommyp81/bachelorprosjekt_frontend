import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import FileDrop from "../FileDrop";
import FileInfo from "../FileInfo";

const EditComment = ({ comment, edit }) => {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFile(null);
    setShow(true);
  };
  const isReplaced = Boolean(file);

  useEffect(() => {
    setContent(comment.content);
  }, []);

  function validateForm() {
    return content.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let editedComment = {
      id: comment.id,
      content,
      date: comment.date,
      userId: comment.userId,
      postId: comment.postId,
      like_Count: comment.like_Count,
    };
    if (comment.documentId) {
      editedComment = {
        ...editedComment,
        documentId: comment.documentId,
      };
    }
    edit(editedComment, file);
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Rediger
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rediger kommentar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              onSubmit={handleSubmit}
            >
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              {comment.documentId ? (
                <FileInfo fileId={comment.documentId} isReplaced={isReplaced} />
              ) : (
                ""
              )}
              <FileDrop file={file} setFile={setFile} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Avbryt
          </Button>
          <Button
            type="submit"
            variant="success"
            onClick={handleClose}
            disabled={!validateForm()}
          >
            Send inn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditComment;
