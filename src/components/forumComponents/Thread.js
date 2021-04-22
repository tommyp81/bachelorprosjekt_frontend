import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Card, Form } from "react-bootstrap";
import moment from 'moment'
import 'moment/locale/nb'
import {useParams, Link} from 'react-router-dom'
import Pages from "./Pages.js"
import "./Post.css";
import {host} from '../../App'

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
import Comments from './Comments.js';
import { ArrowLeft } from 'react-bootstrap-icons';
import { RiArrowLeftFill } from 'react-icons/ri';

const Thread = ( { subtopics, topics, users, history, getPost, setPost, deletePost }) => {

  const [comments, setComments] = useState([])

  const { postId } = useParams()
  const { user } = useContext(UserContext)

  const post = getPost(postId)

  useEffect(() => {
    fetch(host+"comments")
    .then(res => res.json())
    .then((data) => {
      setComments(data.filter(c => Number(postId) === c.postId))
    })
    .catch(console.log)

    // setInterval(async() => {
    //   fetch(host+"comments")
    //   .then(res => res.json())
    //   .then((data) => {
    //     setComments(data.filter(c => Number(postId) === c.postId))
    //   })
    //   .catch(console.log)
    // }, 60000);
  }, [])

  // const threadComments = comments.filter(c => Number(postId) === c.postId).slice(0).sort((d1, d2) => moment(d2.date) - moment(d1.date))

  const deleteThread = async () => {
    const success = deletePost(postId)
    if (success)
      history.push("/Forum")
    else 
      alert("Feil ved sletting av post")
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
    const res = await fetch(host+`comments/${id}`, {
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
    const res = await fetch(host+"comments", {
      method: 'POST', 
      body: formData
    })
    const data = await res.json();
    setComments(current => [...current, data])
    
    // updatePosts()
    setPost(post.id, {comment_Count: post.comment_Count + 1})
    
    if(comments.length % commentsPerPage === 0)
      setCurrentPage(last + 1)
    else
      goToLast()
    
  }


  const commentsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
 
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = pageNum => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage(currentPage + 1)
  const prevPage = () => setCurrentPage(currentPage - 1)

  const lastPage = currentComments.length !== commentsPerPage || indexOfLastComment === comments.length;
  const firstPage = currentPage === 1;
  
  const last = Math.ceil(comments.length / commentsPerPage)
  const goToLast = () => setCurrentPage(last)
  const goToFirst = () => setCurrentPage(1)


  return (
    <div className="Post">
      
      <Container style={{display: 'flex', flexDirection: 'column'}}> 
    
        <div className="foruminfo" style={{textDecoration: 'none', color: 'white', fontWeight:"600"}}>
          <Link to="/Forum" style={{textDecoration: 'none', color: 'white' }}>
            <RiArrowLeftFill size={20}/>
            &nbsp;Tilbake til forum
          </Link>
          <div className="float-right">
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
        </div> 

        <div className="main">
          {post && <Post post={post} users={users} deletePost={deleteThread} commentsLength={comments.length} setPost={setPost}/>}
        </div>
        
        
        {/*commentCount*/}
        
        <div className="comments">{post && !post.comment_Count ? <h3>Ingen kommentarer</h3> : <h3>Kommentarer</h3> }
          {currentComments.map(c => (
            <Comment key={c.id} initComment={c} users={users} deleteComment={deleteComment} />
          ))}
          {post.comment_Count > 0 && 
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
          } 
        </div>
          <div className="newcomment">
            <NewComment createNew={addComment} user={user} pId={postId}/> 
          </div>
      </Container>
    </div>
  )
};

export default Thread;