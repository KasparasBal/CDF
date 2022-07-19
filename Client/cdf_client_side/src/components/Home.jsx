import Posts from "./Posts";

import "../styles/Home.css";

import loading_gif from "../img/Loading_Gif.gif";
import useFetch from "../hooks/useFetch";
import AllPostsCount from "./AllPostsCount";

const Home = (props) => {
  const { data, loading, error } = useFetch("http://localhost:8000/");
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
        {data && <Posts posts={data} />}
      </div>
    </div>
  );
};

export default Home;
