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
import Register from "./components/registerComponent/Register";
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

export const host = "https://badmintonbackend.azurewebsites.net/";

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
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [infoTopics, setInfoTopics] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
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
      users={users}
      setUsers={setUsers}
    />
  );

  const sidebar = (
    <SideDrawer show={sideDrawerOpen} toggle={handleDrawerToggleClick} />
  );

  useEffect(() => {
    fetch(host + "posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch(console.log);

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

    fetch(host + "Users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch(console.log);

    fetch(host + "InfoTopics")
      .then((res) => res.json())
      .then((data) => {
        setInfoTopics(data);
      })
      .catch(console.log);

    fetch(host + "Videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch(console.log);

    fetch(host + "getdocuments")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      })
      .catch(console.log);
    // setLoading(false)
  }, []);

  // const updatePosts = async () => {
  //   const res = await fetch("https://localhost:44361/posts");
  //   const data = await res.json();
  //   setPosts(data);
  // };

  // sends post to api/database and updates posts with new post
  const addPost = async (post, file) => {
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
    setPosts((current) => [...current, data]);

    return data.id;
  };

  const deletePost = async (postId) => {
    const res = await fetch(host + `posts/${postId}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      updatePostInArray(postId, {}, true);
      return true;
    } else {
      return false;
    }
  };

  // search for specific post by id(number) in posts and returns said post
  const getPost = (id) => {
    return posts.find((post) => post.id == id) || {};
  };

  const updatePostInArray = (id, changes, isDelete) => {
    if (!isDelete) {
      const updatedPosts = posts.map((p) => {
        if (p.id == id) {
          const updatedPost = {
            ...p,
            ...changes,
          };
          return updatedPost;
        }
        return p;
      });
      setPosts(updatedPosts);
    } else {
      setPosts(posts.filter((p) => p.id != id));
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
      
        {user.loggedIn && toolbar}
        {user.loggedIn && sidebar}
        {user.loggedIn && backdrop}
        <Switch>
          <Route path="/Login">
            <Login history={history} setUsers={setUsers} />
          </Route>
          <ProtectedRoute exact path="/">
            <Home
              topic={topics}
              subtopic={subtopics}
              users={users}
              posts={posts}
              loading={loading}
            />{" "}
          </ProtectedRoute>

          <ProtectedRoute exact path="/Forum">
            <Forum
              posts={posts}
              addPost={addPost}
              subtopics={subtopics}
              topics={topics}
              users={users}
              history={history}
              loading={loading}
            />{" "}
          </ProtectedRoute>
          <ProtectedRoute exact path="/Kunnskapsportalen">
            <Kunnskapsportalen
              infoTopics={infoTopics}
              videos={videos}
              documents={documents}
              users={users}
              post={posts}
              addPost={addPost}
              deletePost={deletePost}
            />{" "}
          </ProtectedRoute>
          <ProtectedRoute exact path="/Forum/:postId">
            <Thread
              subtopics={subtopics}
              topics={topics}
              users={users}
              history={history}
              getPost={getPost}
              updatePostInArray={updatePostInArray}
              deletePost={deletePost}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/Admin">
            <AdminPanel users={users} setUsers={setUsers} />
          </ProtectedRoute>
          <Route path="/error" component={NotFound} />
        </Switch>
        <Footer />
        
      
      </div>
    </UserContext.Provider>
  );
};

export default App;
