import "./post.css";
import { MoreHoriz,FavoriteBorder} from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {format} from 'timeago.js'
import CommentBox from "../../pages/CommentBox/CommentBox";
const Post = ({ post, myPosts, setPosts, savedPost }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const[open, setOpen] = useState(false) 
  const[isLiked,setIsLiked] = useState(false)
  const[like, setLike] = useState(post.likedby.length)
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const likeHandler = () =>{
    setLike(isLiked?like-1:like+1)
    setIsLiked(!isLiked)
    if(isLiked === true){
      console.log("unlike your post")
    }
    else if(isLiked === false){
      console.log("like your post")
    }
  }
  const handleSave = async () => {
    const myUserId = sessionStorage.getItem("userId");
    const postId = post._id;
    console.log("myuserId", myUserId);
    console.log("postId", postId);
    await axios
      .post(`http://localhost:5000/api/v1/saved/${myUserId}`, { postId })
      .then((res) => {
        console.log("successfully saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeletePost = async () => {
    const myUserId = sessionStorage.getItem("userId");
    if (post.userId === myUserId) {
      try {
        await axios
          .delete(`http://localhost:5000/api/v1/posts/${post._id}`)
          .then(() => {
            axios
              .get(`http://localhost:5000/api/v1/posts/${myUserId}`)
              .then((res) => {
                console.log(res.data.data);
                setPosts(res.data.data);
              });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const unSave = async () => {
    const userId = sessionStorage.getItem("userId");
    const postId = post._id;
    try {
      axios
        .post("http://localhost:5000/api/v1/saved/", { userId, postId })
        .then(() => {
          axios
            .get(`http://localhost:5000/api/v1/saved/${userId}`)
            .then((res) => {
              setPosts(res.data.data);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const navigateToUserProfile = () => {
    const myId = sessionStorage.getItem("userId");
    if (post.userId === myId) {
      console.log(post._id)
      console.log(myId)
      navigate("/myprofile");
    } else {
      console.log(post._id)
      console.log(myId)
      navigate(`/userprofile/${post.userId}`);
    }
  };
  if (!post) {
    return null;
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft" onClick={() => navigateToUserProfile()}>
            <img
              className="postProfileImg"
              src="/assets/person/1.jpg"
              alt=""
            ></img>
            <span className="postUsername">{post.userName}</span>
            <span className="postDate">{format(post.date)}</span>
          </div>
          <div className="postTopRight">
            <div className="option" onClick={toggleDropdown}>
              <MoreHoriz id="icon"></MoreHoriz>
              {myPosts && showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li onClick={handleDeletePost}>Delete</li>
                    <li>Edit</li>
                  </ul>
                </div>
              )}
              {savedPost && showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li onClick={unSave}>Unsave</li>
                  </ul>
                </div>
              )}
              {!myPosts && !savedPost && showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li onClick={handleSave}>save</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.caption}</span>
          {post.photo.includes("mp4") ? (
            <video className="postVideo" controls>
              <source
                src={`http://localhost:5000/public/${post.photo}`}
                type="video/mp4"
              />
            </video>):(<img
            className="postImg"
            src={`http://localhost:5000/public/${post.photo}`}
            alt=""
          ></img>)}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked?(<FavoriteBorder sx={{color:'red'}} onClick={likeHandler}></FavoriteBorder>):(<FavoriteBorder onClick={likeHandler}></FavoriteBorder>)}
                {/* <FavoriteBorder></FavoriteBorder> */}
            <span className="postlikeCounter"> {like} people liked</span>
          </div> 
          <div className="postBottomRight" onClick={()=>{setOpen(true)}}>
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
      {open && <CommentBox open={open} setOpen={setOpen} postuserId = {post.userId} postId = {post._id}></CommentBox>}
    </div>
    
  );
};
export default Post;
