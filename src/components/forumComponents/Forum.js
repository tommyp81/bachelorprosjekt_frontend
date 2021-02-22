import React from 'react'
import { Card, Container } from "react-bootstrap";
import Topics from "./Topics.js";
import NewPost from "./NewPost.js"
import Pages from "./Pages.js";
import "./Forum.css";
import { Component } from 'react';
import moment from 'moment'
import Feed from '../homeComponents/Feed.js';
import { faXRay } from '@fortawesome/free-solid-svg-icons';
import SortPosts from './SortPosts.js';


class Forum extends Component {

  state = {
    users: [],
    topics: [],
    subtopics: [],
    posts: [],
    //posts2: [],
    comments: [],
    filteredPosts: [], 
    topicFocus: "",
    subtopicFocus: "",
    loading: false,
    currentPage: 1,
    postsPerPage: 8
  }


  componentDidMount() {
    fetch("https://webforum.azurewebsites.net/Users")
    .then(res => res.json())
    .then((data) => {
    this.setState({ users: data })
    })
    .catch(console.log)

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

   /* 
    fetch("https://webforum.azurewebsites.net/Posts")
    .then(res => res.json())
    .then(data => {
      this.setState({ posts2: data, filteredPosts: data, currentPosts: data })
      this.setState({ loading: false })
    })
    .catch(console.log)
    */
    

    fetch("https://webforum.azurewebsites.net/GetPosts")
    .then(res => res.json())
    .then(data => {
      this.setState({ posts: data, filteredPosts: data, currentPosts: data })
      this.setState({ loading: false })
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/Comments")
    .then(res => res.json())
    .then(data => {
      this.setState({ comments: data })
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
      fp = this.state.posts2
    } else {
      this.setState({topicFocus: top})
      fp = this.state.posts2.filter(posts2 => posts2.topicId === top)
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
    const {currentPage, postsPerPage, posts, loading} = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.state.filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => this.setState({ currentPage: pageNum });
    const nextPage = () => this.setState({ currentPage: currentPage + 1 });
    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

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
          <p>{!this.state.subtopicFocus ? "Velg en underkategori for lage en ny post" : ""}</p>
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
          <Feed post={currentPosts} loading={loading}/>
          
        </Container>

        <Container>
          {/* Denne funker, men har ikke nok poster til å være helt funksjonell enda */}
          <Pages postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
        </Container>
      </div>
        );
    }
}
  
export default Forum;