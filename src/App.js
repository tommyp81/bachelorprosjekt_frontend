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

import Kunnskapsportalen from "./components/infoComponents/Kunnskapsportalen";
// import Kunnskapsportalen from "./components/infoComponents/Info";
import Register from './components/registerComponent/Register';
import { UserContext } from './UserContext'
import ProtectedRoute from './ProtectedRoute'
// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users




const App = () => {

  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : {}
  })
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])



  useEffect(() => {
    fetch("https://webforum.azurewebsites.net/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/SubTopics")
    .then(res => res.json())
    .then((data) => {
      setSubtopics(data)
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/Topics")
    .then(res => res.json())
    .then((data) => {
      setTopics(data)
    })
    .catch(console.log)

    fetch("https://webforum.azurewebsites.net/Users")
    .then(res => res.json())
    .then((data) => {
      setUsers(data)
    })
    .catch(console.log)

  }, [])

  const addPost = async (post) => {
    const res = await fetch('https://webforum.azurewebsites.net/posts', {
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
      <UserContext.Provider value={{user, setUser}} >
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/Login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} subtopic={subtopics} users={users} posts={posts}/>
            <ProtectedRoute path="/Register" component={Register} Register = {Register} />
            <ProtectedRoute exact path="/Forum" component={Forum} posts={posts} addPost={addPost} subtopics={subtopics} topics={topics} users={users} />
            <ProtectedRoute exact from="/Kunnskasportalen" component={Kunnskapsportalen} />
            <ProtectedRoute exact path="/Forum/:postId" component={Post} subtopics={subtopics} topics={topics} users={users} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>   
    
  )
}

export default App;