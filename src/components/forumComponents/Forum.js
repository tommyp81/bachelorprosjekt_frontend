import React, {useContext, useEffect, useState} from 'react'
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import Topics from "./Topics.js";
import NewPost from "./NewPost.js"
import Pages from "./Pages.js";
import "./Forum.css";
import { Component } from 'react';
import moment from 'moment'
import Feed from './Feed.js';
import SearchPosts from "./SearchPosts.js";

import SortPosts from './SortPosts'
import { UserContext } from '../../UserContext'

 

const Forum = ({ posts, addPost, topics, subtopics, users, history}) => {

  
  // const [posts, setPosts] = useState([...props.posts]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const [topicFocus, setTopicFocus] = useState("");
  const [subtopicFocus, setSubTopicFocus] = useState("");

  const [loading, setLoading] = useState(true);

  const [topicTitle, setTopicTitle] = useState("")
  const [topicDesc, setTopicDesc] = useState("")
  const [subTopicDesc, setSubTopicDesc] = useState("")
  const [subTopicTitle, setSubTopicTitle] = useState("")

  const {user} = useContext(UserContext)
  

  useEffect(() => {
    setFilteredPosts(posts)
    setLoading(false)
  }, [posts])
  
  
  const postsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.sort((p1, p2) => (moment(p2.date).diff(moment(p1.date)))).slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNum => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage(currentPage + 1)
  const prevPage = () => setCurrentPage(currentPage - 1)

  const lastPage = currentPosts.length !== postsPerPage || indexOfLastPost === posts.length;
  const firstPage = currentPage === 1;

  const goToLast = () => setCurrentPage(Math.ceil(filteredPosts.length / postsPerPage))
  const goToFirst = () => setCurrentPage(1)

  const onTopClick = (key) => {
    if (key) {
      setTopicTitle("Alle kategorier")
      setSubTopicFocus("")
      setSubTopicTitle("")
      setSubTopicDesc("")
      let value = topics.find(t => t.id === Number(key)).title
      setFilteredPosts(posts.filter(fp => fp.topicId === Number(key)))
      setTopicTitle(value)
      setCurrentPage(1);
      setTopicFocus(key)
    } 
  }

  const onSubClick = (e) => {
      let subTop = e.target.value
      let title = e.target.getAttribute("title")
      let desc = subtopics.find(s => s.id === Number(subTop)).description
      //let topTitle = subtopics.find(s => s.id === Number(topics.topicId)).title
      //setTopicTitle(topTitle)
      setSubTopicTitle(title)
      setSubTopicFocus(subTop)
      setSubTopicDesc(desc)
      setFilteredPosts(posts.filter(fp => fp.subTopicId === Number(subTop)))
      setCurrentPage(1);
  }

  const allTopics = (e) => {
    let value = e.target.value
    setSubTopicFocus("")
    setSubTopicTitle("")
    setSubTopicDesc("")
    setTopicTitle(value)
    setCurrentPage(1);
    setFilteredPosts(posts)
  }

  
  return (
    <div className="Forum mt-5">
      <Container className="body">
      <Row xs={1} sm={1} lg={2}>
          <Col lg={3}>
            
            <div className="desktop">
            <SearchPosts />
            <NewPost 
                subtopicTitle={subTopicTitle} 
                subtopic={subtopicFocus} 
                topicFocus={topicFocus} 
                add={addPost} 
                history={history} />
            </div>
            <Topics 
              topics = {topics}
              subtopics = {subtopics}
              topClick = {onTopClick}
              subClick = {onSubClick}
              allTopics = {allTopics}/>
          </Col>

          <Col lg={9}>
            <Container className="top">
              <div className="topictext">
              <h2>{!topicTitle ? "Alle kategorier" : topicTitle} 
              {!subTopicTitle ? "" : <>&nbsp; 
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>&nbsp;
              {subTopicTitle}</>}</h2>
              <p>{!subTopicDesc ? "" : subTopicDesc}</p>
              </div>
          
              <div className="newpost">
                <NewPost 
                subtopicTitle={subTopicTitle} 
                subtopic={subtopicFocus} 
                topicFocus={topicFocus} 
                add={addPost} 
                history={history} />
              </div>
        
              <div className="sortposts">
                <SortPosts post={currentPosts}/>
              </div>

              <div className="mobilesearch">
              <SearchPosts />
              </div>
            </Container>

            <Container className="main">
              {/* {renderPosts} */}
             
              <Feed posts={currentPosts} users={users} subtopic={subtopics} maxLength={currentPosts.length} loading={loading}/>
            </Container>

            <Container>
              <Pages postsPerPage={postsPerPage} paginate={paginate} totalPosts={currentPosts.length} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} goToFirst={goToFirst} goToLast={goToLast}/>
            </Container>
          </Col>
      </Row>
      </Container>
     
      
    </div>
      );
    
}
  
export default Forum;