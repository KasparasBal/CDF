import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";

import { useContext } from "react";
import { idContext } from "../context/idContext";

import "../styles/PostInfo.css";
import loading_gif from "../img/Loading_Gif.gif";

const heart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const PostInfo = (props) => {
  const [comments, setComments] = useState(null);
  const { user, setUser } = useContext(idContext);
  const { id } = useParams();

  const {
    data: post,
    error,
    loading,
  } = useFetch("http://localhost:8000/posts/" + id);

  //LIKE A POST

  let object = "reaction_btn";

  const handleLike = () => {
    fetch(`http://localhost:8000/posts/${id}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("post liked");
      });
  };
  useEffect(() => {
    fetch("http://localhost:8000/comments")
      .then((res) => {
        if (!res.ok) {
          throw Error("OOPS! something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="postInfo">
      {error && <div className="error"> {error} </div>}
      {loading && (
        <div className="gif_container">
          <img className="loading_gif" src={loading_gif} alt="loading..." />
        </div>
      )}
      {post && (
        <article className="postInfo_container">
          <div className="inner_post">
            <div className="postInfo_title_container">
              <h2 className="postInfo_title">{post.title}</h2>
            </div>
            <div className="postInfo_content">
              <div className="postInfo_body">{post.body}</div>
            </div>
            <div className="postInfo_hr">
              <div className="postInfo_votes">
                <button
                  onClick={handleLike}
                  className={
                    post.likes.includes(user) ? "reaction_btn2" : "reaction_btn"
                  }
                >
                  {heart}
                </button>
              </div>
            </div>
          </div>
          <div className="postInfo_answer_input_container"></div>
          <div className="all_answers"></div>
          <div className="commentsTitle">All Answers:</div>
          {comments &&
            comments.map((comment) => {
              if (id === comment.postId) {
                return (
                  <div className="comment">
                    <div key={comment._id}>
                      {
                        <div>
                          <div className="comment_content">
                            {comment.content}
                          </div>
                          <div>
                            {comment.user.map((item) => {
                              return (
                                <div key={item._id}>
                                  <div className="comment_username">
                                    <span>
                                      <img
                                        className="comment_user_picture"
                                        src={item.picture}
                                        alt="profile_pic"
                                      />
                                    </span>{" "}
                                    {item.username}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      }
                      <div></div>
                    </div>
                  </div>
                );
              }
            })}
        </article>
      )}
      <div className="answering_section">
        <CommentInput />
      </div>
    </div>
  );
};

export default PostInfo;
