import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import FileLink from "../FileLink";
import LikeButton from "../LikeButton";
import EditComment from "./EditComment";
import { host } from "../../App";

moment.locale("nb");

const Comment = ({ users, initComment, deleteComment }) => {
  const initMount = useRef(true);

  const { user } = useContext(UserContext);

  const [comment, setComment] = useState(initComment);
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect( async () => {
  //   if (initMount.current) {
  //     initMount.current = false
  //   } else {
  //     const res = await fetch(`https://localhost:44361/comments/${comment.id}`)
  //     const data = await res.json();
  //     setComment(data)
  //   }
  // }, [liked])

  const editComment = async (comment, file) => {
    let formData = new FormData();
    if (file) {
      formData.append("File", file);
      formData.append("commentId", comment.id);
      formData.append("userId", comment.userId);
      const upres = await fetch(host + "UploadDocument", {
        method: "POST",
        body: formData,
      });
      const updata = await upres.json();
      comment.documentId = updata.id;
    }

    formData = new FormData();
    for (let k in comment) {
      formData.append(k, comment[k]);
    }
    const res = await fetch(host + `comments/${comment.id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();

    setComment(data);

    // const updatedComments = comments.map(comment => {
    //   if (comment.id === data.id) {
    //     const updateComment = {
    //       ...comment,
    //       content: data.content,
    //       documentId: data.documentId
    //     }
    //     return updateComment
    //   }
    //   return comment
    // })
    // console.log("LOLOLOL")
    // setComments(updatedComments)
  };

  const setCommentLikeCount = (num) => {
    const updatedComment = {
      ...comment,
      like_Count: comment.like_Count + num,
    };
    setComment(updatedComment);
  };

  return (
    <Card>
      <Card.Body>
        <div className="float-left">
          
          <p>Postet av{" "}
          {comment.userId === null ? <b>[Slettet bruker]</b> : 
            <b>{users && users.length && users.find(u => u.id === comment.userId).username}</b>} {" "}
          {moment(comment.date).calendar()}&nbsp;
          {comment.edited ? <i style={{color: "gray"}}>(Redigert {moment(comment.editDate).calendar()})</i> : ""}
          </p>
        </div><div className="float-right"> 
          {comment.like_Count} <LikeButton id={comment.id} liked={liked} setLiked={setLiked} isPost={false} updateCommentLike={setCommentLikeCount} />
          </div>
        
        
        <Card.Text><br /><br />
          {comment.content}
          <br />
          <br />
          <div className="float-left">
            {comment.documentId ? (
              <p>
                Vedlegg:{" "}
                <b>
                  <FileLink fileId={comment.documentId} />
                </b>
              </p>
            ) : (
              ""
            )}
          </div>
          
          <div className="float-right">
            {(user.id === comment.userId) && <EditComment comment={comment} edit={editComment} />}
            {
              ((user.id === comment.userId) || user.admin) &&
              <Button
                variant="danger"
                size="sm"
                onClick={handleShow}
                value={comment.id}
              >
                Slett
              </Button>
            }
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Slett Kommentar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Er du sikker på at du vil slette din kommentar?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Avbryt
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteComment}
                  value={comment.id}
                >
                  Slett
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
