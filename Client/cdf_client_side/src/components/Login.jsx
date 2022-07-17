import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { UsernameContext } from "../context/usernameContext";
import { IdContext } from "../context/usernameContext";

const Login = () => {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { userInfo, setUserInfo } = useContext(UsernameContext);
  const [authorid, setAuthorid] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:8000/login",
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setLoading(true);
        setLoggedIn(true);
        setUserInfo(result.data.username);
        console.log(userInfo);
        localStorage.setItem("TOKEN", result.data.token);

        navigate("/");
      })
      .catch((error) => {
        error = new Error();
        setError(error);
      });
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit} className="login_form">
        <h1 className="login-form-title">Login</h1>
        <label className="login_label">Email</label>
        <input
          className="login_input"
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="login_label">Password</label>
        <input
          className="login_input"
          required
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {!loading && <button className="login_btn">LOGIN</button>}
        {loading && (
          <button disabled className="login_btn">
            loading..
          </button>
        )}
        {error && <div>Wrong Credentials</div>}
      </form>
      <div className="register_redirect_container">
        <h3>Not A User?</h3>
        <Link className="register_link_button" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
