import React, { Component, useState } from 'react';
import Topics from "../../components/forumComponents/Topics.js";
import {Row, Col, Container, Tabs, Tab} from "react-bootstrap";
import "./Kunnskapsportalen.css";
 
class Info extends Component {

    state = {
        topics: [],
        subtopics: [],
        posts: [],
        filteredPosts: [], 
        currentFilter: ""
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
        return (
            <div className="Info">
                
                <Container>
                <Topics 
                topics = {this.state.topics}
                subtopics = {this.state.subtopics}
                subClick = {this.onSubCatClick}
                />
                </Container>
            </div>
    );
    }
}

export default Info;