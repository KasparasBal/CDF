import { Link } from "react-router-dom";

import "../styles/Sidebar.css";
import "../styles/General.css";

const Sidebar = () => {
  return (
    <div className="sidebar_container">
      <div className="sidebar_links">
        <div className="component_title">Explore</div>
        <div>
          <Link className="sidebar_link" to="/users">
            Users
          </Link>
          <Link className="sidebar_link" to="/users">
            Trending
          </Link>
          <Link className="sidebar_link" to="/users">
            Unsolved
          </Link>
          <Link className="sidebar_link" to="/users">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
