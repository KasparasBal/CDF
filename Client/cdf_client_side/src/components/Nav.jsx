//IMPORTS
/////////////////////////////////////////////////////////////////////////////////////////////////////
import { Link } from "react-router-dom";

import "../styles/Nav.css";
import logo from "../img/Logo_Mini.jpg";

// SVGS
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const add_user = (
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
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
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

const user = (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const home = (
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
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

//JSX
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Nav = () => {
  return (
    <nav className="nav_container">
      <div className="logo">
        <img className="cdf_logo_img" src={logo} alt="cdf_small_logo"></img>
      </div>

      <div className="search">
        <input
          className="search_bar"
          type="text"
          id="search"
          placeholder="Search..."
        />
      </div>

      <div className="links">
        <Link className="link" to="/">
          {home}
        </Link>
        <Link className="link" to="/profile">
          {user}
        </Link>
        <Link className="link" to="/create">
          {pencil}
        </Link>
      </div>

      <div className="login ">
        <Link className="link link_login" to="/register">
          {add_user}
        </Link>
        <Link className="link link_login" to="/login">
          LOGIN
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
