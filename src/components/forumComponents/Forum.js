import React, {useContext, useEffect, useState} from 'react'
import { Card, Col, Container, Dropdown, Pagination, Row } from "react-bootstrap";
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
  
  
  
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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
    let title = e.target.getAttribute("title")
    setSubTopicFocus("")
    setSubTopicTitle("")
    setSubTopicDesc("")
    setTopicTitle(title)
    setCurrentPage(1);
    setFilteredPosts(posts)
  }

  
  return (
    <div className="Forum mt-5">
      <Container>
        <h1>Forum</h1>
      </Container>
      <Container className="body">
      <Row xs={1} sm={1} lg={2}>
          <Col lg={3}>
            
            <div className="desktop">
            <SearchPosts />
            </div>
            <Topics 
              topics = {topics}
              subtopics = {subtopics}
              topClick = {onTopClick}
              subClick = {onSubClick}
              allTopics = {allTopics}
              topicFocus = {topicFocus}
            />
          </Col>

          <Col lg={9}>
            <Container className="top">
              <div className="topictext">
              <h2>{!topicTitle ? "Alle kategorier" : topicTitle} 
              {!subTopicTitle ? "" : <>&nbsp;-&nbsp;{subTopicTitle}</>}</h2>
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
                <SortPosts post={filteredPosts} setFilteredPosts={setFilteredPosts} />
              </div>

              <div className="mobilesearch">
              <SearchPosts />
              </div>
            </Container>

            <Container className="main">
              {/* {renderPosts} */}
             
              <Feed posts={currentPosts} users={users} topic={topics} subtopic={subtopics} maxLength={currentPosts.length} loading={loading}/>
            </Container>

            <Container className="bot">
        <div className="float-left">
          <Pages postsPerPage={postsPerPage} paginate={paginate} totalPosts={currentPosts.length} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} goToFirst={goToFirst} goToLast={goToLast}/>
        </div>
        <div className="float-right">
        <Dropdown>
          
          <Dropdown.Toggle variant="primary" id="dropdown-basic" >
            {postsPerPage} per side:  
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item href="" /*onSelect?*/ onClick={() => setPostsPerPage(10)}>Vis 10 poster per side</Dropdown.Item>
            <Dropdown.Item href="" onClick={() => setPostsPerPage(25)}>Vis 25 poster per side</Dropdown.Item>
            <Dropdown.Item href="" onClick={() => setPostsPerPage(50)}>Vis 50 poster per side</Dropdown.Item>
            <Dropdown.Item href="" onClick={() => setPostsPerPage(100)}>Vis 100 poster per side</Dropdown.Item>
          </Dropdown.Menu>
    
        </Dropdown>
        </div>
        </Container>
          </Col>
      </Row>
      </Container>
     
      
    </div>
      );
    
}
  
export default Forum;