import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Login from "./components/Login";
import Register from "./components/Register";
import PostInfo from "./components/PostInfo";
import EditProfile from "./components/EditProfile";
import EditPost from "./components/EditPost";
import EditComment from "./components/EditComment";

import "./styles/App.css";

import { UserContext } from "../src/context/userContext";
import { pageContext } from "../src/context/pageContext";
import { commentContext } from "./context/commentContext";
import { UsernameContext } from "../src/context/usernameContext";
import { idContext } from "../src/context/idContext";
import { comIDContext } from "../src/context/comIDContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(null);
  const [com, setCom] = useState(null);
  const [render, setRender] = useState(false);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
          <UsernameContext.Provider value={{ userInfo, setUserInfo }}>
            <idContext.Provider value={{ user, setUser }}>
              <comIDContext.Provider value={{ com, setCom }}>
                <pageContext.Provider value={{ page, setPage }}>
                  <commentContext.Provider value={{ render, setRender }}>
                    <Nav />

                    <Routes>
                      <Route path="/" element={<Home />}></Route>

                      <Route path="/create" element={<Create />}></Route>
                      <Route path="/profile" element={<Profile />}></Route>
                      <Route path="/login" element={<Login />}></Route>
                      <Route
                        path="/editProfile/:id"
                        element={<EditProfile />}
                      ></Route>

                      <Route path="/register" element={<Register />}></Route>
                      <Route path="/editPost" element={<EditPost />}></Route>
                      <Route
                        path="/editComment"
                        element={<EditComment />}
                      ></Route>
                      <Route path="/posts/:id" element={<PostInfo />}></Route>
                    </Routes>
                  </commentContext.Provider>
                </pageContext.Provider>
              </comIDContext.Provider>
            </idContext.Provider>
          </UsernameContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
