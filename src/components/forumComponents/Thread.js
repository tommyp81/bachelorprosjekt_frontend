import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Card, Form } from "react-bootstrap";
import moment from 'moment'
import 'moment/locale/nb'
import {useParams, Link} from 'react-router-dom'
import Pages from "./Pages.js"
import "./Post.css";

//import Header from '../mainComponents/Header'

import { Container, Button} from 'react-bootstrap'
import { Navbar } from '../navigation/navbar/navbar';
import NewComment from './NewComment';
import EditPost from './EditPost';
import EditComment from './EditComment';
import { UserContext } from '../../UserContext';
import FileLink from '../FileLink';

import { FaRegComment, FaThumbsUp } from "react-icons/fa";
import LikeButton from '../LikeButton.js';
import Post from './Post.js';
import Comment from './Comment.js';

const Thread = ( { subtopics, topics, users, history, getPost, setSinglePostLike, setPost }) => {

  const [comments, setComments] = useState([])

  const { postId } = useParams()
  const { user } = useContext(UserContext)

  const post = getPost(postId)

  useEffect(() => {
    fetch("https://localhost:44361/comments")
    .then(res => res.json())
    .then((data) => {
      setComments(data)
    })
    .catch(console.log)
  }, [])


  const deletePost = async () => {
    const res = await fetch(`https://localhost:44361/posts/${post.id}`, {
      method: 'DELETE',
    })

    if(res.status === 200) {
      setPost(post.id, {}, true)
      history.push("/Forum")
    } else {
      alert("ERROR")
    }
  }
  

  
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
    let id = Number(e.target.value)
    const res = await fetch(`https://localhost:44361/comments/${id}`, {
      method: 'DELETE'
    })
    if (res.status === 200) {
      setComments(comments.filter(comment => comment.id !== id))
      setPost(post.id, {comment_Count: post.comment_Count - 1})
    } else {
      alert("ERROR")
    } 
  }

  const addComment = async (comment, file) => {
    const formData = new FormData();
    if (file)
      formData.append('File', file)
    for (let k in comment) {
      formData.append(k, comment[k])
    }
    const res = await fetch("https://localhost:44361/comments", {
      method: 'POST', 
      body: formData
    })
    const data = await res.json();
    setComments(current => [...current, data])
    
    // updatePosts()
    setPost(post.id, {comment_Count: post.comment_Count + 1})
    
    // console.log(file)
    // console.log(formData.getAll('File'))
    
  }

  // const handlePostLike = async () => {
    
  //   const res = await fetch("https://localhost:44361/likes", {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({UserId: user.id, PostId: post.id})
  //   })
  //   console.log(res)
    
    
  // }

  // const handleCommentLike = async (c) => {

  // }

  // const commentsPerPage = 5
  // const [currentPage, setCurrentPage] = useState(1)
 
  // const indexOfLastComment = currentPage * commentsPerPage;
  // const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  // const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // const paginate = pageNum => setCurrentPage(pageNum)
  // const nextPage = () => setCurrentPage(currentPage + 1)
  // const prevPage = () => setCurrentPage(currentPage - 1)

  // const lastPage = currentComments.length !== commentsPerPage || indexOfLastComment === comments.length;
  // const firstPage = currentPage === 1;
  
  // const goToLast = () => setCurrentPage(Math.ceil(comments.length / commentsPerPage))
  // const goToFirst = () => setCurrentPage(1)

  return (
    <div className="Post">
      
    <Container style={{display: 'flex', flexDirection: 'column'}}> 
    
    <h5>
      <Link to="/Forum" style={{textDecoration: 'none', color: 'white'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        &nbsp;Tilbake til forum
      </Link>
      <div className="float-right" style={{textDecoration: 'none', color: 'white'}}>
        {topics.filter(topics =>(topics.id === post?.topicId)).map((filteredTopics, i) => (
          <p key={i}>
            {filteredTopics.title}
            &nbsp;-&nbsp;
            {subtopics.filter(subtopics => (subtopics.id === post?.subTopicId)).map((filteredSubtopics) => ( 
              filteredSubtopics.title
            ))}
          </p>
        ))}
        </div>
      </h5> 
      <div className="main">
        {post && <Post post={post} users={users} deletePost={deletePost} commentsLength={comments.length} setPost={setPost}/>}
      </div>
      
      
      {/*commentCount*/}
      
      <div className="comments">
       {post && !post.comment_Count ? <h3>Ingen kommentarer</h3> : <h3>Kommentarer</h3> }
        {comments.filter(c => Number(postId) === c.postId).map((fc, i) => (
          <Comment key={i} initComment={fc} users={users} deleteComment={deleteComment} />
        ))}
          
        
        
          
            
          {/*<Pages postsPerPage={commentsPerPage} paginate={paginate} totalPosts={currentComments.length} 
          nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} goToFirst={goToFirst} goToLast={goToLast}/>*/}
         </div>
         <div className="newcomment">
           <NewComment createNew={addComment} user={user} pId={postId}/> 
         </div>

        
      {/* { !editingPost ? <EditPost post={post} edit={editPost}/> : <></>} */}
    </Container>
    </div>
  )
};

export default Thread;