import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";

//Importing main components.

//Header og footer kan dere bare ignorere for nå
import Footer from "./components/mainComponents/Footer.js";
import Header from "./components/mainComponents/Header.js";

import Login from "./components/loginComponents/Login.js";
import Home from "./components/homeComponents/Home.js";

//Importing forum components
//Bruk disse hver for seg!
import Forum from "./components/forumComponents/Forum.js";
import Thread from "./components/forumComponents/Thread.js";

import Kunnskapsportalen from "./components/infoComponents/Kunnskapsportalen.js";
import { UserContext } from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import Toolbar from "./components/NavigationCompoonent/Toolbar/Toolbar";
import SideDrawer from "./components/NavigationCompoonent/SideDrawer/SideDrawer";
import Backdrop from "./components/NavigationCompoonent/Backdrop/Backdrop";
import NotFound from "./components/NotFound";
import AdminPanel from "./components/Admin/AdminPanel";
// https://webforum.azurewebsites.net/posts
// https://webforum.azurewebsites.net/answers
// https://webforum.azurewebsites.net/users
//

export const host = "https://webforum.azurewebsites.net/";

const App = () => {
  const history = useHistory();

  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : {};
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const [loading, setLoading] = useState(false);

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [infoTopics, setInfoTopics] = useState([]);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const testlogout = () => {
    setUser({});
  };

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
      logout={testlogout}
    />
  );

  const sidebar = (
    <SideDrawer show={sideDrawerOpen} toggle={handleDrawerToggleClick} logout={testlogout}/>
  );

  useEffect(() => {
    fetch(host + "SubTopics")
      .then((res) => res.json())
      .then((data) => {
        setSubtopics(data);
      })
      .catch(console.log);

    fetch(host + "Topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
      })
      .catch(console.log);

    fetch(host + "InfoTopics")
      .then((res) => res.json())
      .then((data) => {
        setInfoTopics(data);
      })
      .catch(console.log);

    // setLoading(false)
  }, []);

  // sends post to api/database and updates posts with new post
  const addPost = async (post, file) => {
    console.log("HALLO")
    const formData = new FormData();
    if (file) formData.append("File", file);
    for (let k in post) {
      formData.append(k, post[k]);
    }
    const res = await fetch(host + "posts", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data.id;
  };

  const deletePost = async (postId) => {
    const res = await fetch(host + `posts/${postId}`, {
      method: "DELETE",
    });

    return res.status === 200;
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
      
        {user.loggedIn && toolbar}
        {user.loggedIn && sidebar}
        {user.loggedIn && backdrop}
        <Switch>
          <Route path="/Login">
            <Login history={history} />
          </Route>
          <ProtectedRoute exact path="/">
            <Home
              topic={topics}
              subtopic={subtopics}
              loading={loading}
            />{" "}
          </ProtectedRoute>

          <ProtectedRoute exact path="/Forum">
            <Forum
              addPost={addPost}
              subtopics={subtopics}
              topics={topics}
              history={history}
            />{" "}
          </ProtectedRoute>
          <ProtectedRoute exact path="/Kunnskapsportalen">
            <Kunnskapsportalen
              infoTopics={infoTopics}
              addPost={addPost}
              deletePost={deletePost}
            />{" "}
          </ProtectedRoute>
          <ProtectedRoute exact path="/Forum/:postId">
            <Thread
              subtopics={subtopics}
              topics={topics}
              history={history}
              deletePost={deletePost}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/Admin">
            <AdminPanel />
          </ProtectedRoute>
          <Route path="/error" component={NotFound} />
        </Switch>
        <Footer />
        
      
      </div>
    </UserContext.Provider>
  );
};

export default App;
