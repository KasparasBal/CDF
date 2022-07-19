import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsernameContext } from "../context/usernameContext";
import { idContext } from "../context/idContext";
import { comIDContext } from "../context/comIDContext";
import { pageContext } from "../context/pageContext";

import "../styles/Create.css";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const [edited, setEdited] = useState(0);
  const { page, setPage } = useContext(pageContext);
  const [userId, setUserId] = useState("");
  const { userInfo, setUserInfo } = useContext(UsernameContext);
  const { user, setUser } = useContext(idContext);
  const { com, setCom } = useContext(comIDContext);

  const token = localStorage.getItem("TOKEN");

  const navigate = useNavigate();

  const handleAuthor = () => {
    setAuthor(userInfo);
    setUserId(user);
    setEdited(1);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const comment = {
      content,
      edited,
      user,
    };
    setLoading(true);
    fetch(`http://localhost:8000/comment/${com}`, {
      text: "You need to login to update comment!",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(error);
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        navigate(-1);
      })
      .catch((err) => {
        setLoading(false);
        setError("err.message");
        navigate(-1);
      });
  };

  return (
    <div className="create_container">
      <form onSubmit={handleSubmitComment} className="create_form">
        <h1 className="create-form-title">Edit Your Comment</h1>

        <textarea
          className="create_input body_input"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {!loading && (
          <button onClick={handleAuthor} className="create_btn">
            Edit
          </button>
        )}
        {loading && (
          <button disabled className="create_btn">
            Editing..
          </button>
        )}
      </form>
    </div>
  );
};

export default EditPost;
