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
// import Kunnskapsportalen from "./components/infoComponents/Info";
import Register from './components/registerComponent/Register';
import { UserContext } from './UserContext'
import ProtectedRoute from './ProtectedRoute'
// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users




const App = () => {

  const history = useHistory()

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
    fetch("https://localhost:44361/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    })
    .catch(console.log)

    fetch("https://localhost:44361/SubTopics")
    .then(res => res.json())
    .then((data) => {
      setSubtopics(data)
    })
    .catch(console.log)

    fetch("https://localhost:44361/Topics")
    .then(res => res.json())
    .then((data) => {
      setTopics(data)
    })
    .catch(console.log)

    fetch("https://localhost:44361/Users")
    .then(res => res.json())
    .then((data) => {
      setUsers(data)
    })
    .catch(console.log)

  }, [])

  const updatePosts = async () => {
    const res = await fetch('https://localhost:44361/posts')
    const data = await res.json()
    setPosts(data)
  }

  const addPost = async (post, file) => {
    const formData = new FormData();
    if (file)
      formData.append('File', file)
    for (let k in post) {
      formData.append(k, post[k])
    }
    const res = await fetch('https://localhost:44361/posts', {
      method: 'POST', 
      body: formData
    })

    const data = await res.json()
    setPosts(current => [...current, data])

    return data.id
  }


  //Putt komponentene hver for seg i diven fpr nå. De er ikke skapt for å brukes sammen helt enda :D
  //Akkurat nå er det kun post-komponenten som er synlig!
  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}} >
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/Login" component={Login} history={history} />
            <ProtectedRoute exact path="/" component={Home} subtopic={subtopics} users={users} posts={posts}/>
            <ProtectedRoute path="/Register" component={Register} Register = {Register} />
            <ProtectedRoute exact path="/Forum" component={Forum} posts={posts} addPost={addPost} subtopics={subtopics} topics={topics} users={users} history={history} />
            <ProtectedRoute exact path="/Kunnskapsportalen" component={Kunnskapsportalen} users={users}/>
            <ProtectedRoute exact path="/Forum/:postId" component={Post} subtopics={subtopics} topics={topics} users={users} history={history} updatePosts={updatePosts} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>   
    
  )
}

export default App;