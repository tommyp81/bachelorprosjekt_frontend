import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

//Importing main components.

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
//add npm i styled-components
import styled from "styled-components";
import Kunnskapsportalen from "./components/infoComponents/Kunnskapsportalen.js";

// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users

const AppContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
background-color: rgba(15, 15, 15, 1);
color: #fff;
`;

const App = () => {
 
  // state = {
  //   post: [],
  //   comment: [],
  //   user: []
  // }

  // const [user, setUser] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)


  

  const logIn = () => {
    setLoggedIn(true);
    console.log(loggedIn)
  }


  //Putt komponentene hver for seg i diven fpr nå. De er ikke skapt for å brukes sammen helt enda :D
  //Akkurat nå er det kun post-komponenten som er synlig!
  return (
    <BrowserRouter>
      <div className="App">

        {/* related to the navigationbar.*/}
        <AppContainer>
          <Navbar />
        </AppContainer>
        <Switch>
    
          <Route exact path="/" component={Home} />
          <Route path="/Login" render={props => <Login {...props} logIn = {logIn} />} />
          {/* <Route exact from="/Forum" render={props => <Post {...props} users = {users} post = {post} comment = {comment}/>} /> */}
          <Route exact from="/Forum" render={props => <Forum {...props} />} />
          <Route exact from="/Kunnskasportalen" render={props => <Kunnskapsportalen {...props} />} />

        </Switch>
        {/* <Forum /> */}
      </div>
    </BrowserRouter>   
    
  )
}

export default App;
