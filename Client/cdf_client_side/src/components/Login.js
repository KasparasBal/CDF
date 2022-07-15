import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    setLoading(true);

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      console.log("succesfully logged in");
      setLoading(false);
      setLoggedIn(true);
      navigate("/");
    });
  };

  return (
    <div className="login_container">
      <form onSubmit={handleLogin} className="login_form">
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
