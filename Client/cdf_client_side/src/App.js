import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Login from "./components/Login";
import Register from "./components/Register";
import PostInfo from "./components/PostInfo";

import "./styles/App.css";

import { UserContext } from "../src/context/userContext";
import { commentContext } from "./context/commentContext";
import { LikeContext } from "./context/LikeContext";
import { UsernameContext } from "../src/context/usernameContext";
import { idContext } from "../src/context/idContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [render, setRender] = useState(false);
  const [color, setColor] = useState("reaction_btn");

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
          <UsernameContext.Provider value={{ userInfo, setUserInfo }}>
            <idContext.Provider value={{ user, setUser }}>
              <commentContext.Provider value={{ render, setRender }}>
                <LikeContext.Provider value={(color, setColor)}>
                  <Nav />

                  <Routes>
                    <Route path="/" element={<Home />}></Route>

                    <Route path="/create" element={<Create />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/login" element={<Login />}></Route>

                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/posts/:id" element={<PostInfo />}></Route>
                  </Routes>
                </LikeContext.Provider>
              </commentContext.Provider>
            </idContext.Provider>
          </UsernameContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
