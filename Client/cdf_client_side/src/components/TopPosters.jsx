import useFetch from "../hooks/useFetch";

import "../styles/TopPosters.css";
import "../styles/General.css";
import loading_gif from "../img/Loading_Gif.gif";

const TopPosters = () => {
  const {
    data: poster,
    error,
    loading,
  } = useFetch("http://localhost:8000/posts?_sort=id&_order=desc&_limit=3");

  return (
    <div className="top_posters_container">
      <h2 className="component_title">Top Posters</h2>
      <div>
        {error && <div className="error"> {error} </div>}

        {loading && (
          <div className="gif_container">
            <img className="loading_gif" src={loading_gif} alt="loading..." />
          </div>
        )}
        {poster && (
          <div className="posters">
            {poster.map((poster) => (
              <div className="posters_container" key={poster.id}>
                <div className="poster_container">
                  <p className="poster"> {poster.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPosters;
