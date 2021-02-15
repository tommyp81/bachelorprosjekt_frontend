import React from 'react'
import { Card, Container } from "react-bootstrap";
import ForumCategories from "./ForumCategories.js";
import NewPost from "./NewPost.js"
import "./Forum.css";
import { Component } from 'react';
import moment from 'moment'

class Forum extends Component {

  state = {
    topics: [],
    subtopics: [],
    posts: [],
    filteredPosts: [], 
    currentFilter: ""
  }


  componentDidMount() {
    fetch("https://localhost:44319/Topics")
    .then(res => res.json())
    .then((data) => {
    this.setState({ topics: data })
    })
    .catch(console.log)

    fetch("https://localhost:44319/SubTopics")
    .then(res => res.json())
    .then((data) => {
      this.setState({ subtopics: data })
    })
    .catch(console.log)

    fetch("https://localhost:44319/GetPosts")
    .then(res => res.json())
    .then(data => {
      this.setState({ posts: data, filteredPosts: data })
    })
    .catch(console.log)
  }

  onSubCatClick = (e) => {
    let cat = e.target.value
    let fp = []
    if (cat.match(/^(Konkurranse|Kompetanse|Utvikling|Toppidrett)$/)) {
      fp = this.state.posts
    } else {
      fp = this.state.posts.filter(post => post.subTopic_Title === cat)
    }
    this.setState({filteredPosts: fp})
  } 

  render () {
    const renderPosts = this.state.filteredPosts.map((post) => (
      <Card key={post.postId}>
        <Card.Body>
          <Card.Title>{post.post_Title}<i><small> i {post.subTopic_Title}</small></i></Card.Title>
          Av {post.user_Username} - {moment(post.post_Date).calendar()}
          <div className="float-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            </svg> &nbsp;x {post.comment_Count}
          </div>
        </Card.Body>
      </Card>
    ))

    return (
      <div className="Forum">
        <ForumCategories 
        topics = {this.state.topics}
        subtopics = {this.state.subtopics}
        subClick = {this.onSubCatClick}
        />
        <Container className="top">
          <h1>Underkategori</h1>
          <div className="float-left">
            <NewPost />
          </div>
          <div className="float-right">
          Sorter: Nyeste til eldste
          </div>
        </Container>

        <Container className="main">
          {renderPosts}
            {/* <Card> 
              <Card.Body>
                  <Card.Title>Tittel</Card.Title>
                    Av <b>Brukernavn</b> - Dato
                    <div className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> &nbsp;x kommentarer
                    </div>
                    </Card.Body>
                  </Card>
                  
                  <Card> 
              <Card.Body>
                  <Card.Title>Tittel</Card.Title>
                    Av <b>Brukernavn</b> - Dato
                    <div className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> &nbsp;x kommentarer
                    </div>
                    </Card.Body>
                  </Card>
                  
                  <Card> 
              <Card.Body>
                  <Card.Title>Tittel</Card.Title>
                    Av <b>Brukernavn</b> - Dato
                    <div className="float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg> &nbsp;x kommentarer
                    </div>
                    </Card.Body>
                  </Card> */}

            </Container>
                </div>
        );
    }
}
  
export default Forum;