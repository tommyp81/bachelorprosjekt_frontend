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

 

const Forum = (props) => {

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [posts, setPosts] = useState([...props.posts]);
  // const [filteredPosts, setFilteredPosts] = useState([...props.posts]);
  // const [topicFocus, setTopicFocus] = useState("");
  const [subtopicFocus, setSubTopicFocus] = useState("");

  // const history = useHistory();

  const postsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
    setPosts(props.posts)
  }, [props.posts])
  // useEffect(() => {
  //   setFilteredPosts(props.posts)
  // }, [])
    
  

  const onSubCatClick = (e) => {
    let cat = e.target.value
    let fp = []

    // if (cat.match(/^(Konkurranse|Kompetanse|Utvikling|Toppidrett)$/)) {
    //   //this.setState({topicFocus: ""})
    //   // setSubTopicFocus("")
    //   fp = posts
    // } else {
    //   console.log("NOOOOOOO")
    //   // this.setState({subtopicFocus: cat})
    //   setSubTopicFocus(cat)
    //   //fp = this.state.topics.filter(subtopics => subtopics.topicId === cat)
    //   fp = topics.filter(post => post.subTopicId === cat)
      
    // }
    setSubTopicFocus(cat)
    // console.log(filteredPosts.filter(p => p.subTopicId == Number(cat)))
    // fp = filteredPosts.filter(post => post.subTopicId === Number(cat))
    
    // // console.log(fp)
    
    // setFilteredPosts(fp)
  } 

  // const addPost = async (post) => {
  //   const res = await fetch('https://localhost:44319/posts', {
  //     method: 'POST', 
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(post)
  //   })

  //   const data = await res.json()

  //   // this.setState({posts: [...this.state.posts, data]})
  //   setPosts(current => [...current, data])
  //   // setFilteredPosts(current => [...current, data])
  //   console.log(posts)

  //   // history.push(`/forum/${data.id}`)
  // }




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
      topics = {topics}
      subtopics = {subtopics}
      subClick = {onSubCatClick}
      />
      <Container className="top">
        {/*<h4>{!this.state.topicFocus ? "Kategori" : this.state.topicFocus}</h4>*/}
        <h1>{!subtopicFocus ? "" : subtopicFocus}</h1>
        <div className="float-left">
          <NewPost subtopic={subtopicFocus} add={props.addPost} user={props.user}/>
        </div>
        <div className="float-right">
        Sorter: Nyeste til eldste
        </div>
      </Container>

      <Container className="main">
        {/* {renderPosts} */}
        <Feed post={posts} maxLength={10}/>
      </Container>

      <Container>
        <Pages postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
      </Container>
    </div>
      );
    
}
  
export default Forum;