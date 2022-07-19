import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { idContext } from "../context/idContext";
import loading_gif from "../img/Loading_Gif.gif";
import "../styles/Profile.css";

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

const Profile = (props) => {
  const { user, setUser } = useContext(idContext);
  const {
    data: profile,
    error,
    loading,
  } = useFetch("http://localhost:8000/profile/" + user);

  const handleAuth = () => {
    alert("you must be logged to access profile!");
  };

  return (
    <div className="Profile_tab">
      {error && { handleAuth }}
      {loading && (
        <div className="gif_container">
          <img className="loading_gif" src={loading_gif} alt="loading..." />
        </div>
      )}
      {profile && (
        <div className="profile_card">
          <Link to={`/editProfile/${user}`} className="edit_profile">
            <span className="edit_text">Edit Profile:</span> {pencil}
          </Link>
          <div className="image_container">
            <img
              className="profile_image"
              src={profile.picture}
              alt="User_Profile_Pic"
            ></img>
          </div>
          <div className="user_name">{profile.username}</div>
          <div className="user_email">{profile.email}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
