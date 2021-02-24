import React, {useEffect, useState} from 'react'
import { Card, Container } from "react-bootstrap";
import Topics from "./Topics.js";
import NewPost from "./NewPost.js"
import "./Forum.css";
import { Component } from 'react';
import moment from 'moment'
import Feed from '../homeComponents/Feed.js';
import { useHistory } from 'react-router-dom';

import Pages from './Pages'
import SortPosts from './SortPosts'

 

const Forum = (props) => {

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  // const [posts, setPosts] = useState([...props.posts]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // const [topicFocus, setTopicFocus] = useState("");
  const [subtopicFocus, setSubTopicFocus] = useState("");

  // const history = useHistory();

  const postsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  
 
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNum => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage(currentPage + 1)
  const prevPage = () => setCurrentPage(currentPage - 1)


  
  useEffect(() => {
    fetch("https://localhost:44319/Topics")
    .then(res => res.json())
    .then((data) => {
      setTopics(data)
    })
    .catch(console.log)

    fetch("https://localhost:44319/SubTopics")
    .then(res => res.json())
    .then((data) => {
      setSubtopics(data)
    })
    .catch(console.log)
  }, [])
  useEffect(() => {
    // setPosts(props.posts)
    setFilteredPosts(props.posts)
  }, [props.posts])
  // useEffect(() => {
  //   setFilteredPosts(props.posts)
  // }, [])
    

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

  const onSubClick = (e) => {
    let subTop = e.target.value
    
    setSubTopicFocus(subTop)
  }

  // onSubClick = (e) => {
  //   let subtop = e.target.value
  //   let fp = []
  //   if (subtop.match(this.state.topics.filter(topics => topics.title))) {
  //     this.setState({subtopicFocus: ""})
  //     fp = this.state.posts
  //   } else {
  //     this.setState({subtopicFocus: subtop})
  //     fp = this.state.posts.filter(post => post.subTopic_Title === subtop)
  //   }
  //   this.setState({filteredPosts: fp})
  // } 

  return (
    <div className="Forum">
      <Topics 
      topics = {topics}
      subtopics = {subtopics}
      subClick = {onSubClick}
      />
      <Container className="top">
        <p>{!subtopicFocus ? "Velg en underkategori for lage en ny post" : ""}</p>
        <h1>{!subtopicFocus ? "" : subtopicFocus}</h1>
        <div className="float-left">
          <NewPost subtopic={subtopicFocus} add={props.addPost} user={props.user}/>
        </div>
        <div className="float-right">
          <SortPosts />
        </div>
      </Container>

      <Container className="main">
        {/* {renderPosts} */}
        <Feed post={currentPosts} maxLength={props.posts.length}/>
      </Container>

      <Container>
        <Pages postsPerPage={postsPerPage} totalPosts={props.posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
      </Container>
    </div>
      );
    
}
  
export default Forum;