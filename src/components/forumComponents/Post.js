import React, { useEffect, useState } from 'react'
import { Breadcrumb, Card, Form } from "react-bootstrap";
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
  const [subtopics, setSubtopics] = useState([])
  const [topics, setTopics] = useState([])

  


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

    fetch("https://webforum.azurewebsites.net/SubTopics")
    .then(res => res.json())
    .then((data) => {
      setSubtopics(data)
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/Topics")
    .then(res => res.json())
    .then((data) => {
      setTopics(data)
    })
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
    <div className="Post">
      
    <Container style={{display: 'flex', flexDirection: 'column'}}> 
    <div className="main">
      <Breadcrumb>
        <Breadcrumb.Item href="/forum">
        Tilbake
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Body>
          <div className="float-left">
          {topics.filter(topics =>(topics.id === post.topicId)).map((filteredTopics) => (
            <p>Postet av <b>{user.username}</b> {moment(post.date).calendar()} i {filteredTopics.title} {"> "}
            {subtopics.filter(subtopics => (subtopics.id === post.subTopicId)).map((filteredSubtopics) => ( 
           filteredSubtopics.title
        ))}
            </p>
            ))}
          </div>
          <div className="float-right">
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
      <div className="comments">
          {comments.filter(comment => (comment.postId === post.id)).map((filteredComment, i) => (
              <Card key={i}>
                  <Card.Body>
                    <div className="float-left">
                    {/*user.filter(user => (user.id === comment.Userid)).map((filteredUser) => (*/
                    <p>Postet av <b>{user.username}</b>{/*filteredUser.username*/} {moment(filteredComment.date).calendar()}</p>
                    /*))*/}
                    </div>
                    <div className="float-right">
                      <EditComment comment={filteredComment} edit={editComment}/> &nbsp;
                      <Button variant="danger" size="sm" onClick={deleteComment} value={filteredComment.id}>Slett</Button>
                    </div>  
                    
                    <Card.Text><br /><br />
                    
                    {filteredComment.content}
                    
                    </Card.Text>
                  </Card.Body>
              </Card>
          ))}
          </div>

        
      {/* { !editingPost ? <EditPost post={post} edit={editPost}/> : <></>} */}
    </Container>
    </div>
  )
};

export default Post;