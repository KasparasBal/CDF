import Posts from "./Posts";
import RecentPosts from "./RecentPosts";
import TopPosters from "./TopPosters";
import Sidebar from "./Sidebar";

import "../styles/Home.css";

import loading_gif from "../img/Loading_Gif.gif";
import useFetch from "../hooks/useFetch";

const Home = (props) => {
  const { data, loading, error } = useFetch("http://localhost:8000/664/posts");
  return (
    <div className="home">
      <Sidebar />

      <div className="posts">
        {error && <div className="error"> {error} </div>}
        {loading && (
          <div className="gif_container">
            <img className="loading_gif" src={loading_gif} alt="loading..." />
          </div>
        )}
        <div className="posts_title">All Questions</div>
        {data && <Posts posts={data} />}
      </div>

      <RecentPosts />
      <TopPosters />
    </div>
  );
};

export default Home;