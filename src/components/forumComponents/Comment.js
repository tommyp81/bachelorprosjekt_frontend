import moment from "moment";
import React, { useContext, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../../App";
import FileLink from "../FileLink";
import LikeButton from "../LikeButton";
import EditComment from "./EditComment";
import "./Comment.css";
import { host } from "../../App";

moment.locale("nb");

const Comment = ({ initComment, deleteComment }) => {
  const { user } = useContext(UserContext);

  const [comment, setComment] = useState(initComment);
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editComment = async (comment, file) => {
    let formData = new FormData();
    if (file) {
      formData.append("File", file);
      formData.append("commentId", comment.id);
      formData.append("userId", comment.userId);
      const upres = await fetch(host + "UploadDocument", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });
    const data = await res.json();

    setComment(data);
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
              <p style={{ color: "rgb(75, 75, 75)" }} role="userinfo">
                Postet av{" "}
                {comment.userId === null ? (
                  <b>[Slettet bruker]</b>
                ) : (
                  <b>{comment.username}</b>
                )}{" "}
                {moment(comment.date).calendar()}&nbsp;
                {comment.edited ? (
                  <i style={{ color: "gray" }}>
                    (Redigert {moment(comment.editDate).calendar()})
                  </i>
                ) : (
                  ""
                )}
              </p>
            </div>
          </Card.Text>

          <Card.Text>
            <br />
            <div className="commentcontent" role="commentcontent">
              {comment.content}
            </div>
            <br />

            <div
              className="attachment"
              style={{ color: "rgb(75, 75, 75)" }}
              role="attachment"
            >
              {comment.documentId ? (
                <>
                  Vedlegg:{" "}
                  <b>
                    <FileLink fileId={comment.documentId}/>
                  </b>
                </>
              ) : (
                ""
              )}
            </div>

            {user.id === comment.userId || user.admin ? (
              <div className="editdelete" role="editdelete">
                {user.id === comment.userId && (
                  <EditComment comment={comment} edit={editComment} />
                )}
                &nbsp;
                {(user.id === comment.userId || user.admin) && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleShow}
                    value={comment.id}
                  >
                    Slett
                  </Button>
                )}
                <Modal show={show} onHide={handleClose} role="confirmdelete">
                  <Modal.Header closeButton>
                    <Modal.Title>Slett kommentar</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Er du sikker p?? at du vil slette din kommentar?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} role="cancel">
                      Avbryt
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={deleteComment}
                      value={comment.id}
                      role="delete"
                    >
                      Slett
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : (
              ""
            )}

            <div className="like" role="likebutton">
              {comment.like_Count}&nbsp;
              <LikeButton
                id={comment.id}
                liked={liked}
                setLiked={setLiked}
                isPost={false}
                updateCommentLike={setCommentLikeCount}
              />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
