import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import "./App.css";
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

import { Navbar } from "./components/navigation/navbar/navbar";

import Kunnskapsportalen from "./components/infoComponents/Kunnskapsportalen.js";

// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users




const App = () => {
 
  // state = {
  //   post: [],
  //   comment: [],
  //   user: []
  // }

  const [user, setUser] = useState({id: 6, username: "test"})


  const [loggedIn, setLoggedIn] = useState(false)
  
  // const [topics, setTopics] = useState([]);
  // const [subtopics, setSubtopics] = useState([]);
  const [posts, setPosts] = useState([]);


  const testId = 22;

  const logIn = () => {
    setLoggedIn(true);
    console.log(loggedIn)
  }

  useEffect(() => {

    

    fetch("https://localhost:44319/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data)
      // setFilteredPosts(data)
    })
    .catch(console.log)

  }, [])

  // const fetchPost = async (id) => {
  //   const res = await fetch(`https://localhost:44319/posts/${id}`)
  //   const data = await res.json()

  //   return data
  // }

  const addPost = async (post) => {
    const res = await fetch('https://localhost:44319/posts', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post)
    })

    const data = await res.json()

    // this.setState({posts: [...this.state.posts, data]})
    setPosts(current => [...current, data])
    // setFilteredPosts(current => [...current, data])
    // console.log(posts)

    // history.push(`/forum/${data.id}`)
  }


  //Putt komponentene hver for seg i diven fpr nå. De er ikke skapt for å brukes sammen helt enda :D
  //Akkurat nå er det kun post-komponenten som er synlig!
  return (
    <BrowserRouter>
      <div className="App">
     
        {/* related to the navigationbar.*/}
    
          <Navbar />
 
        
      
        <Switch>
    
          <Route exact path="/" component={Home} />
          <Route path="/Login" render={props => <Login {...props} logIn = {logIn} />} />
          {/* <Route exact from="/Forum" render={props => <Post {...props} users = {users} post = {post} comment = {comment}/>} /> */}
          <Route exact from="/Forum" render={props => <Forum {...props} posts={posts} user={user} addPost={addPost}/>} />
          <Route exact from="/Kunnskasportalen" render={props => <Kunnskapsportalen {...props} />} />
          <Route exact path="/Forum/:id" render={props => <Post {...props}  
            // post={posts.find(p => p.id === parseInt(props.match.params.id))} 
            postId = {parseInt(props.match.params.id)}
            user={user}/>}
          />

        </Switch>
        
      </div>
    </BrowserRouter>   
    
  )
}

export default App;