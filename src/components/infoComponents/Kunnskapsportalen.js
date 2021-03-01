import React, { Component, useState, useEffect } from 'react';
import Topics from "../../components/forumComponents/Topics.js";
import {Row, Col, Container, Tabs, Tab} from "react-bootstrap";
import "./Kunnskapsportalen.css";
 
const Kunnskapsportalen = () => {

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [topicFocus, setTopicFocus] = useState("");
  const [subtopicFocus, setSubTopicFocus] = useState("");
    
    
  useEffect(() => {
    fetch("https://webforum.azurewebsites.net/Topics")
    .then(res => res.json())
    .then((data) => {
      setTopics(data)
    })
    .catch(console.log)


    fetch("https://webforum.azurewebsites.net/SubTopics")
    .then(res => res.json())
    .then((data) => {
      setSubtopics(data)
    })
    .catch(console.log)
  }, [])
    
  const onTopClick = (e) => {
    let top = e.target.value
    
    setTopicFocus(top)
  }

  const onSubClick = (e) => {
    let subTop = e.target.value
    /*
    let fp = []
    if (subTop.match(filteredPosts.filter(filteredPosts => filteredPosts.subTopicId))) {
      setSubTopicFocus("")
      fp = filteredPosts;
    } else {
      setSubTopicFocus(subTop)
      fp = filteredPosts.filter(filteredPosts => filteredPosts.subTopicId === subTop)
    }
    setFilteredPosts(fp)*/
    setSubTopicFocus(subTop)
  } 
        return (
            <div className="Info">
                
                <Container>
                <Topics 
                topics = {topics}
                subtopics = {subtopics}
                subClick = {onSubClick}
                topClick = {onTopClick}
                />
                </Container>
            </div>
    );
}

export default Kunnskapsportalen;