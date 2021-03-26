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

const Post = ( { subtopics, topics, users, history, updatePosts }) => {

  const [comments, setComments] = useState([])
  const [post, setPost] = useState([])

  const { postId } = useParams()
  const { user } = useContext(UserContext)




  useEffect(() => {
    // let isMounted = true
    fetch("https://localhost:44361/comments")
    .then(res => res.json())
    .then((data) => {
      // if (isMounted)
      setComments(data)
    })
    .catch(console.log)

    fetch(`https://localhost:44361/posts/${postId}`)
    .then(res => res.json())
    .then(data => setPost(data))
    .catch(console.log)
  }, [])

  const deletePost = async () => {
    const res = await fetch(`https://localhost:44361/posts/${post.id}`, {
      method: 'DELETE',
    })

    if(res.status === 200) {
      updatePosts()
      history.push("/Forum")
    } else {
      alert("ERROR")
    }
  }

  const editPost = async (post, file) => {
    let formData = new FormData();
    if (file) {
      formData.append('File', file)
      formData.append('postId', post.id)
      formData.append('userId', post.userId)
      const upres = await fetch('https://localhost:44361/UploadDocument', {
        method: 'POST',
        body: formData
      })
      const updata = await upres.json()
      post.documentId = updata.id
    }

    formData = new FormData();
    for (let k in post) {
      formData.append(k, post[k])
    }
    const res = await fetch(`https://localhost:44361/posts/${post.id}`, {
      method: 'PUT',
      body: formData
    })
    const data = await res.json();

    setPost(data)
  }
  const editComment = async (comment, file) => {
    let formData = new FormData()
    if (file) {
      formData.append('File', file)
      formData.append('commentId', comment.id)
      formData.append('userId', comment.userId)
      const upres = await fetch('https://localhost:44361/UploadDocument', {
        method: 'POST',
        body: formData
      })
      const updata = await upres.json()
      comment.documentId = updata.id
    }

    formData = new FormData()
    for (let k in comment) {
      formData.append(k, comment[k])
    }
    const res = await fetch(`https://localhost:44361/comments/${comment.id}`, {
      method: 'PUT',
      body: formData
    })
    const data = await res.json();

    const updatedComments = comments.map(comment => {
      if (comment.id === data.id) {
        const updateComment = {
          ...comment,
          content: data.content, 
          documentId: data.documentId
        }
        return updateComment
      }
      return comment
    })

    setComments(updatedComments)
  }

  const deleteComment = async (e) => {
    let id = Number(e.target.value)
    const res = await fetch(`https://localhost:44361/comments/${id}`, {
      method: 'DELETE'
    })
    res.status === 200 ? setComments(comments.filter(comment => comment.id !== id)) : alert("ERROR")
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
    console.log(res)
    const data = await res.json();
    console.log(data)
    setComments(current => [...current, data])
    
    updatePosts()
    
    // console.log(file)
    // console.log(formData.getAll('File'))
    
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
  
  const goToLast = () => setCurrentPage(Math.ceil(comments.length / commentsPerPage))
  const goToFirst = () => setCurrentPage(1)

  return (
    <div className="Post">
      
    <Container style={{display: 'flex', flexDirection: 'column'}}> 
    <div className="main">
    <h5><Link to="/Forum" style={{textDecoration: 'none', color: 'white'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    &nbsp;Tilbake til forum</Link></h5> 
      <Card>
        <Card.Body>
          <div className="float-left">
          {topics.filter(topics =>(topics.id === post.topicId)).map((filteredTopics) => (
            <p>Postet av <b>{users && users.length && users.find(u => u.id === post.userId).username}</b> {moment(post.date).calendar()} i {filteredTopics.title} {"> "}
            {subtopics.filter(subtopics => (subtopics.id === post.subTopicId)).map((filteredSubtopics) => ( 
             filteredSubtopics.title
            ))}
            </p>
            ))}
          </div>
          <div className="float-right" hidden={!(user.id === post.userId)}>
              <EditPost post={post} edit={editPost}/> &nbsp;
              <Button variant="danger" size="sm" onClick={deletePost} value={post.id}>Slett</Button>
            </div>
          
          <Card.Title><br /><br />
          <h2>{post.title}</h2>
          </Card.Title>
          <Card.Text>
            {post.content}
            <br/>
            {post.documentId ? <FileLink fileId={post.documentId} /> : ""}
          </Card.Text>
          <br />
          </Card.Body>
      </Card>
      </div>
      
      <NewComment createNew={addComment} user={user} pId={post.id}/> 
      
      
      {/*commentCount*/}
      
      <div className="comments">
       {!post.comment_Count ? <h3>Ingen kommentarer</h3> : <h3>Kommentarer</h3> }
          {comments.filter(currentComments => (currentComments.postId === post.id)).map((filteredComment, i) => ( 
              <Card key={i}>
                  <Card.Body>
                    <div className="float-left">
                    <p>Postet av <b>{users && users.length && users.find(u => u.id === filteredComment.userId).username}</b>{/*filteredUser.username*/} {moment(filteredComment.date).calendar()}</p>
                    </div>
                    <div className="float-right" hidden={!(user.id === post.userId)}>
                      <EditComment comment={filteredComment} edit={editComment}/> &nbsp;
                      <Button variant="danger" size="sm" onClick={deleteComment} value={filteredComment.id}>Slett</Button>
                    </div>  
                    
                    <Card.Text><br /><br />
                    {filteredComment.content}
                    <br/>
                    {filteredComment.documentId ? <FileLink fileId={filteredComment.documentId} /> : ""}
                    </Card.Text>
                  </Card.Body>
              </Card>
          ))}
        
          
           {/* 
          <Pages postsPerPage={commentsPerPage} paginate={paginate} totalPosts={currentComments.length} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} goToFirst={goToFirst} goToLast={goToLast}/>
         */} </div>

        
      {/* { !editingPost ? <EditPost post={post} edit={editPost}/> : <></>} */}
    </Container>
    </div>
  )
};

export default Post;