import React, { useEffect, useState } from 'react'
import { Card, Form } from "react-bootstrap";
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import "./Post.css";

//import Header from '../mainComponents/Header'

import { Container, Button} from 'react-bootstrap'
import { Navbar } from '../navigation/navbar/navbar';
import NewComment from './NewComment';
import EditPost from './EditPost';
import EditComment from './EditComment';

const Post = ({postId, user}) => {

  // const [post, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [post, setPost] = useState([])

  


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
  

  return (
    <Container style={{display: 'flex', flexDirection: 'column'}}> 
      <Card>
        <Card.Body>
          <div className="float-left">
            Postet av <b>{user.username}</b> {moment(post.date).calendar()}
          </div>
          
          <Card.Title><br /><br />
          <h2>{post.title}</h2>
          </Card.Title>
          <Card.Text>
            {post.content}
            <div className="float-right">
              <EditPost post={post} edit={editPost}/>
              <Button variant="danger" onClick={deletePost} value={post.id}>Delete</Button>
            </div>
          </Card.Text>
          <br />




          <NewComment createNew={addComment} user={user} pId={post.id}/> <br/><br/><br />
          <h4>Kommentarer</h4>
          {comments.filter(comment => (comment.postId === post.id)).map((filteredComment, i) => (
              <Card key={i}>
                  <Card.Body>
                    <div className="float-left">
                    {/*user.filter(user => (user.id === comment.Userid)).map((filteredUser) => (*/
                    <p>Postet av <b>{user.username}</b>{/*filteredUser.username*/} {moment(filteredComment.date).calendar()}</p>
                    /*))*/}
                    </div>
                    
                    <Card.Text><br /><br />
                    {filteredComment.content}
                    <div className="float-right">
                      <EditComment comment={filteredComment} edit={editComment}/>
                      <Button variant="danger" onClick={deleteComment} value={filteredComment.id}>Delete</Button>
                    </div>  
                    </Card.Text>
                  </Card.Body>
              </Card>
          ))}
        </Card.Body>
      </Card>
      
      {/* { !editingPost ? <EditPost post={post} edit={editPost}/> : <></>} */}
    </Container>
  )
};

export default Post;