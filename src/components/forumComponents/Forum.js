import React, {useContext, useEffect, useState} from 'react'
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import Topics from "./Topics.js";
import NewPost from "./NewPost.js"
import Pages from "./Pages.js";
import "./Forum.css";
import { Component } from 'react';
import moment from 'moment'
import Feed from './Feed.js';

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
    console.log(title)
    console.log(subTop)
    console.log(desc)
    setSubTopicTitle(title)
    setSubTopicFocus(subTop)
    setSubTopicDesc(desc)
    setFilteredPosts(posts.filter(fp => fp.subTopicId === Number(subTop)))
    setCurrentPage(1);
  }

  
  return (
    <div className="Forum mt-5">
      <Topics 
      topics = {topics}
      subtopics = {subtopics}
      topClick = {onTopClick}
      subClick = {onSubClick}
      />
      <Container className="top">
        <h4>{!topicTitle ? "" : topicTitle}</h4>
        <h1>{!subTopicTitle ? <p>Velg en underkategori for lage en ny post</p> : subTopicTitle}</h1>
        <h5>{!subTopicDesc ? "" : subTopicDesc}</h5>
        <div className="float-left">
          <NewPost subtopicTitle={subTopicTitle} subtopic={subtopicFocus} topicFocus={topicFocus} add={addPost} history={history} />
        </div>
        <div className="float-right">
          <SortPosts post={currentPosts}/>
        </div>
      </Container>

      <Container className="main">
        {/* {renderPosts} */}
        <Feed posts={currentPosts} users={users} subtopic={subtopics} maxLength={currentPosts.length} loading={loading}/>
      </Container>

      <Container>
        <Pages postsPerPage={postsPerPage} paginate={paginate} totalPosts={currentPosts.length} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} goToFirst={goToFirst} goToLast={goToLast}/>
      </Container>
    </div>
      );
    
}
  
export default Forum;