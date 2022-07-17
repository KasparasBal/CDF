import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import loading_gif from "../img/Loading_Gif.gif";
import { useContext } from "react";
import { UsernameContext } from "../context/usernameContext";
import useFetch from "../hooks/useFetch";
import "../styles/CommentSection.css";

const CommentSection = (post) => {
  const { data, loading, error } = useFetch("http://localhost:8000/");
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [comment, setComment] = useState("");
  const { userInfo, setUserInfo } = useContext(UsernameContext);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const { id } = useParams();

  const token = localStorage.getItem("TOKEN");

  //Post Comment
  const handleClick = () => {
    setValue(userInfo.concat(": ", comment));
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      value,
      id,
    };
    setCommentLoading(true);
    fetch(`http://localhost:8000/posts/${id}/comment`, {
      text: "You need to be logged in to post a comment!",
      method: "POST",
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
        alert("commented");
      })
      .catch((err) => {
        setCommentError(err.message);
      });
  };

  console.log(post);
  return (
    <div>
      <div className="CommentContainer">
        {error && <div className="error"> {error} </div>}
        {loading && (
          <div className="gif_container">
            <img className="loading_gif" src={loading_gif} alt="loading..." />
          </div>
        )}

        {data && (
          <div className="comments">
            {data.map((post) => (
              <div className="comments_preview" key={post.id}>
                <div>
                  {post.comments.map((comment) => (
                    <div>{comment}</div>
                  ))}
                </div>
                <p className="post_author"> Author: {post.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleClick}>Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
