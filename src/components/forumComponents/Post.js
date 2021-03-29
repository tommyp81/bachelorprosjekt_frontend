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
    
    <h5>
      <Link to="/Forum" style={{textDecoration: 'none', color: 'white'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        &nbsp;Tilbake til forum
      </Link>
      <div className="float-right" style={{textDecoration: 'none', color: 'white'}}>
        {topics.filter(topics =>(topics.id === post.topicId)).map((filteredTopics) => (

            <>{filteredTopics.title}

          &nbsp;-&nbsp;

          {subtopics.filter(subtopics => (subtopics.id === post.subTopicId)).map((filteredSubtopics) => ( 

          filteredSubtopics.title

            ))}</>
          ))}
        </div>
      </h5> 
      <div className="main">
      <Card>
        <Card.Body>
          <div className="float-left">
          {topics.filter(topics =>(topics.id === post.topicId)).map(() => (
            <p>Postet av <b>{users && users.length && users.find(u => u.id === post.userId).username}</b> {moment(post.date).calendar()}
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
          <div className="float-right"> 0 &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>&nbsp;&nbsp;
                      {post.comment_Count} &nbsp;
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      </svg>
                    </div>
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
                    <div className="float-right" hidden={!(user.id === filteredComment.userId)}>
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
        
          
            
          {/*<Pages postsPerPage={commentsPerPage} paginate={paginate} totalPosts={currentComments.length} 
          nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} goToFirst={goToFirst} goToLast={goToLast}/>*/}
         </div>

        
      {/* { !editingPost ? <EditPost post={post} edit={editPost}/> : <></>} */}
    </Container>
    </div>
  )
};

export default Post;