import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Importing main components
//Header og footer kan dere bare ignorere for nå
import Footer from "./components/mainComponents/Footer.js";
import Header from "./components/mainComponents/Header.js";

import Login from "./components/loginComponents/Login.js";
import Home from "./components/homeComponents/Home.js";

//Importing forum components
//Bruk disse hver for seg!
import Forum from "./components/forumComponents/Forum.js";
import NewComment from "./components/forumComponents/NewComment.js";
import NewPost from "./components/forumComponents/NewPost.js";
import Post from "./components/forumComponents/Post.js";
import ForumCategories from "./components/forumComponents/ForumCategories.js";

//Importing infocomponents
import Info from "./components/infoComponents/Info.js";

class App extends Component {
 
  state = {
    post: [],
    comment: []
  }

  componentDidMount() {
    fetch("https://webforum.azurewebsites.net/posts")
    .then(res => res.json())
    .then((data) => {
      this.setState({ post: data })
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/answers")
    .then(res => res.json())
    .then((data) => {
      this.setState({comment: data})
    }
    )
  }

  //Putt komponentene hver for seg i diven fpr nå. De er ikke skapt for å brukes sammen helt enda :D
  //Akkurat nå er det kun post-komponenten som er synlig!
  render() {
    return (
      <div className="App">
        {/*
        <Post 
        post = {this.state.post} 
        comment = {this.state.comment}
        />
        */}
        <Header />
          <NewPost />
        <Footer />
        </div>
    )
  }
}

export default App;
