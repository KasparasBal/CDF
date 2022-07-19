import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsernameContext } from "../context/usernameContext";
import { idContext } from "../context/idContext";
import { pageContext } from "../context/pageContext";

import "../styles/Create.css";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const [edited, setEdited] = useState(0);
  const { page, setPage } = useContext(pageContext);
  const [userId, setUserId] = useState("");
  const { userInfo, setUserInfo } = useContext(UsernameContext);
  const { user, setUser } = useContext(idContext);

  const token = localStorage.getItem("TOKEN");

  const navigate = useNavigate();

  const handleAuthor = () => {
    setAuthor(userInfo);
    setUserId(user);
    setEdited(1);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const post = {
      body,
      edited,
      userId,
    };
    setLoading(true);
    fetch(`http://localhost:8000/posts/${page}`, {
      text: "You need to login to update a post!",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(error);
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("err.message");
        navigate(-1);
      });
  };
  console.log(page);
  return (
    <div className="create_container">
      <form onSubmit={handleSubmitPost} className="create_form">
        <h1 className="create-form-title">Edit Your Post</h1>

        <textarea
          className="create_input body_input"
          id="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {!loading && (
          <button onClick={handleAuthor} className="create_btn">
            Edit Post
          </button>
        )}
        {loading && (
          <button disabled className="create_btn">
            Editing Post..
          </button>
        )}
      </form>
    </div>
  );
};

export default EditPost;
