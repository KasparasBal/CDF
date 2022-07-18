import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsernameContext } from "../context/usernameContext";
import { idContext } from "../context/idContext";

import "../styles/CommentInput.css";

const CommentInput = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");

  const [userId, setUserId] = useState("");
  const { userInfo, setUserInfo } = useContext(UsernameContext);
  const { user, setUser } = useContext(idContext);

  const token = localStorage.getItem("TOKEN");

  const navigate = useNavigate();

  const handleAuthor = () => {
    setAuthor(userInfo);
    console.log(author);
    console.log(user);
    setUserId(user);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const post = {
      postId: id,
      content,
      author,
      userId,
    };
    setLoading(true);
    fetch("http://localhost:8000/comment", {
      text: "You need to login to create a post!",
      method: "POST",
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
        setError(err.message);
      });
  };

  return (
    <div className="create_container">
      <form onSubmit={handleSubmitPost} className="comment_create_form">
        <textarea
          className="comment_input"
          id="body"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {!loading && (
          <button onClick={handleAuthor} className="comment_btn">
            Comment
          </button>
        )}
        {loading && (
          <button disabled className="comment_btn">
            Commenting...
          </button>
        )}
        {error && <div>Only logged in users can Comment!</div>}
      </form>
    </div>
  );
};

export default CommentInput;
