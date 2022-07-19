import Posts from "./Posts";

import "../styles/Home.css";
import { useState } from "react";
import loading_gif from "../img/Loading_Gif.gif";
import useFetch from "../hooks/useFetch";
import AllPostsCount from "./AllPostsCount";

const Home = (props) => {
  const leftArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const rightArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  ///POST COUNT
  const { data: count } = useFetch("http://localhost:8000/count");
  //POSTS
  let number = Math.trunc(count / 3);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(`http://localhost:8000/?p=${page}`);

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === count) return p;
      return p + 1;
    });
  }

  return (
    <div className="home">
      <div className="posts">
        {error && <div className="error"> {error} </div>}
        {loading && (
          <div className="gif_container">
            <img className="loading_gif" src={loading_gif} alt="loading..." />
          </div>
        )}
        <div className="posts_title">All Questions</div>
        <AllPostsCount />
        <div className="pagination_filter_container">
          <div className="filter_select_container">
            Filter By:
            <select className="filter_select">
              <option value="/">All Answers</option>
              <option value="/mostAnswers">Most Answers</option>
              <option value="/mostLikes">Most Likes</option>
              <option value="/mostDislikes">Most Dislikes</option>
              <option value="/leastAnswers">Least Answers</option>
              <option value="/leastLikes">Least Likes</option>
              <option value="/leastDislikes">Least Dislikes</option>
            </select>
          </div>
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={handlePrevious}
              className="arrow_btn"
            >
              {leftArrow}
            </button>
            <div className="page_number">{page}</div>
            <button
              disabled={page === number}
              onClick={handleNext}
              className="arrow_btn"
            >
              {rightArrow}
            </button>
          </div>
        </div>
        {data && <Posts posts={data} />}
      </div>
    </div>
  );
};

export default Home;
