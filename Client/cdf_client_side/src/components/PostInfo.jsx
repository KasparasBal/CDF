import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";

import { useContext } from "react";
import { idContext } from "../context/idContext";
import { comIDContext } from "../context/comIDContext";
import { pageContext } from "../context/pageContext";

import "../styles/PostInfo.css";
import loading_gif from "../img/Loading_Gif.gif";

const garbage = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="link_icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const pencil = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="link_icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

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
  const { com, setCom } = useContext(comIDContext);
  const { user, setUser } = useContext(idContext);
  const { page, setPage } = useContext(pageContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("TOKEN");
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

  const handlePage = () => {
    setPage(id);
    console.log(id);
  };
  const handleDelete = () => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: user }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("post deleted");
        navigate("/");
      });
  };

  const duomenys = {
    userId: user,
    commentId: com,
  };

  const handleDeleteComment = (a) => {
    fetch(`http://localhost:8000/comment/${com}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ duomenys }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("comment deleted");
        navigate("/");
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
              <h2 className="postInfo_title">{post.title} </h2>
              <div className={post.edited === 1 ? "edited" : "not_edited"}>
                *Post Was Edited
              </div>
              <Link
                to="/editPost"
                onClick={handlePage}
                className={
                  post.userId === user ? "edit_post" : "edit_post_restricted "
                }
              >
                {pencil}
              </Link>

              <div
                onClick={handleDelete}
                className={
                  post.userId === user
                    ? "delete_post"
                    : "delete_post_restricted "
                }
              >
                {garbage}
              </div>
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
                                    <div className="comment_info">
                                      <span>
                                        <img
                                          className="comment_user_picture"
                                          src={item.picture}
                                          alt="profile_pic"
                                        />
                                      </span>{" "}
                                      {item.username}
                                    </div>
                                    <span className="comment_actions">
                                      {" "}
                                      <div
                                        className={
                                          comment.edited === 1
                                            ? "answ_edited"
                                            : "answ_not_edited"
                                        }
                                      >
                                        *Answer Was Edited
                                      </div>
                                      <Link
                                        to="/editComment"
                                        onClick={handlePage}
                                        className={
                                          item._id === user
                                            ? "edit_comment"
                                            : "edit_comment_restricted "
                                        }
                                      >
                                        {pencil}
                                      </Link>
                                      <div
                                        onClick={handleDeleteComment}
                                        onMouseOver={(e) => setCom(comment._id)}
                                        className={
                                          item._id === user
                                            ? "delete_comment"
                                            : "delete_comment_restricted "
                                        }
                                      >
                                        {garbage}
                                      </div>
                                    </span>
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
