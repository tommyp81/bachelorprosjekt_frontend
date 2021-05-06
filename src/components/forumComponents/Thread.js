import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Card, Form, Modal } from "react-bootstrap";
import moment from "moment";
import "moment/locale/nb";
import { useParams, Link } from "react-router-dom";
import Pages from "./Pages.js";
import "./Post.css";
import { host } from "../../App";

//import Header from '../mainComponents/Header'

import { Container, Button } from "react-bootstrap";

import NewComment from "./NewComment";
import EditPost from "./EditPost";
import EditComment from "./EditComment";
import { UserContext } from "../../UserContext";
import FileLink from "../FileLink";

import { FaRegComment, FaThumbsUp } from "react-icons/fa";
import LikeButton from "../LikeButton.js";
import Post from "./Post.js";
import Comment from "./Comment.js";
import Comments from "./Comments.js";
import { ArrowLeft } from "react-bootstrap-icons";
import { RiArrowLeftFill } from "react-icons/ri";
import SortItems from "./SortItems.js";

const Thread = ({
  subtopics,
  topics,
  history,
  deletePost,
}) => {
  const [comments, setComments] = useState([]);

  const { postId } = useParams();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState({});

  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sort, setSort] = useState({sortOrder: "Asc", sortType: "Date"})

  const commentsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)
  const [totalRecords, setTotalRecords] = useState(null)
  
  //Post
  useEffect(() => {
    fetch(host + `posts/${postId}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setPost(data);
      })
      .catch(() => {
        history.push("/error");
      });
    return () => setPost({});
  }, [postId]);

  // Comments
  useEffect(() => {
    fetch(host + 
      `comments?postId=${postId}
      &pageNumber=${currentPage}
      &pageSize=${commentsPerPage}
      &sortOrder=${sort.sortOrder}
      &sortType=${sort.sortType}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.data);
        setTotalPages(data.totalPages)
        setTotalRecords(data.totalRecords)
      })
      .catch(console.log);
  }, [currentPage, sort]);

  // const threadComments = comments.filter(c => Number(postId) === c.postId).slice(0).sort((d1, d2) => moment(d2.date) - moment(d1.date))


  const deleteThread = async () => {
    const success = deletePost(postId);
    if (success) history.push("/Forum");
    else alert("Feil ved sletting av post");
  };

  const editPost = async (post, file) => {
    let formData = new FormData();
    if (file) {
      formData.append("File", file);
      formData.append("postId", post.id);
      formData.append("userId", post.userId);
      const upres = await fetch(host + "UploadDocument", {
        method: "POST",
        body: formData,
      });
      const updata = await upres.json();
      post.documentId = updata.id;
    }

    formData = new FormData();
    for (let k in post) {
      formData.append(k, post[k]);
    }
    const res = await fetch(host + `posts/${post.id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    setPost(data);
  };

  const updatePostLike = (num) => {
    setPost({ ...post, like_Count: post.like_Count + num });
  };

  const deleteComment = async (e) => {
    let id = Number(e.target.value);
    const res = await fetch(host + `comments/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      setComments(comments.filter((comment) => comment.id !== id));
      setPost({ ...post, comment_Count: post.comment_Count - 1 });
      // updatePostInArray(post.id, { comment_Count: post.comment_Count - 1 });
    } else {
      alert("ERROR");
    }
  };

  const addComment = async (comment, file) => {
    const formData = new FormData();
    if (file) formData.append("File", file);
    for (let k in comment) {
      formData.append(k, comment[k]);
    }
    const res = await fetch(host + "comments", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setComments((current) => [...current, data]);

    setPost({ ...post, comment_Count: post.comment_Count + 1 });

    if (totalRecords % commentsPerPage === 0) setCurrentPage(totalPages + 1);
    else setCurrentPage(totalPages);
  };

  

  return (
    <div className="Post">
      {post != {} && (
        <Container style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="foruminfo"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "600",
            }}
          >
            <Link
              to="/Forum"
              style={{ textDecoration: "none", color: "white" }}
            >
              <RiArrowLeftFill size={20} />
              &nbsp;Tilbake til forum
            </Link>
            <div className="float-right">
              {topics
                .filter((topics) => topics.id === post?.topicId)
                .map((filteredTopics, i) => (
                  <p key={i}>
                    {filteredTopics.title}
                    &nbsp;-&nbsp;
                    {subtopics
                      .filter((subtopics) => subtopics.id === post?.subTopicId)
                      .map((filteredSubtopics) => filteredSubtopics.title)}
                  </p>
                ))}
            </div>
          </div>

          <div className="main">
            <Card>
              <Card.Body>
                <Card.Text>
                  <div className="float-left">
                  
                  <p>Postet av{" "}
                    {post.userId === null ? <b>[Slettet bruker]</b> : <b>{post.userId}</b>}{" "}
                    {moment(post.date).calendar()}&nbsp;
                    {post.edited ? <i style={{color: "gray"}}>(Redigert {moment(post.editDate).calendar()})</i> : ""}
                  </p>
                </div>
                </Card.Text>

                <Card.Title>
                  <br/>
                  {post.title}
                </Card.Title>

                <Card.Text>
                <div className="postcontent">
                  {post.content}
                </div>

                <div className="postattachment" style={{color: "grey"}}>
                  {post.documentId ? 
                    (<p>Vedlegg: <b><FileLink fileId={post.documentId}/></b></p>) 
                  : 
                    ("")}
                </div>
                </Card.Text>
                
                {((user.id === post.userId) || user.admin) ?
                <div className="editdelete">
                  {(user.id === post.userId) && <EditPost post={post} edit={editPost} />}&nbsp;
                  {((user.id === post.userId) || user.admin) &&
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleShow}
                      value={post.id}>
                      Slett
                    </Button>
                  }
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Slett Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Er du sikker på at du vil slette din post?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Avbryt
                      </Button>
                      <Button
                        variant="danger"
                        onClick={deleteThread}
                        value={post.id}
                      >
                        Slett
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div> 
                : ""}
                

                <div className="likecomment">
                  {post.comment_Count}
                  <FaRegComment
                    size={18}
                    color="grey"
                    className="ml-2 mr-2 mb-1"
                  />

                  &nbsp;

                  {post.like_Count}&nbsp;
                  <LikeButton
                    id={postId}
                    liked={liked}
                    setLiked={setLiked}
                    isPost={true}
                    updatePostLike={updatePostLike}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>

          {/*commentCount*/}

          <div className="comments">
            {post && !post.comment_Count ? (
              <h3>Ingen kommentarer</h3>
            ) : (
              <h3>Kommentarer</h3>
            )}
            {comments.map((c) => (
              <Comment
                key={c.id}
                initComment={c}
                deleteComment={deleteComment}
              />
            ))}
            {post.comment_Count > 0 && (
              <div className="d-flex justify-content-between">
                <SortItems setSort={setSort} isPost={false} />
                <Pages
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
          <div className="newcomment">
            <NewComment createNew={addComment} user={user} pId={postId} />
          </div>
        </Container>
      )}
    </div>
  );
};

export default Thread;
