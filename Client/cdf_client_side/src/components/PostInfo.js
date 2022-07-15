import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import "../styles/PostInfo.css";
import loading_gif from "../img/Loading_Gif.gif";

const like = (
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
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>
);

const dislike = (
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
      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
    />
  </svg>
);

const PostInfo = () => {
  const { id } = useParams();
  const {
    data: post,
    error,
    loading,
  } = useFetch("http://localhost:8000/posts/" + id);

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
          <div className="postInfo_title_container">
            <h2 className="postInfo_title">{post.title}</h2>
          </div>
          <hr className="postInfo_hr"></hr>
          <div className="postInfo_content">
            <div className="postInfo_body">{post.body}</div>
          </div>
          <div className="postInfo_hr">
            <hr></hr>
            <div className="postInfo_votes">
              <button className="reaction_btn">{like}</button>
              <span>{post.likes}</span>
              <button className="reaction_btn">{dislike}</button>
              <span>{post.dislikes}</span>
            </div>
          </div>
          <div className="postInfo_answer_input_container">
            <div className="postInfo_answers_title">Your Answer:</div>
            <textarea className="postInfo_answer_input"></textarea>
          </div>
          <div className="all_answers"></div>
        </article>
      )}
    </div>
  );
};

export default PostInfo;
