import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    setLoading(true);

    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      console.log("added user");
      setLoading(false);
      navigate("/login");
    });
  };

  return (
    <div className="login_container">
      <form onSubmit={handleRegister} className="login_form">
        <h1 className="login-form-title">Register</h1>
        <label className="login_label">Username</label>
        <input
          className="login_input"
          required
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label className="login_label">Email</label>
        <input
          className="login_input"
          required
          type="email"
          id="email"
          value={email}
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

        {!loading && <button className="login_btn">REGISTER</button>}
        {loading && (
          <button disabled className="login_btn">
            loading..
          </button>
        )}
      </form>
      <div className="register_redirect_container">
        <h3>Have an Account?</h3>
        <Link className="register_link_button" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
