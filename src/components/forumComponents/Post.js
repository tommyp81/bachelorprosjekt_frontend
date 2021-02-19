import React, { useEffect, useState } from 'react'
import { Card } from "react-bootstrap";
import moment from 'moment'
import {useHistory} from 'react-router-dom'

//import Header from '../mainComponents/Header'

import { Container } from 'react-bootstrap'
import { Navbar } from '../navigation/navbar/navbar';
import { Button } from 'react-bootstrap';

const Post = ({post}) => {

  // const [post, setPosts] = useState([])
  const [comments, setComments] = useState([])

  const history = useHistory();


  useEffect(() => {
    let isMounted = true
    fetch("https://localhost:44319/comments")
    .then(res => res.json())
    .then((data) => {
      if (isMounted)
        setComments(data)
    })
    .catch(console.log)
  }, [])

  const deletePost = async () => {
    const res = await fetch(`https://localhost:44319/posts/${post.id}`, {
      method: 'DELETE',
    })
    res.status === 200 ? history.push("/forum") : alert("Error")
  }

  const deleteComment = async (e) => {
    let id = Number(e.target.value)
    const res = await fetch(`https://localhost:44319/comments/${id}`, {
      method: 'DELETE'
    })
    res.status === 200 ? setComments(comments.filter(comment => comment.id !== id)) : alert("ERROR")
  }

  return (
    <Container style={{display: 'flex', flexDirection: 'column'}}>
        <Card>
          <Card.Header> - {moment(post.date).calendar()}</Card.Header>
          <Card.Body >
              <Button variant="danger" className="float-right" onClick={deletePost} value={post.id}>Delete</Button>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              {comments.filter(comment => (comment.postId === post.id)).map((filteredComment, i) => (
                  <Card key={i}>
                      <Card.Header>{moment(filteredComment.date).calendar()}</Card.Header>
                      <Card.Body>
                          <Button variant="danger" className="float-right" onClick={deleteComment} value={filteredComment.id}>Delete</Button>
                          <Card.Text>{filteredComment.content}</Card.Text>
                      </Card.Body>
                  </Card>
              ))}
          </Card.Body>
        </Card>
    </Container>
  )
};

export default Post;