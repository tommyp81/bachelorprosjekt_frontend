import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import FileLink from "../FileLink";
import LikeButton from "../LikeButton";
import EditComment from "./EditComment";
import "./Comment.css"
import { host } from "../../App";

moment.locale("nb");

const Comment = ({ initComment, deleteComment }) => {
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
    <div className="Comment">
    <Card>
      <Card.Body>
        <Card.Text>
        <div className="float-left">
          
          <p>Postet av{" "}
          {comment.userId === null ? <b>[Slettet bruker]</b> : 
            <b>{comment.userId}</b>} {" "}
          {moment(comment.date).calendar()}&nbsp;
          {comment.edited ? <i style={{color: "gray"}}>(Redigert {moment(comment.editDate).calendar()})</i> : ""}
          </p>
        </div>
        </Card.Text>
        
        <Card.Text>
          <br />
          <div className="commentcontent">
          {comment.content}
          </div>
          <br />
          
          <div className="postattachment" style={{color: "grey"}}>
            {comment.documentId ? 
              (<>Vedlegg: <b><FileLink fileId={comment.documentId}/></b></>) 
              : 
              ("")}
          </div>

          {((user.id === comment.userId) || user.admin) ? 
          <div className="editdelete">
            {(user.id === comment.userId) && <EditComment comment={comment} edit={editComment} />} &nbsp;
            {((user.id === comment.userId) || user.admin) &&
              <Button
                variant="danger"
                size="sm"
                onClick={handleShow}
                value={comment.id}>
                Slett
              </Button>}
           
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Slett kommentar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Er du sikker på at du vil slette din kommentar?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Avbryt
                </Button>
                &nbsp;
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
          : ""}
          
          <div className="like"> 
          {comment.like_Count}&nbsp;<LikeButton id={comment.id} liked={liked} setLiked={setLiked} isPost={false} updateCommentLike={setCommentLikeCount} />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
};

export default Comment;
