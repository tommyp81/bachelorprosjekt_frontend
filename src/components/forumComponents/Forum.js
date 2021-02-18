import React from 'react'
import { Card, Container } from "react-bootstrap";
import Topics from "./Topics.js";
import NewPost from "./NewPost.js"
import "./Forum.css";
import { Component } from 'react';
import moment from 'moment'
import Feed from '../homeComponents/Feed.js';
import { faXRay } from '@fortawesome/free-solid-svg-icons';
import SortPosts from './SortPosts.js';


class Forum extends Component {

  state = {
    topics: [],
    subtopics: [],
    posts: [],
    filteredPosts: [], 
    topicFocus: "",
    subtopicFocus: ""
  }


  componentDidMount() {
    fetch("https://webforum.azurewebsites.net/Topics")
    .then(res => res.json())
    .then((data) => {
    this.setState({ topics: data })
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/SubTopics")
    .then(res => res.json())
    .then((data) => {
      this.setState({ subtopics: data })
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/GetPosts")
    .then(res => res.json())
    .then(data => {
      this.setState({ posts: data, filteredPosts: data })
    })
    .catch(console.log)
  }



//Denne må mappes fra post.subTopic_Title til subtopics.title til subtopics.topic_Id === topics.id på en eller annen måte.
/*
  onTopClick = (e) => {
    let top = e.target.value
    let fp = []

    if (top.match(this.state.topics.filter(topics => topics.title))) {
      this.setState({topicFocus: ""})
      fp = this.state.posts
    } else {
      this.setState({topicFocus: top})
      fp = this.state.posts.filter(post => det er her jeg stopper opp lol
    }
    this.setState({filteredPosts: fp})
  }
*/
  
  onSubClick = (e) => {
    let subtop = e.target.value
    let fp = []
    if (subtop.match(this.state.topics.filter(topics => topics.title))) {
      this.setState({subtopicFocus: ""})
      fp = this.state.posts
    } else {
      this.setState({subtopicFocus: subtop})
      fp = this.state.posts.filter(post => post.subTopic_Title === subtop)
    }
    this.setState({filteredPosts: fp})
  } 

  render () {
    // const renderPosts = this.state.filteredPosts.map((post) => (
    //   <Card key={post.postId}>
    //     <Card.Body>
    //       <Card.Title>{post.post_Title}<i><small> i {post.subTopic_Title}</small></i></Card.Title>
    //       Av {post.user_Username} <br/> {moment(post.post_Date).calendar()}
    //       <div className="float-right">
    //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
    //         <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    //         </svg> &nbsp; {post.comment_Count}
    //       </div>
    //     </Card.Body>
    //   </Card>
    // ))

    return (
      <div className="Forum">
        <Topics 
        topics = {this.state.topics}
        subtopics = {this.state.subtopics}
        //Her
        catClick = {this.onTopClick}
        subClick = {this.onSubClick}
        />
        <Container className="top">
          {/* og her */}
          <h4>{!this.state.topicFocus ? "" : this.state.topicFocus}</h4>
          <h1>{!this.state.subtopicFocus ? "" : this.state.subtopicFocus}</h1>
          <div className="float-left">
            <NewPost subtopic={this.state.subtopicFocus}/>
          </div>
          <div className="float-right">
            <SortPosts />
          </div>
        </Container>

        <Container className="main">
          {/* {renderPosts} */}
          <Feed post={this.state.filteredPosts} maxLength={10}/>
        </Container>
      </div>
        );
    }
}
  
export default Forum;