import { useState, useEffect, useCallback, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode'

//Importing main components.

//Header og footer kan dere bare ignorere for nå
import Footer from "./components/mainComponents/Footer.js";

import Login from "./components/loginComponents/Login.js";
import Home from "./components/homeComponents/Home.js";

//Importing forum components
//Bruk disse hver for seg!
import Forum from "./components/forumComponents/Forum.js";
import Thread from "./components/forumComponents/Thread.js";

import Kunnskapsportalen from "./components/infoComponents/Kunnskapsportalen.js";

import ProtectedRoute from "./ProtectedRoute";
import Toolbar from "./components/NavigationCompoonent/Toolbar/Toolbar";
import SideDrawer from "./components/NavigationCompoonent/SideDrawer/SideDrawer";
import Backdrop from "./components/NavigationCompoonent/Backdrop/Backdrop";
import NotFound from "./components/NotFound";
import AdminPanel from "./components/Admin/AdminPanel";
import SpinnerDiv from "./components/forumComponents/SpinnerDiv";
import moment from "moment";
import UsernameDialog from "./components/Admin/UsernameDialog";
import PasswordDialog from "./components/Admin/PasswordDialog";
// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users
//

export const host = "https://webforum.azurewebsites.net/";

export const UserContext = createContext(null);

const App = () => {
  const history = useHistory();

  const [user, setUser] = useState(false)
  // const [token, setToken] = useState(null)
  const [tokenTimer, setTokenTimer] = useState()

  const [initialized, setInitialized] = useState(false)


  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [infoTopics, setInfoTopics] = useState([]);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);


  const login = user => {
    setUser(user)
    const tt = jwt_decode(user.token).exp * 1000 - 3540000; //- 3540000
    setTokenTimer(tt)
    localStorage.setItem('token', user.token)
    setInitialized(true)
  }

  const logout = () => {
    console.log("YO")
    localStorage.clear();
    setUser(null);
    setTokenTimer(null)
    setInitialized(false)
  }

  const autoLogout = () => {
    alert("Din tilgang har utløpt, vennligst logg inn på nytt")
    logout()
  }

  useEffect(async() => {
    console.log("TTTTTTT")
    const token = localStorage.getItem('token')
    if (token) {
      const userId = jwt_decode(token).nameid
      const user = await getUser(userId, token)
      console.log("mmmmmmmm")
      if(user)
        login({...user, token})
    }
  }, [])

  useEffect(() => {
    console.log("???????")
    let logoutTimer
    if (user?.token && tokenTimer) {
      logoutTimer = setTimeout(autoLogout, tokenTimer - moment().valueOf())
    } else {
      clearTimeout(logoutTimer)
    }
  }, [tokenTimer])

  const getUser = async (id, token) => {
    const res = await fetch(host + `users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const user = await res.json()
    return user;
  }


  const handleDrawerToggleClick = () => {
    setSideDrawerOpen((prevDrawerState) => !prevDrawerState);
  };
  const handleBackdropClick = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={handleBackdropClick} />;
  }

  const toolbar = (
    <Toolbar
      handleDrawerToggleClick={handleDrawerToggleClick}
    />
  );

  const sidebar = (
    <SideDrawer show={sideDrawerOpen} toggle={handleDrawerToggleClick} />
  );

  useEffect(() => {
    if (user) {
      fetch(host + "SubTopics", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setSubtopics(data);
        })
        .catch(console.log);

      fetch(host + "Topics", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setTopics(data);
        })
        .catch(console.log);

      fetch(host + "InfoTopics", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setInfoTopics(data);
        })
        .catch(console.log);
    }


    // setLoading(false)
  }, [initialized]);

  // sends post to api/database and updates posts with new post
  const addPost = async (post, file) => {
    console.log("HALLO");
    const formData = new FormData();
    if (file) formData.append("File", file);
    for (let k in post) {
      formData.append(k, post[k]);
    }
    const res = await fetch(host + "posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      body: formData,
    });

    const data = await res.json();

    return data.id;
  };

  const deletePost = async (postId) => {
    const res = await fetch(host + `posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    return res.status === 200;
  };

  // if(!initialized)
  //   return <SpinnerDiv />

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      <div className="App">
        {user && toolbar}
        {user && sidebar}
        {user && backdrop}
        <Switch>
          <Route path="/Login">
            <Login history={history} />
            <Footer />
          </Route>
          
          <ProtectedRoute exact path="/">
            {initialized ? <Home
              topic={topics}
              subtopic={subtopics}
            /> : <SpinnerDiv />}
          </ProtectedRoute>
         
          <ProtectedRoute exact path="/UsernameDialog">
            {initialized ? <UsernameDialog/> : <SpinnerDiv />}
          </ProtectedRoute> 

          <ProtectedRoute exact path="/PasswordDialog">
            {initialized ? <PasswordDialog user={user}/> : <SpinnerDiv />}
          </ProtectedRoute> 

          <ProtectedRoute exact path="/Forum">
            {initialized ? <Forum
              addPost={addPost}
              subtopics={subtopics}
              topics={topics}
              history={history}
            /> : <SpinnerDiv />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/Kunnskapsportalen">
            {initialized ? <Kunnskapsportalen
              infoTopics={infoTopics}
              addPost={addPost}
              deletePost={deletePost}
            /> : <SpinnerDiv />}
          </ProtectedRoute>

          <ProtectedRoute exact path="/Forum/:postId">
            {initialized ? <Thread
              subtopics={subtopics}
              topics={topics}
              history={history}
              deletePost={deletePost}
            /> : <SpinnerDiv />}
          </ProtectedRoute>

          <ProtectedRoute path="/Admin">
            {initialized ? <AdminPanel /> : <SpinnerDiv />}
          </ProtectedRoute>

          <Route path="/error" component={NotFound} />
        </Switch>
        {initialized && <Footer />}


      </div>
    </UserContext.Provider>
  );
};

export default App;
