import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Card, Form } from "react-bootstrap";
import moment from 'moment'
import {useHistory, useParams, Link} from 'react-router-dom'
import Pages from "./Pages.js"
import "./Post.css";

//import Header from '../mainComponents/Header'

import { Container, Button} from 'react-bootstrap'
import { Navbar } from '../navigation/navbar/navbar';
import NewComment from './NewComment';
import EditPost from './EditPost';
import EditComment from './EditComment';
import { UserContext } from '../../UserContext';

const Post = ( { subtopics, topics, users }) => {

  const [comments, setComments] = useState([])
  const [post, setPost] = useState([])

  const { postId } = useParams()
  const { user } = useContext(UserContext)


  const history = useHistory();


  useEffect(() => {
    // let isMounted = true
    fetch("https://webforum.azurewebsites.net/comments")
    .then(res => res.json())
    .then((data) => {
      // if (isMounted)
      setComments(data)
    })
    .catch(console.log)

    fetch(`https://webforum.azurewebsites.net/posts/${postId}`)
    .then(res => res.json())
    .then(data => setPost(data))
    .catch(console.log)
  }, [])

  const deletePost = async () => {
    const res = await fetch(`https://webforum.azurewebsites.net/posts/${post.id}`, {
      method: 'DELETE',
    })
    res.status === 200 ? history.push("/forum") : alert("Error")
    //todo
    // delete all comments for specific post
  }

  const editPost = async (post) => {
    const res = await fetch(`https://webforum.azurewebsites.net/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    const data = await res.json();

    setPost(data)
  }
  const editComment = async (comment) => {
    const res = await fetch(`https://webforum.azurewebsites.net/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(comment)
    })
    const data = await res.json();

    const updatedComments = comments.map(comment => {
      if (comment.id === data.id) {
        const updateComment = {
          ...comment,
          content: data.content
        }
        return updateComment
      }
      return comment
    })

    setComments(updatedComments)
  }

  const deleteComment = async (e) => {
    let id = Number(e.target.value)
    const res = await fetch(`https://webforum.azurewebsites.net/comments/${id}`, {
      method: 'DELETE'
    })
    res.status === 200 ? setComments(comments.filter(comment => comment.id !== id)) : alert("ERROR")
  }

  const addComment = async (comment) => {
    const res = await fetch("https://webforum.azurewebsites.net/comments", {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(comment)
    })

    const data = await res.json();

    setComments(current => [...current, data])
    
  }

  const commentsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
 
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = pageNum => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage(currentPage + 1)
  const prevPage = () => setCurrentPage(currentPage - 1)

  const lastPage = currentComments.length !== commentsPerPage || indexOfLastComment === comments.length;
  const firstPage = currentPage === 1;
 
  /*
  const commentCount = () => {
    if (currentComments === 0) {
    return <h3>Ingen kommentarer enda.</h3>
  }
  }
  */
  

  return (
    <div className="Post">
      
    <Container style={{display: 'flex', flexDirection: 'column'}}> 
    <div className="main">
    <h5><Link to="/Forum" style={{textDecoration: 'none', color: '#000000'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
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
            
          </Card.Text>
          <br />
          </Card.Body>
      </Card>
      </div>
      
      <NewComment createNew={addComment} user={user} pId={post.id}/> 
      
      <h4>Kommentarer</h4>  
      {/*commentCount*/}
      <div className="comments">
          {currentComments.filter(currentComments => (currentComments.postId === post.id)).map((filteredComment, i) => (
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
                    
                    </Card.Text>
                  </Card.Body>
              </Card>
              
          ))}
          {/* 
          <Pages postsPerPage={commentsPerPage} paginate={paginate} totalPosts={currentComments.length} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage}/>*/}
          </div>

        
      {/* { !editingPost ? <EditPost post={post} edit={editPost}/> : <></>} */}
    </Container>
    </div>
  )
};

export default Post;