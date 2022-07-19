import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { idContext } from "../context/idContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const { user: userId, setUser } = useContext(idContext);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const user = {
      picture,
    };

    setLoading(true);

    fetch("http://localhost:8000/editProfile/" + userId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      picture: JSON.stringify(user),
    }).then(() => {
      console.log("updated user");
      setLoading(false);
      navigate("/profile");
    });
  };

  return (
    <div className="login_container">
      <form onSubmit={handleEdit} className="login_form">
        <h1 className="login-form-title">Edit Your Profile</h1>
        <label className="login_label">Username</label>
        <input
          className="login_input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label className="login_label">Picture Url</label>
        <input
          className="login_input"
          type="text"
          id="picture"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        ></input>

        {!loading && <button className="login_btn">Update</button>}
        {loading && (
          <button disabled className="login_btn">
            loading..
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
