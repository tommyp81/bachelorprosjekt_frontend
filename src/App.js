import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

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
import Post from "./components/forumComponents/Post.js";

//add npm i styled-components
import styled from "styled-components";
import { Navbar } from "./components/navigation/navbar/navbar";

// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users

const App = () => {
 
  // state = {
  //   post: [],
  //   comment: [],
  //   user: []
  // }

  const [post, setPost] = useState([])
  const [comment, setComment] = useState([])
  const [users, setUsers] = useState([])

  // const [user, setUser] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)


  

  const logIn = () => {

    

    setLoggedIn(true);
    console.log(loggedIn)
    
  }

  useEffect(() => {
    const getPosts = async () => {
      const postsFromServer = await fetchPosts()
      setPost(postsFromServer)
    }
    getPosts()
  }, [post])

  useEffect(() => {
    const getComments = async () => {
      const commentsFromServer = await fetchComments()
      setComment(commentsFromServer)
    }
    getComments()
  }, [comment])

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer)
    }
    getUsers()
  }, [users])

  const fetchPosts = async () => {
    const res = await fetch("https://localhost:44387/Posts")
    const data = await res.json()
    return data
  }

  const fetchComments = async () => {
    const res = await fetch("https://localhost:44387/answers")
    const data = await res.json()
    return data
  }

  const fetchUsers = async () => {
    const res = await fetch("https://localhost:44387/users")
    const data = await res.json()
    return data
  }


  const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(15, 15, 15, 1);
  color: #fff;
`;


  //Putt komponentene hver for seg i diven fpr nå. De er ikke skapt for å brukes sammen helt enda :D
  //Akkurat nå er det kun post-komponenten som er synlig!
  return (
    <BrowserRouter>
      {/* {!loggedIn ? <Login logIn={logIn} /> : 
      // <Post 
      //   users = {users}
      //   post = {post} 
      //   comment = {comment}
      //   />
        <Home />
      } */}
      <div className="App">
        {/* related to the navigationbar*/}
        <AppContainer>
          <Navbar />
        </AppContainer>

        <Switch>
          <Route path="/" render={props => <Login {...props} logIn = {logIn} />} exact={true} />
          <Route path="/hjem" component={Home} />
          <Route exact from="/forum" render={props => <Post {...props} users = {users} post = {post} comment = {comment}/>} />

        </Switch>
      </div>
    </BrowserRouter>   
    
  )
}

export default App;
