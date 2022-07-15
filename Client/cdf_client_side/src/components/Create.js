import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const post = {
      title,
      body,
      likes: 0,
      dislikes: 0,
      comments: 0,
    };

    setLoading(true);

    fetch("http://localhost:8000/664/posts", {
      text: "You need to login to create a post!",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(error);
        }
        return res.json();
      })
      .then(() => {
        console.log("text");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="create_container">
      <form onSubmit={handleSubmitPost} className="create_form">
        <h1 className="create-form-title">Create New Post</h1>
        <label className="create_label">Title</label>
        <input
          className="create_input"
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label className="create_label">Body</label>
        <textarea
          className="create_input body_input"
          id="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {!loading && <button className="create_btn">Create Post</button>}
        {loading && (
          <button disabled className="create_btn">
            Creating Post..
          </button>
        )}
        {error && <div>Must be logged in to create posts!</div>}
      </form>
    </div>
  );
};

export default Create;
