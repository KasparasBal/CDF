import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import "../styles/RecentPosts.css";
import "../styles/General.css";
import loading_gif from "../img/Loading_Gif.gif";

const RecentPosts = () => {
  const {
    data: recent,
    error,
    loading,
  } = useFetch("http://localhost:8000/posts?_sort=id&_order=desc&_limit=3");

  return (
    <div className="recent_posts_container">
      <h2 className="component_title">Recent Posts</h2>
      <div>
        {error && <div className="error"> {error} </div>}

        {loading && (
          <div className="gif_container">
            <img className="loading_gif" src={loading_gif} alt="loading..." />
          </div>
        )}
        {recent && (
          <div className="recent_posts">
            {recent.map((recent) => (
              <Link to={`/posts/${recent.id}`}>
                <div className="recent_post" key={recent.id}>
                  <h2 className="recent_post_title">{recent.title}</h2>
                  <p className="recent_post_author"> Author: {recent.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPosts;
