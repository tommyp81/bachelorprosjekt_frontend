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

const Thread = ({
  subtopics,
  topics,
  users,
  history,
  updatePostInArray,
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
    fetch(host + "comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.filter((c) => Number(postId) === c.postId));
      })
      .catch(console.log);
  }, []);

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
    updatePostInArray(post.id, data);
  };

  const updatePostLike = (num) => {
    setPost({ ...post, like_Count: post.like_Count + num });
    updatePostInArray(post.id, { like_Count: post.like_Count + num });
  };

  // const editComment = async (comment, file) => {
  //   let formData = new FormData()
  //   if (file) {
  //     formData.append('File', file)
  //     formData.append('commentId', comment.id)
  //     formData.append('userId', comment.userId)
  //     const upres = await fetch('https://localhost:44361/UploadDocument', {
  //       method: 'POST',
  //       body: formData
  //     })
  //     const updata = await upres.json()
  //     comment.documentId = updata.id
  //   }

  //   formData = new FormData()
  //   for (let k in comment) {
  //     formData.append(k, comment[k])
  //   }
  //   const res = await fetch(`https://localhost:44361/comments/${comment.id}`, {
  //     method: 'PUT',
  //     body: formData
  //   })
  //   const data = await res.json();

  //   const updatedComments = comments.map(comment => {
  //     if (comment.id === data.id) {
  //       console.log("HEIIIIIIIIII")
  //       const updateComment = {
  //         ...comment,
  //         content: data.content,
  //         documentId: data.documentId
  //       }
  //       return updateComment
  //     }
  //     return comment
  //   })
  //   console.log("LOLOLOL")
  //   setComments(updatedComments)
  // }

  const deleteComment = async (e) => {
    let id = Number(e.target.value);
    const res = await fetch(host + `comments/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      setComments(comments.filter((comment) => comment.id !== id));
      setPost({ ...post, comment_Count: post.comment_Count - 1 });
      updatePostInArray(post.id, { comment_Count: post.comment_Count - 1 });
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

    // updatePosts()
    setPost({ ...post, comment_Count: post.comment_Count + 1 });
    updatePostInArray(post.id, { comment_Count: post.comment_Count + 1 });

    if (comments.length % commentsPerPage === 0) setCurrentPage(last + 1);
    else goToLast();
  };

  const commentsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const lastPage =
    currentComments.length !== commentsPerPage ||
    indexOfLastComment === comments.length;
  const firstPage = currentPage === 1;

  const last = Math.ceil(comments.length / commentsPerPage);
  const goToLast = () => setCurrentPage(last);
  const goToFirst = () => setCurrentPage(1);

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
                <div className="float-left">
                  
                  <p>Postet av{" "}
                  {post.userId === null ? <b>[Slettet bruker]</b> : 
                    <b>
                      {users &&
                        users.length &&
                        users.find((u) => u.id === post.userId)?.username}
                    </b>}{" "}
                    {moment(post.date).calendar()}
                  </p>
                </div>
                <div className="float-right">
                  {post.like_Count}{" "}
                  <LikeButton
                    id={postId}
                    liked={liked}
                    setLiked={setLiked}
                    isPost={true}
                    updatePostLike={updatePostLike}
                  />{" "}
                  &nbsp;
                  {post.comment_Count}
                  <FaRegComment
                    size={18}
                    color="grey"
                    className="ml-2 mr-2 mb-1"
                  />
                </div>

                <Card.Title>
                  <br />
                  <br />
                  <h2>{post.title}</h2>
                </Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div className="float-left">
                  {post.documentId ? (
                    <p>
                      Vedlegg:{" "}
                      <b>
                        <FileLink fileId={post.documentId} />
                      </b>
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {post.edited ? <i style={{color: "gray"}}>Redigert</i> : ""}
                <div
                  className="float-right"
                  hidden={!(user.id === post.userId)}
                >
                  <EditPost post={post} edit={editPost} /> &nbsp;
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleShow}
                    value={post.id}
                  >
                    Slett
                  </Button>
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
            {currentComments.map((c) => (
              <Comment
                key={c.id}
                initComment={c}
                users={users}
                deleteComment={deleteComment}
              />
            ))}
            {post.comment_Count > 0 && (
              <div className="float-right">
                <Pages
                  postsPerPage={commentsPerPage}
                  paginate={paginate}
                  totalPosts={comments.length}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  currentPage={currentPage}
                  firstPage={firstPage}
                  lastPage={lastPage}
                  goToFirst={goToFirst}
                  goToLast={goToLast}
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
