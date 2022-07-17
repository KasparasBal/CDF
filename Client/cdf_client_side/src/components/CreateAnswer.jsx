import { useState } from "react";
import { useContext } from "react";
import { UsernameContext } from "../context/usernameContext";

import "../styles/Create.css";

const CreateAnswer = () => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const { userInfo, setUserInfo } = useContext(UsernameContext);

  const token = localStorage.getItem("TOKEN");

  const handleAuthor = () => {
    setAuthor(userInfo);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const answer = {
      body,
      author,
    };
    setLoading(true);
    fetch("http://localhost:8000/answers", {
      text: "You need to login to create an answer!",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(answer),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(error);
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitAnswer}>
        <div className="postInfo_answer_input_container">
          <div className="postInfo_answers_title">Your Answer:</div>
          <textarea
            id="body"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="postInfo_answer_input"
          ></textarea>
        </div>
        {!loading && (
          <button onClick={handleAuthor} className="create_btn">
            Submit
          </button>
        )}
        {loading && (
          <button disabled className="create_btn">
            Commenting..
          </button>
        )}
        {error && <div>Must be logged in to answer to posts!</div>}
      </form>
    </div>
  );
};

export default CreateAnswer;
