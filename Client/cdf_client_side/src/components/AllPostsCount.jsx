import useFetch from "../hooks/useFetch";
import "../styles/countStyle.css";
const AllPostsCount = () => {
  const {
    data: count,
    loading,
    error,
  } = useFetch("http://localhost:8000/count");

  return (
    <>
      <div className="countStyle">Total Posts: {count}</div>
    </>
  );
};

export default AllPostsCount;
