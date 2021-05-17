import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import FileInfo from "../FileInfo";
import FileDrop from "../FileDrop";
import "./Post.css";

const EditPost = ({ post, edit }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();

  const isReplaced = Boolean(file);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setContent(post.content || "");
    setTitle(post.title || "");
  }, [post]);

  function validateForm() {
    return title.length && content.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let editedPost = {
      id: post.id,
      title,
      content,
      date: post.date,
      userId: post.userId,
      subTopicId: post.subTopicId,
      topicId: post.topicId,
    };
    if (post.documentId) {
      editedPost = {
        ...editedPost,
        documentId: post.documentId,
      };
    }
    edit(editedPost, file);
  }

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        role="editcomment"
      >
        Rediger
      </Button>
      <Modal show={show} onHide={handleClose} role="editpost" centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Rediger post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1"></Form.Group>
            <Form.Group>
              {" "}
              <Form.Label htmlFor="title">Tittel</Form.Label>
              <Form.Control
                type="text"
                rows={1}
                id="title"
                role="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="content">Innhold</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                id="content"
                role="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {post.documentId ? (
                <FileInfo fileId={post.documentId} isReplaced={isReplaced} />
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group>
              <FileDrop file={file} setFile={setFile} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} role="cancel">
              Avbryt
            </Button>
            <Button
              type="submit"
              variant="success"
              role="confirm"
              onClick={handleClose}
              disabled={!validateForm()}
            >
              Send inn
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditPost;
