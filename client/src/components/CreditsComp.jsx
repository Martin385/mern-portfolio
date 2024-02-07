import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

const CreditsComp = ({ post, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [post]);

  return (
    <div className="flex justify-between p-3  mx-auto w-full max-w-2xl text-xs">
      <div className="flex items-center gap-1 text-gray-500 text-sm">
        <p>Creado por:</p>
        <img
          className="h-10 w-10 object-cover rounded-full ml-2 mr-2"
          src={user.profilePicture}
          alt=""
        />
        <Link
          to={"/dashboard?tab=profile"}
          className="text-md text-cyan-600 hover:underline"
        >
          @{user.username}
        </Link>
      </div>
      <div className="flex items-center  text-xs  dark:border-gray-700 max-w-fit gap-2">
      <p className="text-gray-400 mr-1">
        {post.numberOfLikes > 0 &&
          post.numberOfLikes +
            "" +
            (post.numberOfLikes === 1 ? " like" : " likes")}
      </p>
      <button
        type="button"
        onClick={() => onLike(post._id)}
        className={`text-gray-400 hover:text-blue-500 ${
          currentUser &&
          post.likes.includes(currentUser._id) &&
          "!text-blue-500"
        }`}
      >
        <FaThumbsUp className="text-sm" />
      </button>
     
      </div>
    </div>
  );
};

Comment.propTypes = {
  post: PropTypes.string.isRequired,
};

export default CreditsComp;
